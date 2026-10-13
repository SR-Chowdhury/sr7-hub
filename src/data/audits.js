export const wordpressAudits = [
  {
    id: 'jba-audit-01',
    title: 'Full Security Audit with Wordfence',
    client: 'Anonymized (Class Project)',
    category: 'Class Project',
    environment: 'Local XAMPP (migrated from live site)',
    duration: '2 days',
    summary: 'A complete security audit of a small business WordPress site. Found and remediated 225 issues, including critical plugin vulnerabilities, exposed logs, and misconfigurations.',
    confidentialityNote: 'Client name withheld. This audit was completed as a class project with permission from the course instructor. No confidential data is published.',
    tools: ['Wordfence', 'WPS Hide Login', 'WP Hide & Security Enhancer', 'Disable XML-RPC-API', 'Better Search Replace'],

    scope: [
      { label: 'Files Scanned', value: '64,807' },
      { label: 'Plugins', value: '58' },
      { label: 'Themes', value: '8' },
      { label: 'Posts', value: '48' },
      { label: 'URLs Checked', value: '46,057' },
    ],

    methodology: [
      { step: 'Full Security Scan', tool: 'Wordfence', purpose: 'Identify all vulnerabilities' },
      { step: 'Plugin Review', tool: 'WordPress Admin', purpose: 'Find outdated plugins' },
      { step: 'Login Hardening', tool: 'WPS Hide Login', purpose: 'Change default admin URL' },
      { step: 'Plugin Obfuscation', tool: 'WP Hide & Security Enhancer', purpose: 'Reduce fingerprinting' },
      { step: 'XML-RPC Block', tool: 'Disable XML-RPC-API', purpose: 'Block brute-force attacks' },
      { step: 'Search-Replace', tool: 'Better Search Replace', purpose: 'Fix broken URLs after migration' },
    ],

    findingsSummary: {
      total: 225,
      critical: 5,
      high: 1,
      medium: 12,
      low: 207,
    },

    criticalFindings: [
      {
        id: 'finding-1',
        title: 'Publicly accessible debug.log',
        severity: 'Critical',
        detail: 'wp-content/debug.log was publicly readable, exposing stack traces and internal paths.',
        fix: 'Deleted the file and enabled version hiding to suppress new logs.',
      },
      {
        id: 'finding-2',
        title: 'All-in-One WP Migration outdated',
        severity: 'Critical',
        detail: 'Version 7.48 had a known vulnerability. Latest is 7.111.',
        fix: 'Updated the plugin to the latest version.',
      },
      {
        id: 'finding-3',
        title: 'All-in-One WP Migration Unlimited Extension vulnerable',
        severity: 'Critical',
        detail: 'Version 2.36 was affected by CVE-2026-5753 (Broken Access Control).',
        fix: 'Deactivated and deleted the vulnerable extension.',
      },
      {
        id: 'finding-4',
        title: 'Astra theme outdated',
        severity: 'Critical',
        detail: 'Version 4.10.1 had a security issue fixed in 4.14.0.',
        fix: 'Updated the theme from the WordPress dashboard.',
      },
      {
        id: 'finding-5',
        title: 'WordPress core file modified (version.php)',
        severity: 'High',
        detail: 'wp-includes/version.php differed from the original distribution.',
        fix: 'Enabled "Hide WordPress version" in Wordfence, which is the expected modification.',
      },
    ],

    remediation: [
      { action: 'Deleted publicly accessible debug.log', result: 'Removed exposed logs' },
      { action: 'Updated all active plugins one by one', result: 'Patched 7 known vulnerabilities' },
      { action: 'Updated Astra theme to 4.14.0', result: 'Fixed version security issue' },
      { action: 'Enabled version hiding in Wordfence', result: 'Stopped version fingerprinting' },
      { action: 'Disabled XML-RPC', result: 'Blocked brute-force vector' },
      { action: 'Configured brute-force lockout (3 attempts)', result: 'Prevented password guessing' },
      { action: 'Changed login URL with WPS Hide Login', result: 'Reduced bot attacks' },
      { action: 'Obfuscated plugin names', result: 'Reduced fingerprinting' },
      { action: 'Ran Better Search Replace for URLs', result: 'Fixed broken links and images' },
    ],

    beforeAfter: {
      before: { total: 225, critical: 5 },
      after: { total: 0, critical: 0 },
    },

    recommendations: [
      'Keep WordPress core, plugins, and themes updated',
      'Enable automatic updates where safe',
      'Use strong passwords and enable two-factor authentication',
      'Schedule regular backups (All-in-One WP Migration)',
      'Run Wordfence scans weekly',
      'Rotate the login URL periodically',
      'Monitor file integrity changes weekly',
      'Restrict file permissions on wp-config.php',
    ],

    lessons: [
      'Always check every page after migration, not just the homepage',
      'Plugin vulnerabilities are the #1 risk in WordPress',
      'Version hiding is a small but valuable defense',
      'Test after each update (one at a time, not in bulk)',
      'Backup before every update, even on localhost',
    ],
  },
]