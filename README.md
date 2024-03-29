# MRSignalServer

## Description
This project is used for MR signal server integration

## Installation
*	install [nodejs][0] **Note:** make sure you also install npm [[1]]

*	Clone/Download project and run following script

*	Go to the directory after downloading

**Install Yarn [[2]]**

``` bash
  $ npm install -g yarn
```

**Install forever**

``` bash
  $ npm install -g forever
```

## Usage

**Recover used packages**

``` bash
  $ yarn
```

**Set up forever**

``` bash
  $ forever start signalserver.js
```

**Check**

``` bash
  $ forever list
```

*	You can edit `.env` file if you want to change the server port and file generate location for running MR 

## Auto start while server booting

`Windows`

* Create the start.bat
```
C:

cd C:\MRSignalServer

forever start signalserver.js
```

* Then `Win+R` type `shell:startup` press `Enter` , drag the start.bat into the startup directory


[0]: https://nodejs.org/en/
[1]: https://www.npmjs.com/
[2]: https://yarnpkg.com/lang/en/
