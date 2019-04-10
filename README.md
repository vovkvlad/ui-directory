# ui directory

This is my learning project. It basically implements simple directory tree structure
with ability to add/remove/rename items, it also lets user double click on some dorectory
in order to make directory current root

## Purpose

the main purpose of this project is to implement it in 3 different ways:
 - using pure React
 - using React with Redux
 - using React with mob-x

## Get started
just clone it to your machine and run

```
npm i
npm start
```

## Notes
Implementation on redux and mob-x are not ideal. Partially, because
selecting new root of tree is done out of the redux/mob-x scope. This is
due to not really correct architecture done during developing pure React
part. However everything else - selecting items, and mutating file tree is done
via redux/mob-x data flow