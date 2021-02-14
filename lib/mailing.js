// dependencies
var nodemailer = require('nodemailer');
const plan = require('paystack-api/resources/plan');

// Container for billing
// =============================================================================
var mail = {};

mail.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'fyndahltd@gmail.com',
        pass: 'OnyekachI1@'
    }
});

// Welcome Note 1
// ===================================================================================
mail.welcomeNote1 = function (dest, callback) {
    var message = `
    <div style="text-align: justify;>
    <p style="margin: 0px; padding: 5px; text-transform: capitalize;">Hi ${dest.firstname}, </p>
    <p style="margin: 0px; padding: 5px;">
    Your account has been created on the RedRock Inventory Management System. You can always login by visiting www.redrock.store and sign into your account with your email address and password. </p> </br>
    <p style="margin: 0px; padding: 5px;">Your account is on a 7days free trial period, during this time your relationship manager will assist you on how best to use our software. After the free trial, we will renew your account subscription the duration you selected during registration, you can cancel your account by letting your relationship manager know. </p></br>
    <p style="margin: 0px; padding: 5px;"> Here is a quick break down on the RedRock Inventory Management System;</p> </br>
    <p style="margin: 0px; padding: 5px;"> RedRock IMS is a cloud inventory management software built and designed for small and growing businesses to manage their inventory process. You can manage your entire store and product inventory from any device anywhere in the world.  </br>
    Features includes:</p>
    <ul style="padding-left: 10px; text-transform: capitalize;">
        <li>Barcode scanning</li>
        <li>Customer management</li>
        <li>Multi-level access</li>
        <li>Unlimited product inventory</li>
        <li>Invoicing</li>
        <li>Receipt customization</li>
        <li>Report generation</li>
        <li>Real-time notifications</li>
        <li>Finance management</li>
    </ul> </br>
    <p style="margin: 0px; padding: 5px;">Why RedRock Inventory Management System? </p>
    <p style="margin: 0px; padding: 5px;"> Leverage the power of RedRock IMS to take your business to the next level. Taking charge of your inventory challenges could be the key to growing your profits. Automate time consuming tasks, whether you are in retail, wholesale, or manufacturing.</p>
    <ul style="padding-left: 10px;">
        <li>Add Inventory: Easily add new products to your store. Generate unique identification codes to sort your products by name, category, manufacturing country, expiration dates and more.</li>
        <li>Order Management: With advanced order management capabilities, RedRock IMS helps you manage your product from purchase to sale.  Prevent costly stock outs with our dynamic reordering, consolidate your sales, and understand your gross margins by knowing your landed costs.</li>
        <li>Real-Time Inventory Control & Sync: Take the guesswork and busywork out of tracking your inventory. Instead, get real-time counts for all your items across all your sales channels in one place. Search or scan to get counts, set low stock alerts, and see sales figures.</li>
        <li>Administrative Control: Access the entire management system from any device, anywhere in the world, allowing you complete visibility and control of your business, your inventory and your staff. Easily add or edit products, monitor performance of your staff, finances and more through easy to use web-based Back Office</li>
        <li>Cost Savings: Every business’ inventory/product stock represents one of its largest investments. RedRock IMS helps companies cut expenses by minimizing the amount of unnecessary parts and products in storage. It also helps companies keep lost sales to a minimum by having enough stock on hand to meet demand. We also eliminate the need for businesses to hire a large IT workforce by taking care of maintaining the inventory software and providing 99.99% uptime for our clients.</li>
        <li>Increased Efficiency: RedRock IMS allows for automation of many inventory-related tasks including automatically collecting data, conduct calculations, and create sales records. This not only results in time savings, cost savings, but also increases business efficiency.</li>
    </ul> </br>
    <p style="margin: 0px; padding: 5px;">If you have any feedback or suggestions, please contact us at cfc@redrockng.com.  Additionally, feel free to refer to this email if you are unable to find an answer through our regular support channels or if you need to quickly escalate a ticket or issue. </p>
    <p style="margin: 0px; padding: 5px;"> We thank you for choosing RedRock as your inventory management system provider. We wish you success in your business.</p>
    <p style="margin: 0px; padding: 5px;"> Kind Regards </p>
    <p style="margin: 0px; padding: 0px 5px 5px 5px;"> RedRock Team </p>

    <p style="margin: 0px; padding: 5px;"> RedRock Technologies Ltd, WorkChop, 46 Wetheral road, Owerri, Nigeria.</p>
    </div>
    `;

    const mailOptions = {
        from: 'welcome@redrockng.com <fyndahltd@gmail.com>',
        to: dest.email,
        subject: 'Welcome',
        html: message
    };

    mail.transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            callback(true, err);
            // console.log(err);
        } else {
            callback(false, info);
            // console.log(info);  
        }
    });
};

