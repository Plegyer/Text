# DS-REF-001 — контрольные примеры характеристик

## Для владельца проекта

Задание необязательное: это небольшой безопасный пакет для внешнего исполнителя, не изменение игры. Откройте отдельную папку только с этим файлом. Не подключайте весь проект и индекс скриптов. Результат проверяет интегратор; Git, npm и исходники здесь не нужны. Создание result.json прямо разрешено этим заданием. Общие инструкции безопасности среды сохраняются.

## Для исполнителя

Прочитай только этот файл. Создай единственный файл result.json. Не исследуй другие папки, не меняй игру, не пиши тестовый код, план или отчёт. Все исходные данные ниже; архитектурных решений нет. После записи ответь «Готово».

Результат: JSON-объект с task="DS-REF-001", version=1 и cases — массивом ровно из 12 объектов. Поля каждого объекта: id, rule, input, expected. Никаких дополнительных полей. input содержит ровно перечисленные для правила входы, expected — одно число либо boolean. Ожидаемый объём всего файла — до 5000 знаков. Это вычисление по заданным формулам, не запуск игры.

## Правила

HP: input={strength,durability}. expected=3*strength+7*durability. Бонусов, экипировки и ограничения шкалы нет.

MP: input={intellect,spirit}. expected=3*intellect+2*spirit. Бонусов и ограничения шкалы нет.

DUNGEON_GATE: input={strength,durability,introDone}. expected=true только когда strength>=12, durability>=15 и introDone=false. Других условий в этом изолированном правиле нет.

FARM_GATE: input={intellect,sociability,stage2Done,stage3Done,endingEmpty,finaleMode}. expected=true только когда intellect>=20, sociability>=20, stage2Done=true, stage3Done=false, endingEmpty=true, finaleMode=false. Проверяется разрешение перехода, не достижимость всей цепочки.

EARLY_JOB_GATE: input={strength,durability,prowess,year}. expected=(strength>=30 AND durability>=30 AND prowess>=20) OR year>=2. Это отдельная проверка доступа, не успех последующего сюжета.

## Ровно эти случаи, в этом порядке

01: HP, strength=1, durability=1.
02: HP, strength=2, durability=2.
03: MP, intellect=1, spirit=1.
04: MP, intellect=5, spirit=5.
05: DUNGEON_GATE, strength=11, durability=15, introDone=false.
06: DUNGEON_GATE, strength=12, durability=15, introDone=false.
07: DUNGEON_GATE, strength=12, durability=15, introDone=true.
08: FARM_GATE, intellect=19, sociability=20, stage2Done=true, stage3Done=false, endingEmpty=true, finaleMode=false.
09: FARM_GATE, intellect=20, sociability=20, stage2Done=true, stage3Done=false, endingEmpty=true, finaleMode=false.
10: FARM_GATE, intellect=20, sociability=20, stage2Done=true, stage3Done=false, endingEmpty=false, finaleMode=false.
11: EARLY_JOB_GATE, strength=30, durability=30, prowess=19, year=1.
12: EARLY_JOB_GATE, strength=1, durability=1, prowess=1, year=2.

id записывай строкой "01" … "12", rule — точно одним из пяти обозначений выше. Не добавляй объяснения в JSON. Не проверяй проект и не запускай команды ради отчётности. Приёмка интегратором: валидный JSON, точные поля и входы, 12 правильных результатов, отсутствие иных изменений. Этот пакет не заменяет будущие тесты движка.
