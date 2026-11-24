-- First plan, roster, costs, risks and decisions for the BrandIn30 build dashboard.
-- Working days are Monday to Saturday, starting Tuesday 24 November 2026.

-- Dashboard admins are added straight in the database, not in this file:
--   insert into brandin30.admins (email) values ('<admin email, lower case>');

with days as (
  select d::date as on_date, row_number() over (order by d) as day
  from generate_series('2026-11-24'::date, '2027-02-28'::date, interval '1 day') d
  where extract(dow from d) <> 0
), plan (day, phase, title, your_part, flag) as (values
  (1, 'Sell', 'Repos, database, selling page and build dashboard', 'Create the brandin30 repo on GitHub', null),
  (2, 'Sell', 'Go live on brandin30.in', 'Import the repo in Vercel and point the domain from Namecheap', null),
  (3, 'Sell', 'Pre-order payments and visitor tracking', 'Finish Razorpay KYC, create two payment pages, share tracking IDs', null),
  (4, 'Sell', 'Three demo kits and real examples on the page', 'Pick three real businesses and approve their kits', null),
  (5, 'Agent core', 'Agent worker online, Slack channels, Chief of Staff', 'Create the Railway project and the Slack app (guided)', null),
  (6, 'Agent core', 'Live view, morning brief, sending-domain warm-up starts', 'Buy the outreach mailbox and approve its DNS records', null),
  (7, 'Brand engine', 'Five-question flow in the app', 'Test it on your phone', null),
  (8, 'Brand engine', 'Brand strategist: brand spec from five answers', 'Judge five sample brand specs', null),
  (9, 'Brand engine', 'Font and palette libraries', 'Approve the shortlists', null),
  (10, 'Brand engine', 'Design archetypes', 'Review one sample of each', null),
  (11, 'Brand engine', 'Wordmark engine', 'Rate 30 samples', null),
  (12, 'Brand engine', 'Monogram engine', 'Rate 30 samples', null),
  (13, 'Brand engine', 'Symbol marks library', 'Choose the licensed icon set and approve the import', null),
  (14, 'Brand engine', 'Logo engine: 12 candidates for every brand', 'Rate 40 logos', null),
  (15, 'Brand engine', 'Quality gate: rule checks and AI critic', 'Compare its picks with yours', null),
  (16, 'Brand engine', 'Reveal screen and regenerate limits', 'Test the flow end to end', null),
  (17, 'Brand engine', 'Instagram, WhatsApp and business card templates', 'Approve the designs', null),
  (18, 'Brand engine', 'Brand guidelines PDF and file export', 'Open every file', null),
  (19, 'Brand engine', 'Razorpay checkout and automatic delivery', 'Make a test payment', null),
  (20, 'Brand engine', 'Ten real businesses end to end; kits on sale', 'Watch three people use it', 'on_sale'),
  (21, 'Outreach team', 'Scout with a city grid, and Profiler rules', 'Approve the target business types and cities', null),
  (22, 'Outreach team', 'Researcher and Gatekeeper', null, null),
  (23, 'Outreach team', 'Previewer: a sample brand for each prospect', 'Review 10 previews', null),
  (24, 'Outreach team', 'Copywriter and the email sequence', 'Approve the email copy', null),
  (25, 'Outreach team', 'Sender and the daily approval batch', 'Approve the first batch in Slack', null),
  (26, 'Outreach team', 'Inbox: replies, opt-outs and bounces', 'Answer the first replies', null),
  (27, 'Outreach team', 'Website chat and Nurturer', 'Test the chat', null),
  (28, 'Customers and finance', 'Support agent', 'Review its answers to 10 test questions', null),
  (29, 'Customers and finance', 'Delivery monitor and refund flow', 'Set the refund limit', null),
  (30, 'Customers and finance', 'Bookkeeper: Razorpay reconciliation and GST invoices', 'Share GST details and confirm with your CA', null),
  (31, 'Customers and finance', 'Strategist weekly review and cost per sale', 'Approve or reject its first proposals', null),
  (32, 'Website tier', 'Customer website layouts', 'Approve them on your phone', null),
  (33, 'Website tier', 'Site generator and automatic publishing', 'Generate three test sites', null),
  (34, 'Website tier', 'Free web addresses and own-domain connection', 'Approve the DNS change', null),
  (35, 'Website tier', 'Enquiries to WhatsApp from the BrandIn30 number', 'Approve the message templates in Meta', null),
  (36, 'Website tier', 'Website updates by WhatsApp', 'Send 10 test requests', null),
  (37, 'Website tier', 'Monthly billing and the monthly results message', 'Test subscribe and cancel', null),
  (38, 'Website tier', 'Five customers end to end; website tier on sale', 'Watch and approve', 'full_launch')
)
insert into brandin30.ops_milestones (day, title, phase, planned_on, your_part, flag, status)
select p.day, p.title, p.phase, d.on_date, p.your_part, p.flag, case when p.day = 1 then 'in_progress' else 'planned' end
from plan p join days d on d.day = p.day;

