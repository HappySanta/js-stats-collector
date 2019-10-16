const metric = require('./index')

metric.appName = "bad_app/4"

metric.sum("test_1", 1)
metric.sum("test_1", 1)
metric.sum("test_1", 1)

metric.avg("test_10", 10)
metric.avg("test_10", 1)
metric.avg("test_10", 5)