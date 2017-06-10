
/*****************************************************
	- commands and options definition and validation
	- calls library.js and outputs result

******************************************************/

const chalk = require('chalk');		// terminal string styling
const library = require('./library.js');

module.exports = function ( program ) {

	program
	  .version('0.0.1')	
	  .option('-f, --features', 'outputs the list of features')
	  .parse(process.argv);

	if(program.features){
		console.log(chalk.green('1.Genetic alteration tracks, Heatmap tracks \n2.Customizable render parameters, such as the colors and shapes \n3.Custom data format specification for ease of use \n4.Sorting \n5.feeding in your own data, or pulling data from the cBioPortal using our REST API'));
	}
		


}