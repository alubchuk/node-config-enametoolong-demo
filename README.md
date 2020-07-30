# Description
This project demonstrates `ENAMETOOLONG` OS level error 
which sometimes happens to occur in `node-config` library.

## Recommendations
It's better to run this code on OS X system which has Python installed (Linux should also work, but I didn't test this script there, however I know that Linux has usually 4096 bytes limitation for PATH_MAX).

## Steps to reproduce
1. Clone the project
2. Run `npm i`
3. Execute `node src/index.js` in terminal and check the error message which looks like this:

```bash
Error: Config file /Users/alexlubchuk/open-source/issues/node-config-enametoolong-issue/src/a.json:/Users/alexlubchuk/open-source/issues/node-config-enametoolong-issue/src/ab.json:/Users/alexlubchuk/open-source/issues/node-config-enametoolong-issue/src/abcdefghijklmnopqrstu-8.json:/Users/alexlubchuk/open-source/issues/node-config-enametoolong-issue/src/abcdefghijklmnopqrstuvwqyz-1.json:/Users/alexlubchuk/open-source/issues/node-config-enametoolong-issue/src/abcdefghijklmnopqrstuvwqyz-2.json:/Users/alexlubchuk/open-source/issues/node-config-enametoolong-issue/src/abcdefghijklmnopqrstuvwqyz-3.json:/Users/alexlubchuk/open-source/issues/node-config-enametoolong-issue/src/abcdefghijklmnopqrstuvwqyz-4.json:/Users/alexlubchuk/open-source/issues/node-config-enametoolong-issue/src/abcdefghijklmnopqrstuvwqyz-5.json:/Users/alexlubchuk/open-source/issues/node-config-enametoolong-issue/src/abcdefghijklmnopqrstuvwqyz-6.json:/Users/alexlubchuk/open-source/issues/node-config-enametoolong-issue/src/abcdefghijklmnopqrstuvwqyz-7.json/runtime.json cannot be read. Error code is: ENAMETOOLONG. Error message is: ENAMETOOLONG: name too long, open '/Users/alexlubchuk/open-source/issues/node-config-enametoolong-issue/src/a.json:/Users/alexlubchuk/open-source/issues/node-config-enametoolong-issue/src/ab.json:/Users/alexlubchuk/open-source/issues/node-config-enametoolong-issue/src/abcdefghijklmnopqrstu-8.json:/Users/alexlubchuk/open-source/issues/node-config-enametoolong-issue/src/abcdefghijklmnopqrstuvwqyz-1.json:/Users/alexlubchuk/open-source/issues/node-config-enametoolong-issue/src/abcdefghijklmnopqrstuvwqyz-2.json:/Users/alexlubchuk/open-source/issues/node-config-enametoolong-issue/src/abcdefghijklmnopqrstuvwqyz-3.json:/Users/alexlubchuk/open-source/issues/node-config-enametoolong-issue/src/abcdefghijklmnopqrstuvwqyz-4.json:/Users/alexlubchuk/open-source/issues/node-config-enametoolong-issue/src/abcdefghijklmnopqrstuvwqyz-5.json:/Users/alexlubchuk/open-source/issues/node-config-enametoolong-issue/src/abcdefghijklmnopqrstuvwqyz-6.json:/Users/alexlubchuk/open-source/issues/node-config-enametoolong-issue/src/abcdefghijklmnopqrstuvwqyz-7.json/runtime.json'
    at Config.util.parseFile (/Users/alexlubchuk/open-source/issues/node-config-enametoolong-issue/node_modules/config/lib/config.js:771:13)
    at Config.util.loadFileConfigs (/Users/alexlubchuk/open-source/issues/node-config-enametoolong-issue/node_modules/config/lib/config.js:648:26)
    at new Config (/Users/alexlubchuk/open-source/issues/node-config-enametoolong-issue/node_modules/config/lib/config.js:116:27)
    at Object.<anonymous> (/Users/alexlubchuk/open-source/issues/node-config-enametoolong-issue/node_modules/config/lib/config.js:1441:31)
    at Module._compile (internal/modules/cjs/loader.js:689:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:700:10)
    at Module.load (internal/modules/cjs/loader.js:599:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:538:12)
    at Function.Module._load (internal/modules/cjs/loader.js:530:3)
    at Module.require (internal/modules/cjs/loader.js:637:17)
```
4. Pay attention to this part:
```bash
Error code is: ENAMETOOLONG. Error message is: ENAMETOOLONG: name too long
```
5. By default the lenght of the filenames is configured in such a way that it fails for filenames that has 1024 bytes long (OS X default PATH_MAX value). Rename `ab.json` file to `b.json` and run script again. Make sure you don't see that error any more.

6. Values of PATH_MAX and NAME_MAX are printed out for debug purposes using python `os` module (python 2 should be installed on your system).

7. Another way how you can check the value of PATH_MAX on your OS X system is to run this script (probably you will need to adjust the path if it fails to run):

```bash
# First you need to find syslimits.h file
find /Applications/Xcode.app -type f -name "syslimits"

# Then you can check the value
cat /<put_your_path_here>/syslimits.h | grep -i  path_max
```
