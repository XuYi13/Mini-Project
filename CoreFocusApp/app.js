//Ho Xu Yi 22019468
const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.urlencoded({ extended: true }));

// Middleware for parsing JSON bodies
app.use(express.json());


// Create MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'corefocusapp'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Set up view engine
app.set('view engine', 'ejs');
// enable static files
app.use(express.static('public'));

// Routes for CRUD operations(users)

app.get('/', (req, res) => {
    const sql = 'SELECT * FROM users';

    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).send('Error retrieving users');
        }
        res.render('index', { users: results });

    });
});


app.get('/addUserForm', (req, res) => {
    res.render('addUser');
});

app.post('/addUser', (req, res) => {
    const { name, email, contact, profile } = req.body;
    const sql = 'INSERT INTO users (name, email, contact, profile) VALUES (?, ?, ?, ?)';
    
    connection.query(sql, [name, email, contact, profile], (error, results) => {
        if (error) {
            console.error('Database insert error:', error);
            return res.status(500).send('Error adding user');
        }
        res.redirect('/');
    });
});


app.get('/user/:id', function(req, res) {
    const userId = req.params.id;
    const sql = 'SELECT * FROM users WHERE userId = ?';
    
    connection.query(sql, [userId], (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).send('Error retrieving user by ID');
        }
        if (results.length > 0) {
            res.render('user', { user: results[0] });

        } else {
            res.status(404).send('User not found');
        }
    });
});

app.get('/updateUser/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'SELECT * FROM users WHERE userId = ?';
    
    connection.query(sql, [userId], (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).send('Error retrieving user by ID');
        }
        if (results.length > 0) {
            res.render('updateUser', { user: results[0] });
        } else {
            res.status(404).send('User not found');
        }
    });
});

app.post('/updateUser/:id', (req, res) => {
    const userId = req.params.id;
    const { name, email, contact, profile} = req.body;
    const sql = 'UPDATE users SET name = ?, email = ?, contact = ?, profile = ? WHERE userId = ?';
    
    connection.query(sql, [name, email, contact, , profile, userId], (error, results) => {
        if (error) {
            console.error('Error updating user:', error);
            return res.status(500).send('Error updating user');
            
        } else {
            res.redirect('/');
        }
    });
});

app.get('/deleteUser/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'DELETE FROM users WHERE userId = ?';

    connection.query(sql, [userId], (error, results) => {
        if (error) {
            console.error('Error deleting user:', error);
            return res.status(500).send('Error deleting user');
        } else {
            res.redirect('/');
        }
    
    });
});

// Routes for CRUD operations(organizations)

app.get('/viewOrganization', (req, res) => {
    const sql = 'SELECT * FROM organizations';

    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).send('Error retrieving users');
        }
        res.render('viewOrganizations', { organizations: results });

    });
});


app.get('/addOrganizationForm', (req, res) => {
    res.render('addOrganization');
});

app.post('/addOrganization', (req, res) => {
    const { name, description, contactEmail } = req.body;
    const sql = 'INSERT INTO organizations (organizationName, description, contactEmail) VALUES (?, ?, ?)';
    
    connection.query(sql, [name, description, contactEmail], (error, results) => {
        if (error) {
            console.error('Database insert error:', error);
            return res.status(500).send('Error adding organization');
        }
        res.redirect('/viewOrganization');
    });
});

app.get('/organization/:id', function(req, res) {
    const organizationId = req.params.id;
    const sql = 'SELECT * FROM organizations WHERE organizationId = ?';
    
    connection.query(sql, [organizationId], (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).send('Error retrieving organization by ID');
        }
        if (results.length > 0) {
            res.render('organization', { organization: results[0] });

        } else {
            res.status(404).send('User not found');
        }
    });
});

app.get('/updateOrganization/:id', (req, res) => {
    const organizationId = req.params.id;
    const sql = 'SELECT * FROM organizations WHERE organizationId = ?';
    
    connection.query(sql, [organizationId], (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).send('Error retrieving user by ID');
        }
        if (results.length > 0) {
            res.render('updateOrganization', { organization: results[0] });
        } else {
            res.status(404).send('Organization not found');
        }
    });
});

app.post('/updateOrganization/:id', (req, res) => {
    const organizationId = req.params.id;
    const { name, description, contactEmail } = req.body;
    const sql = 'UPDATE organizations SET organizationName = ?, description = ?, contactEmail = ? WHERE organizationId = ?';
    
    connection.query(sql, [name, description, contactEmail, organizationId], (error, results) => {
        if (error) {
            console.error('Error updating organization:', error);
            return res.status(500).send('Error updating organization');
            
        } else {
            res.redirect('/viewOrganization');
        }
    });
});

app.get('/deleteOrganization/:id', (req, res) => {
    const organizationId = req.params.id;
    const sql = 'DELETE FROM organizations WHERE organizationId = ?';

    connection.query(sql, [organizationId], (error, results) => {
        if (error) {
            console.error('Error deleting organization:', error);
            return res.status(500).send('Error deleting organization');
        } else {
            res.redirect('/viewOrganization');
        }
    
    });
});

// Routes for CRUD operations(opportunities)
app.get('/viewOpportunity', (req, res) => {
    const sql = 'SELECT * FROM opportunities';

    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).send('Error retrieving users');
        }
        res.render('viewOpportunities', { opportunities: results });

    });
});


