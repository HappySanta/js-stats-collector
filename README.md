# stats collector

```js
const collector = require("@happysanta/js-stats-collector")

collector.appName = "my_clever_app"

// --- Пареметры сохраняемые раз в минуту
// таблица t_my_clever_app
//все значения -- только целые числа
collector.sum("request_count", 1)
collector.sum("request_count", 2)
collector.sum("request_count", 5)
//Сумма всех значений -- 8

collector.min("min_request_time", 1)
collector.min("min_request_time", 2)
collector.min("min_request_time", 5)
//Минимум значений -- 1

collector.max("max_request_time", 1)
collector.max("max_request_time", 2)
collector.max("max_request_time", 5)
//Максимуму значений -- 5

collector.set("current_users_count", 1)
collector.set("current_users_count", 2)
collector.set("current_users_count", 5)
//Последнее из значений -- 5

collector.avg("request_time", 1)
collector.avg("request_time", 2)
collector.avg("request_time", 5)
//Средее значений -- 2 (без дробной части)

//HyperLogLog
// парамтр -- строка до 1000 символов, без символа : внутри
collector.hll("unique_group_ids", "2050")
collector.hll("unique_group_ids", "2051")
collector.hll("unique_group_ids", "2055")
collector.hll("unique_group_ids", "2051")
//unique_group_ids -- 3 потому что 3 уникальных значеия было передано

// --- Парраметры сохраняемые раз в 5 минут
// таблица t_str_my_clever_app
collector.strSum("active_groups", "2051", 1)
collector.strSum("active_groups", "2052", 1)
collector.strSum("active_groups", "2053", 1)
//active_groups будет хранить 3 значния, если за 5 минут будет передано больше 100 уникальных значений, то сохраняться 100 самых частовстречающихся

//Чтобы в бд подгружалась название группы имя метрики должно заканчиваться на _group_id
//в строке должен быть id группы, тогда в таблице в колонке pattern будет имя группы а в node_id -- id группы
```