// Welcome Note 2
// ==========================================================================================================
mail.welcomeNote2 = function (dest, callback) {
    var message = `
    <div style="text-align: justify;>
    <p style="margin: 0px; padding: 5px; text-transform: capitalize;"> &nbsp; Hi ${dest.firstname}, </p>
    <p style="margin: 0px; padding: 5px;">Welcome to the RedRock ecosystem, where businesses thrive and get connected into the future of digital technology. </p>
    <p style="margin: 0px; padding: 5px;">I founded RedRock Technologies Ltd in 2018 with the goal of providing African businesses with access to technology solutions and services that can bring them into the forefront of global innovation and economic success, and to a large extent we have been succeeding with this mission one client at a time. </p>
    <p style="margin: 0px; padding: 5px;">Today we are proud to say we have a client base in over 26 countries across the globe and have empowered dozens of large organizations with technology solutions and services which has resulted in increased profitability and growth. Technology has increasingly shaped everything we do in this day and age and will continue to take the front seat with regards to how we conduct business. </p>
    <p style="margin: 0px; padding: 5px;">Our software solutions and services ranges from IT consulting, cloud software solutions and digital security services. We aim to remain the number one technology solutions and services provider to businesses in Africa. You can learn more about RedRock Technologies Ltd by visiting www.redrockng.com. </p>
    <p style="margin: 0px; padding: 5px;">As part of our commitment to you as a subscriber on our Inventory Management System, you are eligible to win $1,000 business grant to cushion the effects of covid 19 on your business. Send an email to promo@redrockng.com detailing how covid 19 affected your business and what $1,000 will do for your business. Note, that you must have an active account subscription to get the funding. </p>
    <p style="margin: 0px; padding: 5px;">We are hoping to have you as not just a client for our inventory software, but a partner in a shared vision to bring Africa into the forefront of technology innovation and economic success. </p>
    <p style="margin: 0px; padding: 0px 5px 5px 5px;">Kind Regards. </p>
    <p style="margin: 0px; padding: 0px 5px 5px 5px;">Marshall C. O. Ezinwoke. </p>
    <p style="margin: 0px; padding: 0px 5px 5px 5px;">Founder, Chairman and CEO. </p>
    <p style="margin: 0px; padding: 0px 5px 5px 5px;">RedRock Technologies Ltd. </p>
    </div>
    `;

    const mailOptions = {
        from: 'marshall@redrockng.com <fyndahltd@gmail.com>',
        to: dest.email,
        subject: 'Welcome',
        html: message
    };

    mail.transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            callback(true, err);
            // console.log(err);
        } else {
            callback(false, info);
            // console.log(info);  
        }
    });
};

// Company Note
// ==========================================================================================================
mail.companyNote = function (dest, callback) {
    var message = `
    <div style="text-align: justify;">
        <p style="margin: 0px; padding: 5px;">Hello Marshal, </p>
        <p style="margin: 0px; padding: 5px;">A new customer just signed up on RedRock Inventory Management System</p>
        <p style="margin: 0px; padding: 0px 5px;">Details: </p>
        <ul style="text-transform: capitalize; padding-left: 10px;">
            <li>Firstname: ${dest.firstname}</li>
            <li>Lastname: ${dest.lastname}</li>
            <li>Company: ${dest.company_Name}</li>
            <li>User_ID: ${dest.user_ID}</li>
            <li>Email: ${dest.email}</li>
            <li>Phone: ${dest.phone}</li>
            <li>Address: ${dest.address}</li>
            <li>Plan: ${dest.subscription}</li>
            <li>Charge: ${dest.charge}</li>
            <li>Active: ${dest.active}</li>
        </ul>
        </div>
    `;

    const mailOptions = {
        from: 'RedRock-IMS API <fyndahltd@gmail.com>',
        to: 'productivity@redrockng.com, kennedychidi55@gmail.com',
        subject: 'New Customer Notification',
        html: message
    };

    mail.transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            callback(true, err);
            // console.log(err);
        } else {
            callback(false, info);
            // console.log(info);  
        }
    });
};


// Export module
module.exports = mail;