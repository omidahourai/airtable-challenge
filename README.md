# Airtable Challenge

**Requirements**
```
node >=10.14.2
yarn >=1.15.2
```

**Commands**
```bash
# install dependencies
yarn install

# start dev server
yarn dev
```

* How long you spent on the assignment.
  > ~10 hours (+5 hours attempt with native resizable/ draggable implementation)
* What you like about your implementation.
  > I enjoy using redux + recompose to separate business logic from component, although I'm aware Hooks are the new way to do things (need to take time to update myself). I like my solution for text overflow (ellipsis and reveal on hover). I liked using selectors to iteratively figure out column spans, without auto grid features.
* What you would change if you were going to do it again.
  > I would use hooks and just keep building on it. I might go for a mobile view (vertical scroll, similar to google calendar).
* How you made your design decisions. For example, if you looked at other timelines for inspiration, please note that.
  > I looked at the Airtable's new gant timeline, google calendar, and this image for inspiration: https://tinyurl.com/y243hn6z
* How you would test this if you had more time.
  > I like to use cypress (cypress.io) to do integration/ end-to-end workflow tests, I find it to be an easy and modern solution. I would ensure the elements show up where they need to be, and test components with Jest/ Enzyme. I would do snapshot testing to ensure component render doesn't change (add snapshot file to the repo). Then there's testing props, data types, events, conditions, and state.