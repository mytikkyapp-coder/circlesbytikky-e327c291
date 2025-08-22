export interface DetailedHelpArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  popular?: boolean;
  content: string;
  lastUpdated: string;
}

export const helpArticlesData: DetailedHelpArticle[] = [
  {
    id: "1",
    title: "How to create your first circle",
    description: "Step-by-step guide to setting up your first member circle",
    category: "Getting Started",
    readTime: "3 min",
    popular: true,
    lastUpdated: "Dec 15, 2024",
    content: `
      <h2>Creating Your First Circle</h2>
      <p>Welcome to Circles by Tikky! Creating your first circle is the foundation of organizing your community. Follow these simple steps to get started.</p>
      
      <h3>Step 1: Navigate to Circles</h3>
      <p>From your dashboard, click on the "Circles" menu item in the sidebar. This will take you to the circles management page.</p>
      
      <h3>Step 2: Click "Create New Circle"</h3>
      <p>Look for the bright blue "Create New Circle" button and click it. This will open the circle creation form.</p>
      
      <h3>Step 3: Fill in Circle Details</h3>
      <ul>
        <li><strong>Circle Name:</strong> Choose a descriptive name for your circle (e.g., "VIP Customers", "Newsletter Subscribers")</li>
        <li><strong>Description:</strong> Add a brief description explaining the purpose of this circle</li>
        <li><strong>Tags:</strong> Add relevant tags to help categorize your circle</li>
      </ul>
      
      <h3>Step 4: Add Members</h3>
      <p>You can add members in several ways:</p>
      <ul>
        <li>Import from a CSV file</li>
        <li>Add individual members manually</li>
        <li>Import from other platforms</li>
      </ul>
      
      <h3>Step 5: Configure Circle Settings</h3>
      <p>Set up privacy settings, notification preferences, and other circle-specific configurations.</p>
      
      <h3>Best Practices</h3>
      <p>Here are some tips for creating effective circles:</p>
      <ul>
        <li>Use clear, descriptive names</li>
        <li>Start with smaller, focused groups</li>
        <li>Regularly review and update your circles</li>
        <li>Use tags effectively for better organization</li>
      </ul>
      
      <p>That's it! You've successfully created your first circle. You can now start adding members and creating targeted campaigns.</p>
    `
  },
  {
    id: "2", 
    title: "Setting up WhatsApp Business API",
    description: "Connect your WhatsApp Business account to start sending campaigns",
    category: "Integrations",
    readTime: "5 min",
    popular: true,
    lastUpdated: "Dec 14, 2024",
    content: `
      <h2>WhatsApp Business API Setup</h2>
      <p>Connecting your WhatsApp Business API is essential for sending campaigns through Circles by Tikky. This guide will walk you through the complete setup process.</p>
      
      <h3>Prerequisites</h3>
      <p>Before you begin, make sure you have:</p>
      <ul>
        <li>A verified WhatsApp Business account</li>
        <li>A valid phone number dedicated to business use</li>
        <li>Your business verification documents</li>
      </ul>
      
      <h3>Step 1: Access WhatsApp Setup</h3>
      <p>Navigate to "WhatsApp API" in your sidebar. Click on "Connect WhatsApp Business" to begin the setup process.</p>
      
      <h3>Step 2: Verify Your Business</h3>
      <p>Follow the business verification process:</p>
      <ol>
        <li>Enter your business information</li>
        <li>Upload required documents</li>
        <li>Verify your phone number</li>
        <li>Wait for approval (usually 1-3 business days)</li>
      </ol>
      
      <h3>Step 3: Configure API Settings</h3>
      <p>Once approved, configure your API settings:</p>
      <ul>
        <li>Set up webhooks for message delivery status</li>
        <li>Configure message templates</li>
        <li>Set up automatic responses</li>
      </ul>
      
      <h3>Step 4: Test Your Connection</h3>
      <p>Send a test message to verify everything is working correctly. We recommend sending a test to your own number first.</p>
      
      <h3>Important Notes</h3>
      <ul>
        <li>WhatsApp has strict policies about messaging - always get consent</li>
        <li>Use approved message templates for promotional content</li>
        <li>Monitor your quality score to avoid restrictions</li>
      </ul>
      
      <h3>Troubleshooting</h3>
      <p>If you encounter issues:</p>
      <ul>
        <li>Check your business verification status</li>
        <li>Verify your phone number is correctly formatted</li>
        <li>Contact our support team for assistance</li>
      </ul>
    `
  },
  {
    id: "3",
    title: "Creating effective message templates",
    description: "Best practices for writing engaging WhatsApp messages",
    category: "Templates",
    readTime: "4 min",
    popular: true,
    lastUpdated: "Dec 13, 2024",
    content: `
      <h2>Creating Effective Message Templates</h2>
      <p>Well-crafted message templates are crucial for successful WhatsApp campaigns. Learn how to create templates that engage your audience and drive results.</p>
      
      <h3>Understanding Template Structure</h3>
      <p>WhatsApp templates consist of several components:</p>
      <ul>
        <li><strong>Header:</strong> Optional media or text header</li>
        <li><strong>Body:</strong> Main message content (required)</li>
        <li><strong>Footer:</strong> Optional additional information</li>
        <li><strong>Buttons:</strong> Optional call-to-action buttons</li>
      </ul>
      
      <h3>Writing Compelling Body Text</h3>
      <p>Your message body should be:</p>
      <ul>
        <li><strong>Concise:</strong> Keep it under 1024 characters</li>
        <li><strong>Personal:</strong> Use the recipient's name when possible</li>
        <li><strong>Clear:</strong> State your purpose immediately</li>
        <li><strong>Actionable:</strong> Include a clear call-to-action</li>
      </ul>
      
      <h3>Using Variables Effectively</h3>
      <p>Variables allow you to personalize messages:</p>
      <ul>
        <li>{{1}} for first name</li>
        <li>{{2}} for custom data like order numbers</li>
        <li>{{3}} for additional personalization</li>
      </ul>
      
      <h3>Template Categories</h3>
      <p>Choose the right category for your template:</p>
      <ul>
        <li><strong>Marketing:</strong> Promotional content, offers, announcements</li>
        <li><strong>Utility:</strong> Account updates, order confirmations</li>
        <li><strong>Authentication:</strong> OTP and verification codes</li>
      </ul>
      
      <h3>Best Practices</h3>
      <ul>
        <li>Always include an opt-out option</li>
        <li>Test templates before submitting for approval</li>
        <li>Follow WhatsApp's content guidelines</li>
        <li>Keep language natural and conversational</li>
        <li>Avoid spam-like content</li>
      </ul>
      
      <h3>Getting Templates Approved</h3>
      <p>Templates must be approved by WhatsApp before use:</p>
      <ol>
        <li>Submit your template for review</li>
        <li>Wait for approval (usually 24-48 hours)</li>
        <li>Make revisions if rejected</li>
        <li>Start using once approved</li>
      </ol>
      
      <h3>Example Template</h3>
      <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <p><strong>Header:</strong> 🎉 Special Offer!</p>
        <p><strong>Body:</strong> Hi {{1}}, enjoy 20% off your next order with code SAVE20. Valid until {{2}}. Shop now!</p>
        <p><strong>Footer:</strong> Reply STOP to opt out</p>
        <p><strong>Button:</strong> Shop Now → www.yourstore.com</p>
      </div>
    `
  },
  {
    id: "4",
    title: "Understanding campaign analytics",
    description: "Learn how to read and interpret your campaign performance data",
    category: "Analytics",
    readTime: "6 min",
    popular: true,
    lastUpdated: "Dec 12, 2024",
    content: `
      <h2>Understanding Campaign Analytics</h2>
      <p>Analytics help you measure the success of your WhatsApp campaigns and optimize for better results. Learn how to interpret key metrics and make data-driven decisions.</p>
      
      <h3>Key Metrics Overview</h3>
      <p>Here are the most important metrics to track:</p>
      
      <h4>Delivery Metrics</h4>
      <ul>
        <li><strong>Sent:</strong> Total messages sent</li>
        <li><strong>Delivered:</strong> Messages successfully delivered to recipients</li>
        <li><strong>Failed:</strong> Messages that couldn't be delivered</li>
        <li><strong>Delivery Rate:</strong> Percentage of messages delivered successfully</li>
      </ul>
      
      <h4>Engagement Metrics</h4>
      <ul>
        <li><strong>Read:</strong> Messages opened by recipients</li>
        <li><strong>Read Rate:</strong> Percentage of delivered messages that were read</li>
        <li><strong>Replies:</strong> Number of responses received</li>
        <li><strong>Reply Rate:</strong> Percentage of recipients who replied</li>
      </ul>
      
      <h4>Action Metrics</h4>
      <ul>
        <li><strong>Clicks:</strong> Button/link clicks in your messages</li>
        <li><strong>Click-through Rate (CTR):</strong> Percentage of recipients who clicked</li>
        <li><strong>Conversions:</strong> Desired actions taken (purchases, sign-ups, etc.)</li>
        <li><strong>Conversion Rate:</strong> Percentage of recipients who converted</li>
      </ul>
      
      <h3>Reading Your Analytics Dashboard</h3>
      <p>Your analytics dashboard provides several views:</p>
      
      <h4>Campaign Overview</h4>
      <p>Get a high-level view of all campaigns with key metrics at a glance.</p>
      
      <h4>Individual Campaign Analysis</h4>
      <p>Dive deep into specific campaign performance with detailed breakdowns.</p>
      
      <h4>Time-based Analysis</h4>
      <p>See how performance varies over time to identify optimal sending times.</p>
      
      <h3>Interpreting Your Data</h3>
      <p>Here's how to read your metrics:</p>
      
      <h4>Good Delivery Rate</h4>
      <ul>
        <li><strong>95%+:</strong> Excellent - your contact list is clean</li>
        <li><strong>85-94%:</strong> Good - minor cleanup may be needed</li>
        <li><strong>Below 85%:</strong> Poor - review your contact quality</li>
      </ul>
      
      <h4>Good Read Rate</h4>
      <ul>
        <li><strong>80%+:</strong> Excellent - engaging content and timing</li>
        <li><strong>60-79%:</strong> Good - room for improvement</li>
        <li><strong>Below 60%:</strong> Poor - review your messaging strategy</li>
      </ul>
      
      <h4>Good Reply Rate</h4>
      <ul>
        <li><strong>10%+:</strong> Excellent - highly engaging content</li>
        <li><strong>5-9%:</strong> Good - solid engagement</li>
        <li><strong>Below 5%:</strong> Poor - content may not be relevant</li>
      </ul>
      
      <h3>Optimizing Based on Analytics</h3>
      <p>Use your data to improve future campaigns:</p>
      
      <h4>Low Delivery Rates</h4>
      <ul>
        <li>Clean your contact lists</li>
        <li>Remove inactive numbers</li>
        <li>Verify number formats</li>
      </ul>
      
      <h4>Low Read Rates</h4>
      <ul>
        <li>Improve your message timing</li>
        <li>Test different subject lines</li>
        <li>Segment your audience better</li>
      </ul>
      
      <h4>Low Engagement</h4>
      <ul>
        <li>Create more relevant content</li>
        <li>Use stronger calls-to-action</li>
        <li>Personalize your messages</li>
      </ul>
      
      <h3>Advanced Analytics Features</h3>
      <ul>
        <li>A/B testing results</li>
        <li>Audience insights</li>
        <li>Revenue attribution</li>
        <li>Custom goal tracking</li>
      </ul>
    `
  },
  {
    id: "5",
    title: "Managing member segments and tags",
    description: "Organize your circles with tags and segments for better targeting",
    category: "Circles Management", 
    readTime: "4 min",
    lastUpdated: "Dec 11, 2024",
    content: `
      <h2>Managing Member Segments and Tags</h2>
      <p>Effective segmentation and tagging help you send more targeted, relevant messages to your audience. Learn how to organize your members for maximum campaign effectiveness.</p>
      
      <h3>Understanding Tags vs Segments</h3>
      
      <h4>Tags</h4>
      <p>Tags are simple labels you can assign to members:</p>
      <ul>
        <li>Multiple tags per member</li>
        <li>Easy to add and remove</li>
        <li>Used for basic categorization</li>
        <li>Examples: "VIP", "New Customer", "Interested in Sports"</li>
      </ul>
      
      <h4>Segments</h4>
      <p>Segments are dynamic groups based on criteria:</p>
      <ul>
        <li>Automatically updated based on rules</li>
        <li>Can combine multiple conditions</li>
        <li>More powerful for complex targeting</li>
        <li>Examples: "Customers who bought in last 30 days", "High engagement users"</li>
      </ul>
      
      <h3>Creating Effective Tags</h3>
      <p>Follow these best practices for tagging:</p>
      
      <h4>Tag Naming Conventions</h4>
      <ul>
        <li>Use clear, descriptive names</li>
        <li>Be consistent with formatting</li>
        <li>Avoid spaces (use underscores or hyphens)</li>
        <li>Keep tags concise</li>
      </ul>
      
      <h4>Common Tag Categories</h4>
      <ul>
        <li><strong>Demographics:</strong> age_25_34, gender_male, location_mumbai</li>
        <li><strong>Behavior:</strong> high_engagement, frequent_buyer, mobile_user</li>
        <li><strong>Interests:</strong> tech_enthusiast, fitness_lover, foodie</li>
        <li><strong>Customer Status:</strong> vip_customer, new_subscriber, trial_user</li>
      </ul>
      
      <h3>Building Smart Segments</h3>
      <p>Create segments using various criteria:</p>
      
      <h4>Demographic Segments</h4>
      <ul>
        <li>Age ranges</li>
        <li>Location (city, state, country)</li>
        <li>Gender</li>
        <li>Language preferences</li>
      </ul>
      
      <h4>Behavioral Segments</h4>
      <ul>
        <li>Purchase history</li>
        <li>Engagement levels</li>
        <li>Website activity</li>
        <li>Message interaction patterns</li>
      </ul>
      
      <h4>Custom Field Segments</h4>
      <ul>
        <li>Company size</li>
        <li>Industry</li>
        <li>Subscription tier</li>
        <li>Custom data points</li>
      </ul>
      
      <h3>Segment Examples</h3>
      
      <h4>High-Value Customers</h4>
      <p>Criteria: Total purchase value > ₹10,000 AND Last purchase within 90 days</p>
      
      <h4>Engaged New Users</h4>
      <p>Criteria: Joined within 30 days AND Opened last 3 messages</p>
      
      <h4>Re-engagement Targets</h4>
      <p>Criteria: Last message opened > 60 days ago AND Total messages received > 10</p>
      
      <h3>Tagging Workflow</h3>
      
      <h4>Manual Tagging</h4>
      <ol>
        <li>Select members from your circles</li>
        <li>Choose "Add Tags" from the actions menu</li>
        <li>Enter or select existing tags</li>
        <li>Apply to selected members</li>
      </ol>
      
      <h4>Bulk Import with Tags</h4>
      <ol>
        <li>Prepare CSV with tag columns</li>
        <li>Upload during member import</li>
        <li>Map CSV columns to tag fields</li>
        <li>Complete import with tags applied</li>
      </ol>
      
      <h4>Automated Tagging</h4>
      <ul>
        <li>Set up triggers based on actions</li>
        <li>Auto-tag based on form submissions</li>
        <li>Tag based on purchase behavior</li>
        <li>Remove tags based on inactivity</li>
      </ul>
      
      <h3>Using Segments in Campaigns</h3>
      <p>Target your campaigns effectively:</p>
      
      <h4>Single Segment Targeting</h4>
      <p>Send to one specific segment for focused messaging.</p>
      
      <h4>Multi-Segment Targeting</h4>
      <p>Combine segments with AND/OR logic for complex targeting.</p>
      
      <h4>Exclusion Targeting</h4>
      <p>Exclude certain segments to avoid irrelevant messaging.</p>
      
      <h3>Best Practices</h3>
      <ul>
        <li>Start simple and add complexity gradually</li>
        <li>Regularly review and clean up unused tags</li>
        <li>Document your tagging strategy</li>
        <li>Test segments before major campaigns</li>
        <li>Use descriptive names for easy identification</li>
        <li>Monitor segment sizes for campaign viability</li>
      </ul>
      
      <h3>Common Mistakes to Avoid</h3>
      <ul>
        <li>Over-segmentation leading to tiny audiences</li>
        <li>Inconsistent tag naming</li>
        <li>Not updating segments regularly</li>
        <li>Ignoring segment performance data</li>
        <li>Creating too many overlapping segments</li>
      </ul>
    `
  },
  {
    id: "6",
    title: "Troubleshooting message delivery issues",
    description: "Common issues and solutions for WhatsApp message delivery",
    category: "Troubleshooting",
    readTime: "7 min",
    lastUpdated: "Dec 10, 2024",
    content: `
      <h2>Troubleshooting Message Delivery Issues</h2>
      <p>Message delivery issues can impact your campaign effectiveness. Learn how to identify, diagnose, and resolve common delivery problems.</p>
      
      <h3>Common Delivery Issues</h3>
      
      <h4>Messages Not Being Delivered</h4>
      <p>Symptoms: Low delivery rates, messages stuck in "sent" status</p>
      <p>Possible causes:</p>
      <ul>
        <li>Invalid or inactive phone numbers</li>
        <li>WhatsApp API rate limits exceeded</li>
        <li>Template not approved</li>
        <li>Account quality score issues</li>
      </ul>
      
      <h4>Messages Delivered but Not Read</h4>
      <p>Symptoms: High delivery rates but low read rates</p>
      <p>Possible causes:</p>
      <ul>
        <li>Poor message timing</li>
        <li>Irrelevant content</li>
        <li>Recipient privacy settings</li>
        <li>Message appearing as spam</li>
      </ul>
      
      <h4>High Bounce Rates</h4>
      <p>Symptoms: Many messages marked as "failed"</p>
      <p>Possible causes:</p>
      <ul>
        <li>Outdated contact database</li>
        <li>Incorrect number formatting</li>
        <li>Recipients who blocked your number</li>
        <li>Network connectivity issues</li>
      </ul>
      
      <h3>Diagnostic Steps</h3>
      
      <h4>Step 1: Check Your Analytics</h4>
      <ol>
        <li>Review delivery rates by campaign</li>
        <li>Identify patterns in failed messages</li>
        <li>Check error codes and messages</li>
        <li>Compare with historical performance</li>
      </ol>
      
      <h4>Step 2: Verify WhatsApp API Status</h4>
      <ol>
        <li>Check API connection status</li>
        <li>Review rate limit consumption</li>
        <li>Verify account standing</li>
        <li>Check for any restrictions</li>
      </ol>
      
      <h4>Step 3: Validate Contact Data</h4>
      <ol>
        <li>Check phone number formats</li>
        <li>Remove invalid numbers</li>
        <li>Verify country codes</li>
        <li>Test with known good numbers</li>
      </ol>
      
      <h3>Solutions by Issue Type</h3>
      
      <h4>Template Issues</h4>
      <p><strong>Problem:</strong> Template not approved or rejected</p>
      <p><strong>Solutions:</strong></p>
      <ul>
        <li>Review WhatsApp template guidelines</li>
        <li>Remove policy-violating content</li>
        <li>Resubmit template for approval</li>
        <li>Use pre-approved templates temporarily</li>
      </ul>
      
      <h4>Rate Limiting</h4>
      <p><strong>Problem:</strong> Hitting API rate limits</p>
      <p><strong>Solutions:</strong></p>
      <ul>
        <li>Reduce sending frequency</li>
        <li>Spread campaigns over longer periods</li>
        <li>Upgrade your WhatsApp API tier</li>
        <li>Implement message queuing</li>
      </ul>
      
      <h4>Contact Quality</h4>
      <p><strong>Problem:</strong> Many invalid or inactive numbers</p>
      <p><strong>Solutions:</strong></p>
      <ul>
        <li>Clean your contact database regularly</li>
        <li>Use phone number validation services</li>
        <li>Remove numbers that consistently fail</li>
        <li>Implement double opt-in for new contacts</li>
      </ul>
      
      <h4>Account Quality Score</h4>
      <p><strong>Problem:</strong> Low quality score affecting delivery</p>
      <p><strong>Solutions:</strong></p>
      <ul>
        <li>Improve message relevance and timing</li>
        <li>Reduce spam complaints</li>
        <li>Increase engagement rates</li>
        <li>Follow WhatsApp best practices</li>
      </ul>
      
      <h3>Prevention Strategies</h3>
      
      <h4>Maintain Clean Contact Lists</h4>
      <ul>
        <li>Regular database cleanup</li>
        <li>Remove bounced numbers promptly</li>
        <li>Validate new contacts before adding</li>
        <li>Monitor engagement metrics</li>
      </ul>
      
      <h4>Follow WhatsApp Guidelines</h4>
      <ul>
        <li>Only message users who opted in</li>
        <li>Respect messaging frequency limits</li>
        <li>Use approved templates only</li>
        <li>Provide clear opt-out mechanisms</li>
      </ul>
      
      <h4>Monitor Performance Regularly</h4>
      <ul>
        <li>Set up delivery rate alerts</li>
        <li>Review analytics weekly</li>
        <li>Track quality score trends</li>
        <li>Benchmark against industry standards</li>
      </ul>
      
      <h3>Emergency Response Plan</h3>
      
      <h4>If Delivery Suddenly Drops</h4>
      <ol>
        <li>Pause active campaigns immediately</li>
        <li>Check WhatsApp API status</li>
        <li>Review recent template approvals</li>
        <li>Contact support if needed</li>
        <li>Implement fixes before resuming</li>
      </ol>
      
      <h3>When to Contact Support</h3>
      <p>Reach out to our support team if you experience:</p>
      <ul>
        <li>Sudden significant drops in delivery rates</li>
        <li>Consistent API errors you can't resolve</li>
        <li>Account restrictions or suspensions</li>
        <li>Template approval issues</li>
        <li>Technical problems with the platform</li>
      </ul>
      
      <h3>Tools for Troubleshooting</h3>
      <ul>
        <li><strong>Message Logs:</strong> Detailed delivery status for each message</li>
        <li><strong>Error Reports:</strong> Automated reports on failed deliveries</li>
        <li><strong>Quality Dashboard:</strong> Real-time view of account health</li>
        <li><strong>Contact Validator:</strong> Tool to check number validity</li>
        <li><strong>Template Checker:</strong> Verify template compliance</li>
      </ul>
      
      <p>Remember: Most delivery issues can be prevented with proper planning and regular monitoring. Stay proactive to maintain high delivery rates!</p>
    `
  }
];