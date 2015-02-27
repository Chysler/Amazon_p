var util = require("util");
var helpers = require("../helpers");
var Policy = require("../s3post").Policy;
var S3Form = require("../s3post").S3Form;
var AWS_CONFIG_FILE = "config.json";
var POLICY_FILE = "policy.json";
var INDEX_TEMPLATE = "index.ejs";



var task = function(request, callback){
	//1. Загрузка конфигурации
	var awsConfig = helpers.readJSONFile(AWS_CONFIG_FILE);
	var policyData = helpers.readJSONFile(POLICY_FILE);

	//2. подготовка политики
	var policy = new Policy(policyData);

	//3. генерировать поля формы для  S3 POST
	var s3Form = new S3Form(policy);
	var fields = s3Form.generateS3FormFields();
	var fields = s3Form.addS3CredientalsFields(fields, awsConfig)
	console.log(util.inspect(fields, false, null));

	//4. получить bucket имя
	var bucket = policy.getConditionValueByKey("bucket");
	
	callback(null, {template: INDEX_TEMPLATE, params:{fields:fields, bucket:bucket}});
	}
	exports.action = task;
