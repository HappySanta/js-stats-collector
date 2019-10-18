const dgram = require('dgram')

const SumTag = "P"
const SetTag = "S"
const MaxTag = "M"
const MinTag = "I"
const AvgTag = "A"
const StrTag = "T"

let client
let lastError
let timer

function onEnd() {
	client.close()
	client = null
	timer = null
}

function onSend(err) {
	lastError = err
	if (!timer) {
		timer = setTimeout(onEnd, 10000)
		timer.unref()
	}
}

module.exports = {
	appName: "bad_app/0",
	PORT: 2777,
	HOST: '127.0.0.1',
	getLastError() {
		return lastError
	},
	write(paramName, paramType, value, pattern = '') {
		if (this.appName.indexOf('/') === -1) {
			this.appName = this.appName + '/0'
		}
		const message = Buffer.from(`RL:${this.appName}:${paramName}:${paramType}:${value}:${pattern}`)

		if (!client) {
			client = dgram.createSocket('udp4')
			client.unref()
		}
		clearTimeout(timer)
		timer = null
		client.send(message, 0, message.length, this.PORT, this.HOST, onSend)
	},
	sum(param, value) {
		return this.write(param, SumTag, value, '')
	},
	max(param, value) {
		return this.write(param, MaxTag, value, '')
	},
	min(param, value) {
		return this.write(param, MinTag, value, '')
	},
	avg(param, value) {
		return this.write(param, AvgTag, value, '')
	},
	set(param, value) {
		return this.write(param, SetTag, value, '')
	},
	str(param, pattern, value) {
		return this.write(param, StrTag, value, pattern)
	}
}