with days as (
  select d::date as on_date, row_number() over (order by d) as day
  from generate_series('2026-11-24'::date, '2027-02-28'::date, interval '1 day') d
  where extract(dow from d) <> 0
), t (day, sort, owner, status, title, note) as (values
  (1, 1, 'Claude', 'done', 'Create the BrandIn30 section of the database', 'Own schema inside the shared Supabase project'),
  (1, 2, 'Claude', 'doing', 'Build the selling page with waitlist and pre-order buttons', null),
  (1, 3, 'Claude', 'doing', 'Build this dashboard', null),
  (1, 4, 'You', 'todo', 'Create a private GitHub repo named brandin30', 'github.com, +, New repository, Private, nothing else ticked'),
  (1, 5, 'Claude', 'todo', 'Push the code to GitHub', 'Waits for the repo'),
  (2, 1, 'You', 'todo', 'Import the brandin30 repo in Vercel', null),
  (2, 2, 'You', 'todo', 'Point brandin30.in at Vercel from Namecheap', null),
  (2, 3, 'Claude', 'todo', 'Check the live site and a test waitlist sign-up', null),
  (3, 1, 'You', 'todo', 'Finish Razorpay KYC', 'Approval can take several days'),
  (3, 2, 'You', 'todo', 'Create two Razorpay payment pages: Starter 999 and Founding member 1,499', null),
  (3, 3, 'You', 'todo', 'Create Microsoft Clarity and Google Analytics, share the IDs', null),
  (3, 4, 'Claude', 'todo', 'Connect the payment links and tracking to the page', null),
  (4, 1, 'You', 'todo', 'Pick three real businesses for demo kits', 'Different industries, not The Growth Lab'),
  (4, 2, 'Claude', 'todo', 'Produce the three demo kits and add them to the page', null),
  (5, 1, 'You', 'todo', 'Create the Railway project and the Slack app', 'Step-by-step guide comes on the day'),
  (5, 2, 'Claude', 'todo', 'Copy the agent core from My LabOS and bring the Chief of Staff online', null),
  (6, 1, 'You', 'todo', 'Buy the outreach mailbox on its own domain', 'Warm-up takes weeks, so it starts early'),
  (6, 2, 'Claude', 'todo', 'Build the live view', null)
)
insert into brandin30.ops_tasks (day, sort, owner, status, title, note, due_on)
select t.day, t.sort, t.owner, t.status, t.title, t.note, d.on_date from t join days d on d.day = t.day;

insert into brandin30.ops_agents (sort, name, team, job, phase, build_day, status) values
  (1, 'Chief of Staff', 'Management', 'Runs the day, takes your instructions, sends the morning brief', 2, 5, 'planned'),
  (2, 'Strategist', 'Management', 'Weekly review with up to three proposed changes', 5, 31, 'planned'),
  (3, 'Scout', 'Outreach', 'Finds small businesses on Google Maps, city by city', 4, 21, 'planned'),
  (4, 'Profiler', 'Outreach', 'Picks businesses that look unbranded and can pay; tiers them A, B, C', 4, 21, 'planned'),
  (5, 'Researcher', 'Outreach', 'Reads each website for emails, mobiles and WhatsApp links', 4, 22, 'planned'),
  (6, 'Gatekeeper', 'Outreach', 'Checks contacts and applies the do-not-contact list', 4, 22, 'planned'),
  (7, 'Previewer', 'Outreach', 'Builds a sample brand for each prospect and links it in the email', 4, 23, 'planned'),
  (8, 'Copywriter', 'Outreach', 'Writes each email with a personal first line', 4, 24, 'planned'),
  (9, 'Sender', 'Outreach', 'Asks for approval of the daily batch, then sends it spaced out', 4, 25, 'planned'),
  (10, 'Inbox', 'Outreach', 'Sorts replies, suggests answers, handles opt-outs and bounces', 4, 26, 'planned'),
  (11, 'Nurturer', 'Outreach', 'Follow-ups for people who generated a brand but did not buy', 4, 27, 'planned'),
  (12, 'Concierge', 'Website', 'Website chat that leads visitors to generate their brand', 4, 27, 'planned'),
  (13, 'Support', 'Customers', 'Answers customer questions and flags refunds', 5, 28, 'planned'),
  (14, 'Delivery monitor', 'Customers', 'Watches that every paid kit is generated and delivered', 5, 29, 'planned'),
  (15, 'Bookkeeper', 'Finance', 'Reconciles Razorpay, issues GST invoices, tracks margins', 5, 30, 'planned');

