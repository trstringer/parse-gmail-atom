const parseString = require('xml2js').parseString;
const stdin = process.stdin;

function parseEmails(result, emailDelimiter) {
  let flatEmails = '';
  const emails = result.feed.entry;

  let i;
  for (i = 0; i < emails.length; i++) {
    flatEmails += emailDelimiter;
    flatEmails += '\n';
    flatEmails += emails[i].id[0];
    flatEmails += '\n';
    flatEmails += emails[i].author[0].name[0];
    flatEmails += '\n';
    flatEmails += emails[i].author[0].email[0];
    flatEmails += '\n';
    flatEmails += emails[i].title;
    flatEmails += '\n';
    flatEmails += emails[i].summary;
    flatEmails += '\n';
  }

  return flatEmails;
}

let data = '';

stdin.on('readable', () => {
  const dataTemp = stdin.read();
  if (dataTemp) {
    data += dataTemp;
  }
});

stdin.on('end', () => {
  parseString(data, (err, result) => {
    if (err) {
      process.stdout.write(err.message);
      process.exit(1);
    }
    else {
      process.stdout.write(parseEmails(result, '***EMAIL***'));
      process.exit(0);
    }
  });
});