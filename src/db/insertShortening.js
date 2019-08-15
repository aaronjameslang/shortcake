const AWS = require('aws-sdk')
const util = require('util')

const { TableName, region } = require('./config')
const newId = require('./newId')

/**
 * @returns {string} id
 */
module.exports = async url => {
  const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10', region })
  const putItem = util.promisify(dynamodb.putItem.bind(dynamodb)) // TODO performance?
  const id = await newId()
  await putItem({
    Item: {
      id: { S: id },
      url: { S: url }
    },
    TableName
  })
  return id
}
