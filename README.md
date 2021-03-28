# Employee data visualizer

In scope of this task, my goal was to make the code as reusable as possible. The tables are built in a way that allows to add any amount of columns (to a reasonable limit, of course - but if, for instance, someone would like to add 4th column in the table, this should not be a problem at all thanks to grid layout). The table is also based on the component that could be used for any other table, so it's not bound to any business logic. Some functions used for mapping in SalaryAnalytics.tsx are still very closely related to the employees' salary analytics. This is because for such utilities I tend to use "the rule of three" - do not extract anything to shared until it's used three times.

## Used packages

I decided that mobx / redux are a bit of an overkill for such an app, as, in fact, no components need access to a shared store and the props chain is not so huge as it happens sometimes.
For small UI components (tabs, checkboxes, and popover) I used material-ui. I don't actually like importing huge libraries for three components, but in this case, it would be too much of a time waste. Popover is used to hide the filters, they're on the right side of the header :)

For the chart, nivo seemed to be a decent choice, plus as mentioned, I had some experience with this library, so I decided: why not!

Obviously I wanted to try out react with typescript so it's fully written in typescript. I loved it!

For styling, I used material-ui/styles in order to try something new out. To be honest, I feel disappointed and I see no pros over good old less / scss. Maybe I didn't dig deep enough, IDK.

Finally, I used react-device-detect to achieve a better user experience on mobile devices. Speaking of which...

## App responsiveness

I tried to make the application look and feel the same on mobile as on desktop. Please, to check it out, either use a mobile device or emulator mode of Chrome dev tools, as react-device-detect relies on user-agent instead of screen width.
Also, I added a loading indicator which pops up in two cases: when the data is "loading" - there is a 2s timeout for that and when the lazy loaded scripts for chart are fetched. The lazy loading helped to reduce the initial bundle size and improve the Lighthouse score.

## Tests

It turns out to be one hell of a challenge to properly test functional components, especially, when they are not really interactive and are only showing the data.
To achieve a better coverage, I extracted some of the functions used for data mapping from SalaryAnalytics.tsx to helpers.ts in the same folder; this allowed to at least test that those functions return the expected results. As for the technologies, nothing extraordinary: jest & enzyme.

## Launch the app

Run the application locally: `npm start`
Run the tests: `npm test`