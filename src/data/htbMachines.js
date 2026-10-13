export const htbMachines = [
  {
    id: 'meow',
    machineName: 'Meow',
    difficulty: 'Very Easy',
    os: 'Linux',
    summary: 'A Telnet-based machine. Log in with a blank password as root and read the flag.',
    ports: ['23/tcp - telnet'],
    tools: ['nmap', 'telnet'],
    phases: [
      {
        title: 'Phase 1: Reconnaissance',
        steps: [
          { text: 'Scan the target with nmap', command: 'nmap -sV -sC <TARGET-IP>' },
          { text: 'Found port 23 open running telnet' },
        ],
      },
      {
        title: 'Phase 2: Exploitation',
        steps: [
          { text: 'Connect via telnet', command: 'telnet <TARGET-IP>' },
          { text: 'Login as root with a blank password' },
        ],
      },
      {
        title: 'Phase 3: Capture the Flag',
        steps: [
          { text: 'List files in root home', command: 'ls' },
          { text: 'Read the flag', command: 'cat flag.txt' },
        ],
      },
    ],
    keyFindings: [
      'Telnet on port 23',
      'Root login with blank password',
    ],
    flag: 'b40abdfe23665f766f9c61ecba8a4c19',
    remediation: 'Disable Telnet. Enforce strong passwords. Never allow blank password login.',
    notes: 'First HTB Starting Point machine. Teaches Telnet and blank password login.',
  },
  {
    id: 'fawn',
    machineName: 'Fawn',
    difficulty: 'Very Easy',
    os: 'Linux',
    summary: 'An FTP-based machine with anonymous login allowed. Download the flag via FTP.',
    ports: ['21/tcp - ftp (vsftpd 3.0.3)'],
    tools: ['nmap', 'ftp'],
    phases: [
      {
        title: 'Phase 1: Reconnaissance',
        steps: [
          { text: 'Scan the target', command: 'nmap -sV -sC <TARGET-IP>' },
          { text: 'Found port 21 with vsftpd 3.0.3' },
          { text: 'Anonymous FTP login allowed' },
        ],
      },
      {
        title: 'Phase 2: Exploitation',
        steps: [
          { text: 'Connect via FTP', command: 'ftp <TARGET-IP>' },
          { text: 'Login with username: anonymous' },
          { text: 'List files', command: 'ls' },
          { text: 'Download the flag', command: 'get flag.txt' },
          { text: 'Exit', command: 'bye' },
        ],
      },
      {
        title: 'Phase 3: Read the Flag',
        steps: [
          { text: 'Read locally', command: 'cat flag.txt' },
        ],
      },
    ],
    keyFindings: [
      'FTP on port 21',
      'vsftpd 3.0.3',
      'Anonymous login allowed',
    ],
    flag: '035db21c881520061c53e0536e44f815',
    remediation: 'Disable anonymous FTP. Use SFTP instead.',
    notes: 'Teaches FTP enumeration and file download.',
  },
  {
    id: 'dancing',
    machineName: 'Dancing',
    difficulty: 'Very Easy',
    os: 'Windows',
    summary: 'An SMB machine with an open share accessible via blank password.',
    ports: ['445/tcp - microsoft-ds', '139/tcp - netbios-ssn'],
    tools: ['nmap', 'smbclient'],
    phases: [
      {
        title: 'Phase 1: Reconnaissance',
        steps: [
          { text: 'Scan the target', command: 'nmap -sV -sC <TARGET-IP>' },
          { text: 'Found ports 139 and 445 (SMB)' },
        ],
      },
      {
        title: 'Phase 2: Enumerate Shares',
        steps: [
          { text: 'List SMB shares', command: 'smbclient -L \\\\<TARGET-IP>' },
          { text: 'Found 4 shares: ADMIN$, C$, IPC$, WorkShares' },
        ],
      },
      {
        title: 'Phase 3: Exploitation',
        steps: [
          { text: 'Connect to WorkShares with blank password', command: 'smbclient \\\\\\\\<TARGET-IP>\\\\WorkShares' },
          { text: 'List directories', command: 'ls' },
          { text: 'Navigate to James.P folder', command: 'cd James.P' },
          { text: 'Download the flag', command: 'get flag.txt' },
        ],
      },
    ],
    keyFindings: [
      'SMB on port 445',
      'WorkShares accessible with blank password',
      'Two user folders: Amy.J and James.P',
    ],
    flag: '5f61c10dffbc77a704d76016a22f1664',
    remediation: 'Disable null sessions. Set passwords on all SMB shares.',
    notes: 'Teaches SMB enumeration and share access. Use forward slashes // on Linux.',
  },
  {
    id: 'redeemer',
    machineName: 'Redeemer',
    difficulty: 'Very Easy',
    os: 'Linux',
    summary: 'A Redis machine with no authentication. Access the key-value store and retrieve the flag.',
    ports: ['6379/tcp - redis'],
    tools: ['nmap', 'redis-cli'],
    phases: [
      {
        title: 'Phase 1: Reconnaissance',
        steps: [
          { text: 'Scan all ports (Redis is not in top 1000)', command: 'nmap -p- -T5 <TARGET-IP>' },
          { text: 'Found port 6379 running Redis' },
        ],
      },
      {
        title: 'Phase 2: Enumeration',
        steps: [
          { text: 'Connect to Redis', command: 'redis-cli -h <TARGET-IP>' },
          { text: 'Get server info', command: 'INFO' },
          { text: 'Check keyspace (db0 has 4 keys)' },
        ],
      },
      {
        title: 'Phase 3: Exploitation',
        steps: [
          { text: 'Select database 0', command: 'SELECT 0' },
          { text: 'List all keys', command: 'KEYS *' },
          { text: 'Get the flag value', command: 'GET flag' },
        ],
      },
    ],
    keyFindings: [
      'Redis on port 6379',
      'Version 5.0.7',
      '4 keys in db0 including flag',
    ],
    flag: '03e1d2b376c37ab3f5319922053953eb',
    remediation: 'Enable Redis authentication. Bind to localhost only.',
    notes: 'Redis is not in nmap top 1000. Always scan all ports.',
  },
  {
    id: 'appointment',
    machineName: 'Appointment',
    difficulty: 'Very Easy',
    os: 'Linux',
    summary: 'A web application vulnerable to SQL injection on the login form.',
    ports: ['80/tcp - http (Apache httpd 2.4.38)'],
    tools: ['nmap', 'browser', 'Burp Suite'],
    phases: [
      {
        title: 'Phase 1: Reconnaissance',
        steps: [
          { text: 'Scan the target', command: 'nmap -sV -p 80 <TARGET-IP>' },
          { text: 'Found Apache httpd 2.4.38 (Debian)' },
        ],
      },
      {
        title: 'Phase 2: Web Enumeration',
        steps: [
          { text: 'Visit the web application' },
          { text: 'Find the login form' },
        ],
      },
      {
        title: 'Phase 3: Exploitation',
        steps: [
          { text: "Enter admin'# as username" },
          { text: 'Enter any password' },
          { text: 'Login bypasses authentication' },
        ],
      },
    ],
    keyFindings: [
      'Apache 2.4.38',
      'Login form vulnerable to SQL injection',
      'Comment character # bypasses password check',
    ],
    flag: 'Congratulations - you have logged in as admin',
    remediation: 'Use parameterized queries. Never concatenate user input into SQL.',
    notes: 'Classic SQL injection with # comment. Simpler than PortSwigger labs.',
  },
  {
    id: 'sequel',
    machineName: 'Sequel',
    difficulty: 'Very Easy',
    os: 'Linux',
    summary: 'A MariaDB machine with blank root password. Access the database and retrieve the flag.',
    ports: ['3306/tcp - mysql (MariaDB)'],
    tools: ['nmap', 'mysql'],
    phases: [
      {
        title: 'Phase 1: Reconnaissance',
        steps: [
          { text: 'Scan the target', command: 'nmap -sV -p 3306 <TARGET-IP>' },
          { text: 'Found MariaDB 10.3.27' },
        ],
      },
      {
        title: 'Phase 2: Exploitation',
        steps: [
          { text: 'Connect to MariaDB', command: 'mysql -h <TARGET-IP> -u root --skip-ssl' },
          { text: 'List databases', command: 'SHOW DATABASES;' },
          { text: 'Use the htb database', command: 'USE htb;' },
          { text: 'List tables', command: 'SHOW TABLES;' },
          { text: 'Query the config table', command: 'SELECT * FROM config;' },
        ],
      },
    ],
    keyFindings: [
      'MariaDB 10.3.27 on port 3306',
      'Root login with blank password',
      'Database: htb, Table: config',
    ],
    flag: '7e8542546f584f8a8a0d155b7ca163d1',
    remediation: 'Set a strong root password. Restrict remote access.',
    notes: 'Use --skip-ssl if the client requires SSL by default.',
  },
  {
    id: 'crocodile',
    machineName: 'Crocodile',
    difficulty: 'Very Easy',
    os: 'Linux',
    summary: 'An FTP and web application machine. Enumerate credentials from FTP, then log in to the web app.',
    ports: ['21/tcp - ftp', '80/tcp - http'],
    tools: ['nmap', 'ftp', 'gobuster', 'browser'],
    phases: [
      {
        title: 'Phase 1: Reconnaissance',
        steps: [
          { text: 'Scan the target', command: 'nmap -sV -sC <TARGET-IP>' },
          { text: 'Found FTP on port 21 and HTTP on port 80' },
        ],
      },
      {
        title: 'Phase 2: FTP Enumeration',
        steps: [
          { text: 'Connect via FTP', command: 'ftp <TARGET-IP>' },
          { text: 'Login with anonymous' },
          { text: 'List files', command: 'ls' },
          { text: 'Download allowed.userlist and allowed.userlist.passwd' },
        ],
      },
      {
        title: 'Phase 3: Web Enumeration',
        steps: [
          { text: 'Directory brute force', command: 'gobuster dir -u http://<TARGET-IP> -w <wordlist> -x php,html' },
          { text: 'Found login.php and config.php' },
        ],
      },
      {
        title: 'Phase 4: Exploitation',
        steps: [
          { text: 'Visit login.php' },
          { text: 'Login with admin credentials from FTP files' },
          { text: 'Read the flag from the dashboard' },
        ],
      },
    ],
    keyFindings: [
      'FTP anonymous login allowed',
      'Two credential files: allowed.userlist and allowed.userlist.passwd',
      'Web login at /login.php',
    ],
    flag: 'c7110277ac44d78b6a9fff2232434d16',
    remediation: 'Disable anonymous FTP. Use strong credentials. Never store credential files on public shares.',
    notes: 'Chain of FTP + web login. Use the FTP credentials to log in to the web app.',
  },
]