insert into brandin30.ops_budget (sort, item, purpose, monthly_inr, status) values
  (1, 'Namecheap', 'brandin30.in domain, billed yearly', null, 'active'),
  (2, 'Supabase', 'Database, shared with My LabOS on the free plan', 0, 'active'),
  (3, 'Vercel', 'Hosts the website, product and dashboards', null, 'not set up'),
  (4, 'Railway', 'Runs the agent worker', null, 'not set up'),
  (5, 'Claude API', 'Brand strategist, quality critic and the agents', null, 'not set up'),
  (6, 'Google Places API', 'Finds prospects', null, 'not set up'),
  (7, 'Outreach mailbox', 'Sending domain and mailbox for cold email', null, 'not set up'),
  (8, 'Razorpay', 'Payments; a fee on each sale, no monthly charge', 0, 'not set up'),
  (9, 'Slack', 'Founder channel: brief, approvals, alerts', 0, 'not set up'),
  (10, 'WhatsApp Cloud API', 'Delivery and support messages; charged per message', null, 'not set up');

insert into brandin30.ops_risks (kind, title, impact, owner, mitigation, status, raised_on) values
  ('risk', 'Demand is unproven: no customer conversations or payments yet', 'High', 'You', 'Selling page and pre-orders go live first. Gate: 10 paid pre-orders from strangers before the engine is finished.', 'open', '2026-11-24'),
  ('risk', 'Logo quality decides whether people pay', 'High', 'Claude', 'Design engine with a curated library, 12 candidates and a quality gate. You rate samples at every step.', 'open', '2026-11-24'),
  ('risk', 'Few unbranded businesses publish an email address', 'Medium', 'Claude', 'Outreach is a supplement. Ads, search pages and the watermark carry most of the volume.', 'open', '2026-11-24'),
  ('risk', 'BrandIn30 shares one database with live My LabOS', 'Medium', 'Claude', 'Own schema, no changes to My LabOS tables. Moves to its own project once there are paying customers.', 'watching', '2026-11-24'),
  ('risk', 'Vercel free plan is meant for non-commercial sites', 'Medium', 'You', 'Check which Vercel plan the account is on before taking payments.', 'open', '2026-11-24'),
  ('risk', 'Plan dates are a first estimate', 'Medium', 'Claude', 'This dashboard shows slips as they happen; the plan is re-cut at each phase end.', 'open', '2026-11-24'),
  ('risk', 'Google limits how long Places details may be stored', 'Low', 'Claude', 'Check the current terms before building the Scout; refresh records on a schedule.', 'open', '2026-11-24');

insert into brandin30.ops_decisions (decided_on, decision, why) values
  ('2026-10-15', 'One-time pricing: Starter 999, Complete Kit 2,499 (founding members 1,499), website tier 499 a month', 'A brand kit is a one-time outcome; forced subscriptions were hard to defend'),
  ('2026-10-15', 'AI decides, code draws: Claude writes the brand spec and a design engine renders every asset', 'Image models are inconsistent and garble text; a curated library gives the same quality every time'),
  ('2026-10-15', 'No human involved in any customer order', 'Keeps the 30-second promise'),
  ('2026-10-15', 'Generate 12 candidates, show the best 3', 'An automatic quality gate replaces a human reviewer'),
  ('2026-10-15', 'WhatsApp runs only on BrandIn30 numbers, never on customers'' numbers', 'Meta verification for each customer would need a person'),
  ('2026-11-24', 'BrandIn30 runs as an organisation of agents, modelled on My LabOS', 'The founder decides; agents execute'),
  ('2026-11-24', 'Stack: Claude Code with gstack, GitHub, Vercel, Railway, Supabase, Claude API, Slack', 'Same stack as My LabOS, so its agents and dashboards can be reused'),
  ('2026-11-24', 'Vercel replaces Netlify; Antigravity dropped', 'One builder, and the My LabOS dashboard code runs on Vercel'),
  ('2026-11-24', 'Razorpay stays; YouPI-PG rejected', 'YouPI-PG is experimental, confirms payments by reading SMS and has no subscriptions'),
  ('2026-11-24', 'Agent code is copied into new repos, not shared with My LabOS', 'My LabOS started sending live emails today and must not be disturbed'),
  ('2026-11-24', 'Database: own schema inside the mylabos Supabase project; Appwrite rejected', 'No extra cost now; Appwrite would mean rewriting the reused code'),
  ('2026-11-24', 'Build order: selling page and dashboard first', 'Tests demand in days and gives the agents something to sell');

insert into brandin30.ops_activity (actor, text) values
  ('Claude', 'Created the BrandIn30 section of the database and the first 38-day plan');
