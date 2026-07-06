// Using native fetch in Node 18+

async function test() {
  try {
    const username = 'Yunaaaard';
    const url = `https://github-contributions-api.jogruber.de/v4/${username}`;
    console.log('Fetching', url);
    const res = await fetch(url);
    if (!res.ok) {
      console.log('Response not ok:', res.status, res.statusText);
      return;
    }
    const data = await res.json();
    console.log('Data keys:', Object.keys(data));
    if (data.contributions) {
      console.log('Contributions length:', data.contributions.length);
      console.log('First contribution date:', data.contributions[0].date);
      console.log('Last contribution date:', data.contributions[data.contributions.length - 1].date);
      const uniqueYears = Array.from(
        new Set(data.contributions.map((d) => d.date.split("-")[0]))
      );
      console.log('Unique years:', uniqueYears);
    } else {
      console.log('No contributions array found!');
    }
  } catch (e) {
    console.error('Fetch error:', e);
  }
}

test();
