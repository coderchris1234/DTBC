# Email Setup Guide for Contact Form

## Quick Setup (Recommended - 2 minutes)

### Web3Forms Setup (FREE & EASY)
1. Go to [Web3Forms.com](https://web3forms.com/)
2. Enter your email address (christobelnwachukwu@gmail.com)
3. Click "Create Access Key"
4. Copy the access key you receive
5. In `Form.jsx`, replace `'YOUR_ACCESS_KEY'` with your actual access key
6. Done! Your form will now send emails directly to your inbox.

**Example:**
```javascript
access_key: 'abcd1234-5678-90ef-ghij-klmnopqrstuv', // Your actual key
```

## Alternative Options

### Option 1: EmailJS Setup

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose Gmail (or your preferred email provider)
4. Follow the setup instructions to connect your Gmail account
5. Note down your **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

```
Subject: New Contact Form Submission from {{from_name}}

Hello,

You have received a new contact form submission:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone_number}} ({{phone_type}})
Address: {{street_address}}, {{apt_unit}}
City: {{city}}, {{state}} {{zip_code}}
Marital Status: {{marital_status}}

Message:
{{message}}

Submitted on: {{submission_date}} at {{submission_time}}

Best regards,
DTBC Website Contact Form
```

4. Save the template and note down your **Template ID** (e.g., `template_xyz789`)

### Step 4: Get Public Key
1. Go to "Account" > "General"
2. Find your **Public Key** (e.g., `user_abc123xyz`)

### Step 5: Update Form Component
Replace the placeholder values in `Form.jsx`:

```javascript
const serviceID = 'your_service_id_here'
const templateID = 'your_template_id_here' 
const publicKey = 'your_public_key_here'
```

## Option 2: Formspree (Easier Alternative)

### Step 1: Create Formspree Account
1. Go to [Formspree.io](https://formspree.io/)
2. Sign up for a free account
3. Create a new form
4. Note your form endpoint URL

### Step 2: Update Form Component
Replace the EmailJS code with Formspree:

```javascript
// Replace the EmailJS code in handleSubmit with:
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: `${formData.firstName} ${formData.lastName}`,
    email: formData.email,
    phone: `${formData.phoneNumber} (${formData.phoneType})`,
    address: `${formData.streetAddress}, ${formData.aptUnit}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
    maritalStatus: formData.maritalStatus,
    message: formData.message
  }),
})

if (response.ok) {
  setSubmitStatus('success')
  // Reset form...
} else {
  setSubmitStatus('error')
}
```

## Testing
1. Fill out the contact form on your website
2. Submit the form
3. Check your email inbox for the submission
4. Verify all form data is included correctly

## Troubleshooting
- Make sure your email service is properly connected
- Check that all IDs and keys are correctly entered
- Verify your email template variables match the form data
- Check browser console for any error messages