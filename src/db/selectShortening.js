const AWS = require('aws-sdk')
const util = require('util')

const { TableName, region } = require('./config')

/**
 * @returns {string|undefined} url
 */
module.exports = async id => {
  const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10', region })
  const getItem = util.promisify(dynamodb.getItem.bind(dynamodb)) // TODO performance?
  const { Item } = await getItem({
    Key: {
      id: { S: id }
    },
    TableName
  })
  return Item && Item.url.S
}