app.get('/addOpportunityForm', (req, res) => {
    res.render('addOpportunity');
});

app.post('/addOpportunity', (req, res) => {
    const { title, description, date, time, location,  } = req.body;
    const organizationId = 1;//used Github copilot to generate this line of code
    const sql = 'INSERT INTO opportunities (title, description, date, time, location, organizationId) VALUES (?, ?, ?, ?, ?, ?)';
    
    connection.query(sql, [title, description, date, time, location, organizationId], (error, results) => {
        if (error) {
            console.error('Database insert error:', error);
            return res.status(500).send('Error adding opportunity');
        }
        res.redirect('/viewOpportunity');
    });
});


app.get('/opportunity/:id', function(req, res) {
    const opportunityId = req.params.id;
    const sql = 'SELECT * FROM opportunities WHERE opportunityId = ?';
    
    connection.query(sql, [opportunityId], (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).send('Error retrieving opportunity by ID');
        }
        if (results.length > 0) {
            res.render('opportunity', { opportunity: results[0] });

        } else {
            res.status(404).send('Opportunity not found');
        }
    });
});
app.get('/updateOpportunity/:id', (req, res) => {
    const opportunityId = req.params.id;
    const sql = 'SELECT * FROM opportunities WHERE opportunityId = ?';
    
    connection.query(sql, [opportunityId], (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).send('Error retrieving user by ID');
        }
        if (results.length > 0) {
            res.render('updateOpportunity', { opportunity: results[0] });
        } else {
            res.status(404).send('Opportunity not found');
        }
    });
});

app.post('/updateOpportunity/:id', (req, res) => {
    const opportunityId = req.params.id;
    const { title, description, date, time, location } = req.body;
    const sql = 'UPDATE opportunities SET title = ?, description = ?, date = ?, time= ?, location = ? WHERE opportunityId = ?';
    
    connection.query(sql, [title, description, date, time, location, opportunityId], (error, results) => {
        if (error) {
            console.error('Error updating opportunity:', error);
            return res.status(500).send('Error updating opportunity');
            
        } else {
            res.redirect('/viewOpportunity');
        }
    });
});

app.get('/deleteOpportunity/:id', (req, res) => {
    const opportunityId = req.params.id;
    const sql = 'DELETE FROM opportunities WHERE opportunityId = ?';

    connection.query(sql, [opportunityId], (error, results) => {
        if (error) {
            console.error('Error deleting opportunity:', error);
            return res.status(500).send('Error deleting opportunity');
        } else {
            res.redirect('/viewOpportunity');
        }
    
    });
});

// Routes for CRUD operations(registrations)

app.get('/viewRegistration', (req, res) => {
    const sql = 'SELECT * FROM registrations';

    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).send('Error retrieving registrations');
        }
        res.render('viewRegistrations', { registrations: results });

    });
});


app.get('/addRegistrationForm', (req, res) => {
    res.render('addRegistration');
});

app.post('/addRegistration', (req, res) => {
    const { name, opportunity, status } = req.body;
    const userId = 1;//used Github copilot to generate this line of code
    const sql = 'INSERT INTO registrations (userId, name, opportunity, status) VALUES (?, ?, ?, ?)';
    
    connection.query(sql, [userId, name, opportunity, status], (error, results) => {
        if (error) {
            console.error('Database insert error:', error);
            return res.status(500).send('Error adding registration');
        }
        res.redirect('/viewRegistration');
    });
});

app.get('/registration/:id', function(req, res) {
    const registrationId = req.params.id;
    const sql = 'SELECT * FROM registrations WHERE registrationId = ?';
    
    connection.query(sql, [registrationId], (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).send('Error retrieving registration by ID');
        }
        if (results.length > 0) {
            res.render('registration', { registration: results[0] });

        } else {
            res.status(404).send('Registration not found');
        }
    });
});

app.get('/updateRegistration/:id', (req, res) => {
    const registrationId = req.params.id;
    const sql = 'SELECT * FROM registrations WHERE registrationId = ?';
    
    connection.query(sql, [registrationId], (error, results) => {
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).send('Error retrieving registration by ID');
        }
        if (results.length > 0) {
            res.render('updateRegistration', { registration: results[0] });
        } else {
            res.status(404).send('Registration not found');
        }
    });
});

app.post('/updateRegistration/:id', (req, res) => {
    const registrationId = req.params.id;
    const { name, opportunity, status } = req.body;
    const sql = 'UPDATE registrations SET name = ?, opportunity = ?, status = ? WHERE registrationId  = ?';
    
    connection.query(sql, [name, opportunity, status, registrationId ], (error, results) => {
        if (error) {
            console.error('Error updating organization:', error);
            return res.status(500).send('Error updating organization');
            
        } else {
            res.redirect('/viewRegistration');
        }
    });
});

app.get('/deleteRegistration/:id', (req, res) => {
    const registrationId = req.params.id;
    const sql = 'DELETE FROM registrations WHERE registrationId = ?';

    connection.query(sql, [registrationId], (error, results) => {
        if (error) {
            console.error('Error deleting registration:', error);
            return res.status(500).send('Error deleting registration');

        } else {
            res.redirect('/viewRegistration');
        }
    
    });
});


// Start the server
const PORT = process.env.PORT || 3022;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
