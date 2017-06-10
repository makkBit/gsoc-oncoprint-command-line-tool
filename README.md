# Make node.js command-line tool out of oncoprint.js library

##### Description
The goal is to use the existing oncoprint library, and the node.js javascript environment, to create a fully-featured command line tool which allows users to pass in their data (format TBD), pass in configuration parameters of how they'd like the oncoprint to look, and receive an oncoprint in SVG format.

#### Installation
```
git clone https://github.com/makkBit/gsoc-oncoprint-command-line-tool.git
cd gsoc-oncoprint-command-line-tool
npm install -g
```

#### Usage
oncoprint [options]


#### Available options:
1. -h, --help                 outputs usage information
2. -V, --version              outputs the version number
3. -f, --features			  outputs the list of features


#### Packages used:
1. Commander - light-weight, expressive, and powerful command-line framework for node.js.
2. Clack -  terminal string styling
.......




