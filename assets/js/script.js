document.addEventListener('DOMContentLoaded', function() {
	const working = document.querySelectorAll('.working-area');
	const alert = document.querySelector('.alert');

	if(working) {
		for(let i = 0; i < working.length; i++) {
			// Блоки
			let wa_clear = working[i].querySelector('.btn-clear'),
				wa_send = working[i].querySelector('.btn-send'),
				wa_copy = working[i].querySelector('.btn-copy'),
				wa_start = working[i].querySelector('.ep-fStart textarea'),
				wa_end 	= working[i].querySelector('.ep-fEnd textarea');
				wa_chekbox 	= working[i].querySelector('input[type="checkbox"]');

			// Переменные
			let v_value = '',
				v_result = '',
				v_tmpValue = '',
				v_tmpDetale = '',
				v_tmpCheck = false,
				v_topic = [],
				v_descr = [],
				v_teacher = [],
				v_time = [],
				v_module = [];
			const v_font = new Map([
				['Аграшенков_Александр_Васильевич', 'https://deklarantonline.ru/wp-content/uploads/2016/05/Agrashenkov-280x300.jpg'],
				['Аграшенков_Васильевич_Александр', 'https://deklarantonline.ru/wp-content/uploads/2016/05/Agrashenkov-280x300.jpg'],
				['Александр_Александр_Васильевич', 'https://deklarantonline.ru/wp-content/uploads/2016/05/Agrashenkov-280x300.jpg'],
				['Александр_Васильевич_Александр', 'https://deklarantonline.ru/wp-content/uploads/2016/05/Agrashenkov-280x300.jpg'],
				['Васильевич_Александр_Васильевич', 'https://deklarantonline.ru/wp-content/uploads/2016/05/Agrashenkov-280x300.jpg'],
				['Васильевич_Васильевич_Александр', 'https://deklarantonline.ru/wp-content/uploads/2016/05/Agrashenkov-280x300.jpg'],
				['Голованова_Ирина_Викторовна', 'https://deklarantonline.ru/wp-content/uploads/2016/05/golovanova-225x300.jpg'],
				['Голованова_Викторовна_Ирина', 'https://deklarantonline.ru/wp-content/uploads/2016/05/golovanova-225x300.jpg'],
				['Ирина_Ирина_Викторовна', 'https://deklarantonline.ru/wp-content/uploads/2016/05/golovanova-225x300.jpg'],
				['Ирина_Викторовна_Ирина', 'https://deklarantonline.ru/wp-content/uploads/2016/05/golovanova-225x300.jpg'],
				['Викторовна_Ирина_Викторовна', 'https://deklarantonline.ru/wp-content/uploads/2016/05/golovanova-225x300.jpg'],
				['Викторовна_Викторовна_Ирина', 'https://deklarantonline.ru/wp-content/uploads/2016/05/golovanova-225x300.jpg'],
				['Духницкий_Павел_Сергеевич', 'https://deklarantonline.ru/wp-content/uploads/2016/05/duhnickiy-1-218x300.jpg'],
				['Духницкий_Сергеевич_Павел', 'https://deklarantonline.ru/wp-content/uploads/2016/05/duhnickiy-1-218x300.jpg'],
				['Павел_Павел_Сергеевич', 'https://deklarantonline.ru/wp-content/uploads/2016/05/duhnickiy-1-218x300.jpg'],
				['Павел_Сергеевич_Павел', 'https://deklarantonline.ru/wp-content/uploads/2016/05/duhnickiy-1-218x300.jpg'],
				['Сергеевич_Павел_Сергеевич', 'https://deklarantonline.ru/wp-content/uploads/2016/05/duhnickiy-1-218x300.jpg'],
				['Сергеевич_Сергеевич_Павел', 'https://deklarantonline.ru/wp-content/uploads/2016/05/duhnickiy-1-218x300.jpg'],
				['Пяткова_Татьяна_Владимировна', 'https://deklarantonline.ru/wp-content/uploads/2016/05/pyatkova-218x300.jpg'],
				['Пяткова_Владимировна_Татьяна', 'https://deklarantonline.ru/wp-content/uploads/2016/05/pyatkova-218x300.jpg'],
				['Татьяна_Татьяна_Владимировна', 'https://deklarantonline.ru/wp-content/uploads/2016/05/pyatkova-218x300.jpg'],
				['Татьяна_Владимировна_Татьяна', 'https://deklarantonline.ru/wp-content/uploads/2016/05/pyatkova-218x300.jpg'],
				['Владимировна_Татьяна_Владимировна', 'https://deklarantonline.ru/wp-content/uploads/2016/05/pyatkova-218x300.jpg'],
				['Владимировна_Владимировна_Татьяна', 'https://deklarantonline.ru/wp-content/uploads/2016/05/pyatkova-218x300.jpg'],
				['Сальников_Константин_Алексеевич', 'https://deklarantonline.ru/wp-content/uploads/2019/11/%D0%A1%D0%B0%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA%D0%BE%D0%B2-%D0%9A.%D0%90.-1-683x1024.jpg'],
				['Сальников_Алексеевич_Константин', 'https://deklarantonline.ru/wp-content/uploads/2019/11/%D0%A1%D0%B0%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA%D0%BE%D0%B2-%D0%9A.%D0%90.-1-683x1024.jpg'],
				['Константин_Константин_Алексеевич', 'https://deklarantonline.ru/wp-content/uploads/2019/11/%D0%A1%D0%B0%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA%D0%BE%D0%B2-%D0%9A.%D0%90.-1-683x1024.jpg'],
				['Константин_Алексеевич_Константин', 'https://deklarantonline.ru/wp-content/uploads/2019/11/%D0%A1%D0%B0%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA%D0%BE%D0%B2-%D0%9A.%D0%90.-1-683x1024.jpg'],
				['Алексеевич_Константин_Алексеевич', 'https://deklarantonline.ru/wp-content/uploads/2019/11/%D0%A1%D0%B0%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA%D0%BE%D0%B2-%D0%9A.%D0%90.-1-683x1024.jpg'],
				['Алексеевич_Алексеевич_Константин', 'https://deklarantonline.ru/wp-content/uploads/2019/11/%D0%A1%D0%B0%D0%BB%D1%8C%D0%BD%D0%B8%D0%BA%D0%BE%D0%B2-%D0%9A.%D0%90.-1-683x1024.jpg'],
				['Седнева_Юлия_Анатольевна', 'https://deklarantonline.ru/wp-content/uploads/2016/05/sedneva-1-218x300.jpg'],
				['Седнева_Анатольевна_Юлия', 'https://deklarantonline.ru/wp-content/uploads/2016/05/sedneva-1-218x300.jpg'],
				['Юлия_Юлия_Анатольевна', 'https://deklarantonline.ru/wp-content/uploads/2016/05/sedneva-1-218x300.jpg'],
				['Юлия_Анатольевна_Юлия', 'https://deklarantonline.ru/wp-content/uploads/2016/05/sedneva-1-218x300.jpg'],
				['Анатольевна_Юлия_Анатольевна', 'https://deklarantonline.ru/wp-content/uploads/2016/05/sedneva-1-218x300.jpg'],
				['Анатольевна_Анатольевна_Юлия', 'https://deklarantonline.ru/wp-content/uploads/2016/05/sedneva-1-218x300.jpg'],
				['Кириллова_Дарья_Аркадьевна', 'https://deklarantonline.ru/wp-content/uploads/2016/05/kirillova-d-a.jpg'],
				['Кириллова_Аркадьевна_Дарья', 'https://deklarantonline.ru/wp-content/uploads/2016/05/kirillova-d-a.jpg'],
				['Дарья_Дарья_Аркадьевна', 'https://deklarantonline.ru/wp-content/uploads/2016/05/kirillova-d-a.jpg'],
				['Дарья_Аркадьевна_Дарья', 'https://deklarantonline.ru/wp-content/uploads/2016/05/kirillova-d-a.jpg'],
				['Аркадьевна_Дарья_Аркадьевна', 'https://deklarantonline.ru/wp-content/uploads/2016/05/kirillova-d-a.jpg'],
				['Аркадьевна_Аркадьевна_Дарья', 'https://deklarantonline.ru/wp-content/uploads/2016/05/kirillova-d-a.jpg'],
				['Коробкова_Марина_Николаевна', 'https://deklarantonline.ru/wp-content/uploads/2016/05/korobkova-1-268x300.jpg'],
				['Коробкова_Николаевна_Марина', 'https://deklarantonline.ru/wp-content/uploads/2016/05/korobkova-1-268x300.jpg'],
				['Марина_Марина_Николаевна', 'https://deklarantonline.ru/wp-content/uploads/2016/05/korobkova-1-268x300.jpg'],
				['Марина_Николаевна_Марина', 'https://deklarantonline.ru/wp-content/uploads/2016/05/korobkova-1-268x300.jpg'],
				['Николаевна_Марина_Николаевна', 'https://deklarantonline.ru/wp-content/uploads/2016/05/korobkova-1-268x300.jpg'],
				['Николаевна_Николаевна_Марина', 'https://deklarantonline.ru/wp-content/uploads/2016/05/korobkova-1-268x300.jpg'],
				['Кулешов_Александр_Викторович', 'https://deklarantonline.ru/wp-content/uploads/2016/05/kuleshov-1-218x300.jpg'],
				['Кулешов_Викторович_Александр', 'https://deklarantonline.ru/wp-content/uploads/2016/05/kuleshov-1-218x300.jpg'],
				['Александр_Александр_Викторович', 'https://deklarantonline.ru/wp-content/uploads/2016/05/kuleshov-1-218x300.jpg'],
				['Александр_Викторович_Александр', 'https://deklarantonline.ru/wp-content/uploads/2016/05/kuleshov-1-218x300.jpg'],
				['Викторович_Александр_Викторович', 'https://deklarantonline.ru/wp-content/uploads/2016/05/kuleshov-1-218x300.jpg'],
				['Викторович_Викторович_Александр', 'https://deklarantonline.ru/wp-content/uploads/2016/05/kuleshov-1-218x300.jpg'],
				['Неверовская_Наталия_Юрьевна', 'https://deklarantonline.ru/wp-content/uploads/2016/05/naverovskaya.jpg'],
				['Неверовская_Юрьевна_Наталия', 'https://deklarantonline.ru/wp-content/uploads/2016/05/naverovskaya.jpg'],
				['Наталия_Наталия_Юрьевна', 'https://deklarantonline.ru/wp-content/uploads/2016/05/naverovskaya.jpg'],
				['Наталия_Юрьевна_Наталия', 'https://deklarantonline.ru/wp-content/uploads/2016/05/naverovskaya.jpg'],
				['Юрьевна_Наталия_Юрьевна', 'https://deklarantonline.ru/wp-content/uploads/2016/05/naverovskaya.jpg'],
				['Юрьевна_Юрьевна_Наталия', 'https://deklarantonline.ru/wp-content/uploads/2016/05/naverovskaya.jpg'],
				['Жучков_Александр_Евгеньевич', 'https://deklarantonline.ru/wp-content/uploads/2016/05/juchkov-232x300.jpg'],
				['Жучков_Евгеньевич_Александр', 'https://deklarantonline.ru/wp-content/uploads/2016/05/juchkov-232x300.jpg'],
				['Александр_Александр_Евгеньевич', 'https://deklarantonline.ru/wp-content/uploads/2016/05/juchkov-232x300.jpg'],
				['Александр_Евгеньевич_Александр', 'https://deklarantonline.ru/wp-content/uploads/2016/05/juchkov-232x300.jpg'],
				['Евгеньевич_Александр_Евгеньевич', 'https://deklarantonline.ru/wp-content/uploads/2016/05/juchkov-232x300.jpg'],
				['Евгеньевич_Евгеньевич_Александр', 'https://deklarantonline.ru/wp-content/uploads/2016/05/juchkov-232x300.jpg'],
				['Неверко_Константин_Валерьевич', 'https://deklarantonline.ru/wp-content/uploads/2016/05/neverko.jpg'],
				['Неверко_Валерьевич_Константин', 'https://deklarantonline.ru/wp-content/uploads/2016/05/neverko.jpg'],
				['Константин_Константин_Валерьевич', 'https://deklarantonline.ru/wp-content/uploads/2016/05/neverko.jpg'],
				['Константин_Валерьевич_Константин', 'https://deklarantonline.ru/wp-content/uploads/2016/05/neverko.jpg'],
				['Валерьевич_Константин_Валерьевич', 'https://deklarantonline.ru/wp-content/uploads/2016/05/neverko.jpg'],
				['Валерьевич_Валерьевич_Константин', 'https://deklarantonline.ru/wp-content/uploads/2016/05/neverko.jpg'],
				['Захарьева_Ирина_Адольфовна', 'https://deklarantonline.ru/wp-content/uploads/2016/05/zaharieva-e1464007925105.png'],
				['Захарьева_Адольфовна_Ирина', 'https://deklarantonline.ru/wp-content/uploads/2016/05/zaharieva-e1464007925105.png'],
				['Ирина_Ирина_Адольфовна', 'https://deklarantonline.ru/wp-content/uploads/2016/05/zaharieva-e1464007925105.png'],
				['Ирина_Адольфовна_Ирина', 'https://deklarantonline.ru/wp-content/uploads/2016/05/zaharieva-e1464007925105.png'],
				['Адольфовна_Ирина_Адольфовна', 'https://deklarantonline.ru/wp-content/uploads/2016/05/zaharieva-e1464007925105.png'],
				['Адольфовна_Адольфовна_Ирина', 'https://deklarantonline.ru/wp-content/uploads/2016/05/zaharieva-e1464007925105.png'],
				['Норкина_Клара_Александровна', 'https://deklarantonline.ru/wp-content/uploads/2020/07/%D0%9A%D0%BB%D0%B0%D1%80%D0%B0-%D0%9D%D0%BE%D1%80%D0%BA%D0%B8%D0%BD%D0%B0.jpg'],
				['Норкина_Александровна_Клара', 'https://deklarantonline.ru/wp-content/uploads/2020/07/%D0%9A%D0%BB%D0%B0%D1%80%D0%B0-%D0%9D%D0%BE%D1%80%D0%BA%D0%B8%D0%BD%D0%B0.jpg'],
				['Клара_Клара_Александровна', 'https://deklarantonline.ru/wp-content/uploads/2020/07/%D0%9A%D0%BB%D0%B0%D1%80%D0%B0-%D0%9D%D0%BE%D1%80%D0%BA%D0%B8%D0%BD%D0%B0.jpg'],
				['Клара_Александровна_Клара', 'https://deklarantonline.ru/wp-content/uploads/2020/07/%D0%9A%D0%BB%D0%B0%D1%80%D0%B0-%D0%9D%D0%BE%D1%80%D0%BA%D0%B8%D0%BD%D0%B0.jpg'],
				['Александровна_Клара_Александровна', 'https://deklarantonline.ru/wp-content/uploads/2020/07/%D0%9A%D0%BB%D0%B0%D1%80%D0%B0-%D0%9D%D0%BE%D1%80%D0%BA%D0%B8%D0%BD%D0%B0.jpg'],
				['Александровна_Александровна_Клара', 'https://deklarantonline.ru/wp-content/uploads/2020/07/%D0%9A%D0%BB%D0%B0%D1%80%D0%B0-%D0%9D%D0%BE%D1%80%D0%BA%D0%B8%D0%BD%D0%B0.jpg'],
				['Семенова_Ольга_Евгеньевна', 'https://www.deklarantonline.ru/wp-content/uploads/2018/07/%D0%A1%D0%B5%D0%BC%D0%B5%D0%BD%D0%BE%D0%B2%D0%B0_%D0%9E.%D0%95..png'],
				['Семенова_Евгеньевна_Ольга', 'https://www.deklarantonline.ru/wp-content/uploads/2018/07/%D0%A1%D0%B5%D0%BC%D0%B5%D0%BD%D0%BE%D0%B2%D0%B0_%D0%9E.%D0%95..png'],
				['Ольга_Ольга_Евгеньевна', 'https://www.deklarantonline.ru/wp-content/uploads/2018/07/%D0%A1%D0%B5%D0%BC%D0%B5%D0%BD%D0%BE%D0%B2%D0%B0_%D0%9E.%D0%95..png'],
				['Ольга_Евгеньевна_Ольга', 'https://www.deklarantonline.ru/wp-content/uploads/2018/07/%D0%A1%D0%B5%D0%BC%D0%B5%D0%BD%D0%BE%D0%B2%D0%B0_%D0%9E.%D0%95..png'],
				['Евгеньевна_Ольга_Евгеньевна', 'https://www.deklarantonline.ru/wp-content/uploads/2018/07/%D0%A1%D0%B5%D0%BC%D0%B5%D0%BD%D0%BE%D0%B2%D0%B0_%D0%9E.%D0%95..png'],
				['Евгеньевна_Евгеньевна_Ольга', 'https://www.deklarantonline.ru/wp-content/uploads/2018/07/%D0%A1%D0%B5%D0%BC%D0%B5%D0%BD%D0%BE%D0%B2%D0%B0_%D0%9E.%D0%95..png'],
				['Тарасова_Татьяна_Александровна', 'https://deklarantonline.ru/wp-content/uploads/2022/01/%D0%A2%D0%B0%D1%80%D0%B0%D1%81%D0%BE%D0%B2%D0%B0-%D0%A2%D0%B0%D1%82%D1%8C%D1%8F%D0%BD%D0%B0-%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80%D0%BE%D0%B2%D0%BD%D0%B0.jpg'],
				['Тарасова_Александровна_Татьяна', 'https://deklarantonline.ru/wp-content/uploads/2022/01/%D0%A2%D0%B0%D1%80%D0%B0%D1%81%D0%BE%D0%B2%D0%B0-%D0%A2%D0%B0%D1%82%D1%8C%D1%8F%D0%BD%D0%B0-%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80%D0%BE%D0%B2%D0%BD%D0%B0.jpg'],
				['Татьяна_Татьяна_Александровна', 'https://deklarantonline.ru/wp-content/uploads/2022/01/%D0%A2%D0%B0%D1%80%D0%B0%D1%81%D0%BE%D0%B2%D0%B0-%D0%A2%D0%B0%D1%82%D1%8C%D1%8F%D0%BD%D0%B0-%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80%D0%BE%D0%B2%D0%BD%D0%B0.jpg'],
				['Татьяна_Александровна_Татьяна', 'https://deklarantonline.ru/wp-content/uploads/2022/01/%D0%A2%D0%B0%D1%80%D0%B0%D1%81%D0%BE%D0%B2%D0%B0-%D0%A2%D0%B0%D1%82%D1%8C%D1%8F%D0%BD%D0%B0-%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80%D0%BE%D0%B2%D0%BD%D0%B0.jpg'],
				['Александровна_Татьяна_Александровна', 'https://deklarantonline.ru/wp-content/uploads/2022/01/%D0%A2%D0%B0%D1%80%D0%B0%D1%81%D0%BE%D0%B2%D0%B0-%D0%A2%D0%B0%D1%82%D1%8C%D1%8F%D0%BD%D0%B0-%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80%D0%BE%D0%B2%D0%BD%D0%B0.jpg'],
				['Александровна_Александровна_Татьяна', 'https://deklarantonline.ru/wp-content/uploads/2022/01/%D0%A2%D0%B0%D1%80%D0%B0%D1%81%D0%BE%D0%B2%D0%B0-%D0%A2%D0%B0%D1%82%D1%8C%D1%8F%D0%BD%D0%B0-%D0%90%D0%BB%D0%B5%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80%D0%BE%D0%B2%D0%BD%D0%B0.jpg'],
				['Скрипник_Дмитрий_Владимирович', 'https://www.deklarantonline.ru/wp-content/uploads/2016/05/%D1%81%D0%BA%D1%80%D0%B8%D0%BF%D0%BD%D0%B8%D0%BA-%D0%B1%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9-768x994.jpg'],
				['Скрипник_Владимирович_Дмитрий', 'https://www.deklarantonline.ru/wp-content/uploads/2016/05/%D1%81%D0%BA%D1%80%D0%B8%D0%BF%D0%BD%D0%B8%D0%BA-%D0%B1%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9-768x994.jpg'],
				['Дмитрий_Дмитрий_Владимирович', 'https://www.deklarantonline.ru/wp-content/uploads/2016/05/%D1%81%D0%BA%D1%80%D0%B8%D0%BF%D0%BD%D0%B8%D0%BA-%D0%B1%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9-768x994.jpg'],
				['Дмитрий_Владимирович_Дмитрий', 'https://www.deklarantonline.ru/wp-content/uploads/2016/05/%D1%81%D0%BA%D1%80%D0%B8%D0%BF%D0%BD%D0%B8%D0%BA-%D0%B1%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9-768x994.jpg'],
				['Владимирович_Дмитрий_Владимирович', 'https://www.deklarantonline.ru/wp-content/uploads/2016/05/%D1%81%D0%BA%D1%80%D0%B8%D0%BF%D0%BD%D0%B8%D0%BA-%D0%B1%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9-768x994.jpg'],
				['Владимирович_Владимирович_Дмитрий', 'https://www.deklarantonline.ru/wp-content/uploads/2016/05/%D1%81%D0%BA%D1%80%D0%B8%D0%BF%D0%BD%D0%B8%D0%BA-%D0%B1%D0%BE%D0%BB%D1%8C%D1%88%D0%BE%D0%B9-768x994.jpg'],
				['Гульняшкин_Алексей_Александрович', 'https://deklarantonline.ru/wp-content/uploads/2020/11/%D0%A4%D0%BE%D1%82%D0%BE_%D0%93%D1%83%D0%BB%D1%8C%D0%BD%D1%8F%D1%88%D0%BA%D0%B8%D0%BD-%D1%87%D0%B1.jpg'],
				['Гульняшкин_Александрович_Алексей', 'https://deklarantonline.ru/wp-content/uploads/2020/11/%D0%A4%D0%BE%D1%82%D0%BE_%D0%93%D1%83%D0%BB%D1%8C%D0%BD%D1%8F%D1%88%D0%BA%D0%B8%D0%BD-%D1%87%D0%B1.jpg'],
				['Алексей_Алексей_Александрович', 'https://deklarantonline.ru/wp-content/uploads/2020/11/%D0%A4%D0%BE%D1%82%D0%BE_%D0%93%D1%83%D0%BB%D1%8C%D0%BD%D1%8F%D1%88%D0%BA%D0%B8%D0%BD-%D1%87%D0%B1.jpg'],
				['Алексей_Александрович_Алексей', 'https://deklarantonline.ru/wp-content/uploads/2020/11/%D0%A4%D0%BE%D1%82%D0%BE_%D0%93%D1%83%D0%BB%D1%8C%D0%BD%D1%8F%D1%88%D0%BA%D0%B8%D0%BD-%D1%87%D0%B1.jpg'],
				['Александрович_Алексей_Александрович', 'https://deklarantonline.ru/wp-content/uploads/2020/11/%D0%A4%D0%BE%D1%82%D0%BE_%D0%93%D1%83%D0%BB%D1%8C%D0%BD%D1%8F%D1%88%D0%BA%D0%B8%D0%BD-%D1%87%D0%B1.jpg'],
				['Александрович_Александрович_Алексей', 'https://deklarantonline.ru/wp-content/uploads/2020/11/%D0%A4%D0%BE%D1%82%D0%BE_%D0%93%D1%83%D0%BB%D1%8C%D0%BD%D1%8F%D1%88%D0%BA%D0%B8%D0%BD-%D1%87%D0%B1.jpg'],
				['Слащев_Георгий_Владимирович', 'https://deklarantonline.ru/wp-content/uploads/2020/11/%D0%A4%D0%BE%D1%82%D0%BE_%D0%A1%D0%BB%D0%B0%D1%89%D0%B5%D0%B2-%D1%87%D0%B1.jpg'],
				['Слащев_Владимирович_Георгий', 'https://deklarantonline.ru/wp-content/uploads/2020/11/%D0%A4%D0%BE%D1%82%D0%BE_%D0%A1%D0%BB%D0%B0%D1%89%D0%B5%D0%B2-%D1%87%D0%B1.jpg'],
				['Георгий_Георгий_Владимирович', 'https://deklarantonline.ru/wp-content/uploads/2020/11/%D0%A4%D0%BE%D1%82%D0%BE_%D0%A1%D0%BB%D0%B0%D1%89%D0%B5%D0%B2-%D1%87%D0%B1.jpg'],
				['Георгий_Владимирович_Георгий', 'https://deklarantonline.ru/wp-content/uploads/2020/11/%D0%A4%D0%BE%D1%82%D0%BE_%D0%A1%D0%BB%D0%B0%D1%89%D0%B5%D0%B2-%D1%87%D0%B1.jpg'],
				['Владимирович_Георгий_Владимирович', 'https://deklarantonline.ru/wp-content/uploads/2020/11/%D0%A4%D0%BE%D1%82%D0%BE_%D0%A1%D0%BB%D0%B0%D1%89%D0%B5%D0%B2-%D1%87%D0%B1.jpg'],
				['Владимирович_Владимирович_Георгий', 'https://deklarantonline.ru/wp-content/uploads/2020/11/%D0%A4%D0%BE%D1%82%D0%BE_%D0%A1%D0%BB%D0%B0%D1%89%D0%B5%D0%B2-%D1%87%D0%B1.jpg'],
				['Бичун_Юлия_Андреевна', 'https://deklarantonline.ru/wp-content/uploads/2022/03/%D0%91%D0%B8%D1%87%D1%83%D0%BD-%D0%AE.%D0%90..png'],
				['Бичун_Андреевна_Юлия', 'https://deklarantonline.ru/wp-content/uploads/2022/03/%D0%91%D0%B8%D1%87%D1%83%D0%BD-%D0%AE.%D0%90..png'],
				['Юлия_Юлия_Андреевна', 'https://deklarantonline.ru/wp-content/uploads/2022/03/%D0%91%D0%B8%D1%87%D1%83%D0%BD-%D0%AE.%D0%90..png'],
				['Юлия_Андреевна_Юлия', 'https://deklarantonline.ru/wp-content/uploads/2022/03/%D0%91%D0%B8%D1%87%D1%83%D0%BD-%D0%AE.%D0%90..png'],
				['Андреевна_Юлия_Андреевна', 'https://deklarantonline.ru/wp-content/uploads/2022/03/%D0%91%D0%B8%D1%87%D1%83%D0%BD-%D0%AE.%D0%90..png'],
				['Андреевна_Андреевна_Юлия', 'https://deklarantonline.ru/wp-content/uploads/2022/03/%D0%91%D0%B8%D1%87%D1%83%D0%BD-%D0%AE.%D0%90..png'],
			]);

			wa_send.addEventListener('click', function() {
				if(wa_start.value != '') {
					v_value = (wa_start.value).split('\n');
					for(let j = 0; j < v_value.length; j++) {
						if(v_value[j] != '') {
							if((v_value[j].match(/^Тема/g))) {
								v_tmpValue = v_value[j].replace(/^[^.]+\S\s+/, '');
								v_tmpDetale = v_tmpValue.match(/\((.*?)\)/g);
								v_tmpValue = (v_tmpValue.replace(/\((.*?)\)/g, '')).trim();
								if(v_tmpValue[v_tmpValue.length - 1] != '.')
									v_tmpValue += '.';
								for(let k = 0; k < v_tmpDetale.length; k++) {
									v_tmpDetale[k] = v_tmpDetale[k].replace(/\(/g, '');
									v_tmpDetale[k] = v_tmpDetale[k].replace(/\)/g, '');
									v_tmpDetale[k] = v_tmpDetale[k].split(' ')[0];
								}
								v_topic.push(v_tmpValue);
								v_time.push(v_tmpDetale);
							} else if(v_value[j].indexOf('.') != -1) {
								v_tmpDetale = (v_value[j].trim()).split('.');
								for(let k = 0; k < v_tmpDetale.length; k++) {
									v_tmpDetale[k] = v_tmpDetale[k].trim();
									if(v_tmpDetale[k] == '') v_tmpDetale.splice(k, 1)
									else v_tmpDetale[k] += '.';
								}
								v_descr.push(v_tmpDetale);
							} else {
								v_tmpDetale = v_value[j].split(' ');
								if(v_tmpDetale.length > 3 && v_tmpDetale[3] != '' && !v_tmpCheck) {
									v_tmpCheck = true;
									v_time = [[]];
								}
								if(v_tmpCheck) v_time[0].push(v_tmpDetale[3]);
								v_teacher.push(`${v_tmpDetale[0]} ${v_tmpDetale[1]} ${v_tmpDetale[2]}`);
							}
						} else {
							v_module.push(
								{
									'title': v_topic[0],
									'timer': v_time[0],
									'descr': v_descr[0],
									'teacher': v_teacher,
								}
							);
							v_topic = [];
							v_descr = [];
							v_teacher = [];
							v_time = [];
							v_tmpCheck = false;
						}
					}

					v_result = `<section id="program">`;
					v_result += `\n\t<div class="container">`;
					v_result += `\n\t\t<div class="program-list">`;
					for(let j = 0; j < v_module.length; j++) {
					v_result += `\n\t\t\t<div class="program-list-item">`;
					v_result += `\n\t\t\t\t<div class="program-harmonic">`;
					v_result += `\n\t\t\t\t\t<h3 class="program-h3">Модуль ${j + 1}. ${v_module[j]['title']}</h3>`;
					v_result += `\n\t\t\t\t\t<div class="program-arrow">`;
					v_result += `\n\t\t\t\t\t\t<svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">`;
					v_result += `\n\t\t\t\t\t\t\t<circle cx="24.5" cy="24.5" r="23.5" transform="rotate(180 24.5 24.5)" stroke="#492FB1" stroke-opacity="0.1" stroke-width="2" />`;
					v_result += `\n\t\t\t\t\t\t\t<path d="M32 21L24 29L16 21" stroke="#492FB1" stroke-width="3" stroke-linecap="round" /> </svg>`;
					v_result += `\n\t\t\t\t\t</div>`;
					v_result += `\n\t\t\t\t</div>`;
					v_result += `\n\t\t\t\t<div class="program-info">`;
						v_result += `\n\t\t\t\t\t<div class="program-info-item">`;
						v_result += `\n\t\t\t\t\t\t<ul class="program-descr">`;
						for(let k = 0; k < v_module[j]['descr'].length; k++) {
							v_result += `\n\t\t\t\t\t\t\t<li class="program-li">${v_module[j]['descr'][k]}</li>`;
						}
						v_result += `\n\t\t\t\t\t\t</ul>`;
						if(v_module[j]['teacher']) {
							for(let k = 0; k < v_module[j]['teacher'].length; k++) {
								v_result += `\n\t\t\t\t\t\t<div class="program-last">`;
								v_result += `\n\t\t\t\t\t\t\t<div class="program-teacher">`;
								v_result += `\n\t\t\t\t\t\t\t\t<div class="program-teacher-ava" style="background-image: url('${v_font.get(v_module[j]['teacher'][k].replace(/\s/g, '_'))}');"></div>`;
								v_result += `\n\t\t\t\t\t\t\t\t<p class="program-teacher-name">${v_module[j]['teacher'][k]}</p>`;
								v_result += `\n\t\t\t\t\t\t\t</div>`;
								v_result += `\n\t\t\t\t\t\t\t<div class="program-time">`;
								v_result += `\n\t\t\t\t\t\t\t\t<div class="time-icon">`;
								v_result += `\n\t\t\t\t\t\t\t\t\t<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">`;
								v_result += `\n\t\t\t\t\t\t\t\t\t\t<path d="M19.984 3.33334C10.784 3.33334 3.33398 10.8 3.33398 20C3.33398 29.2 10.784 36.6667 19.984 36.6667C29.2007 36.6667 36.6673 29.2 36.6673 20C36.6673 10.8 29.2007 3.33334 19.984 3.33334ZM20.0007 33.3333C12.634 33.3333 6.66732 27.3667 6.66732 20C6.66732 12.6333 12.634 6.66668 20.0007 6.66668C27.3673 6.66668 33.334 12.6333 33.334 20C33.334 27.3667 27.3673 33.3333 20.0007 33.3333ZM19.634 11.6667H19.534C18.8673 11.6667 18.334 12.2 18.334 12.8667V20.7333C18.334 21.3167 18.634 21.8667 19.1507 22.1667L26.0673 26.3167C26.634 26.65 27.3673 26.4833 27.7007 25.9167C27.7843 25.7817 27.84 25.6313 27.8644 25.4744C27.8887 25.3175 27.8812 25.1573 27.8423 25.0033C27.8034 24.8493 27.734 24.7048 27.6381 24.5782C27.5421 24.4517 27.4217 24.3457 27.284 24.2667L20.834 20.4333V12.8667C20.834 12.2 20.3007 11.6667 19.634 11.6667V11.6667Z" fill="#492FB1" fill-opacity="0.5" /> </svg>`;
								v_result += `\n\t\t\t\t\t\t\t\t</div>`;
								v_result += `\n\t\t\t\t\t\t\t\t<p class="program-time-txt">${v_module[j]['timer'][k]} ак. часа</p>`;
								v_result += `\n\t\t\t\t\t\t\t</div>`;
								v_result += `\n\t\t\t\t\t\t</div>`;
							}
						} else if(v_module[j]['timer']) {
							for(let k = 0; k < v_module[j]['timer'].length; k++) {
								v_result += `\n\t\t\t\t\t\t<div class="program-last">`;
								v_result += `\n\t\t\t\t\t\t\t<div class="program-time">`;
								v_result += `\n\t\t\t\t\t\t\t\t<div class="time-icon">`;
								v_result += `\n\t\t\t\t\t\t\t\t\t<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">`;
								v_result += `\n\t\t\t\t\t\t\t\t\t\t<path d="M19.984 3.33334C10.784 3.33334 3.33398 10.8 3.33398 20C3.33398 29.2 10.784 36.6667 19.984 36.6667C29.2007 36.6667 36.6673 29.2 36.6673 20C36.6673 10.8 29.2007 3.33334 19.984 3.33334ZM20.0007 33.3333C12.634 33.3333 6.66732 27.3667 6.66732 20C6.66732 12.6333 12.634 6.66668 20.0007 6.66668C27.3673 6.66668 33.334 12.6333 33.334 20C33.334 27.3667 27.3673 33.3333 20.0007 33.3333ZM19.634 11.6667H19.534C18.8673 11.6667 18.334 12.2 18.334 12.8667V20.7333C18.334 21.3167 18.634 21.8667 19.1507 22.1667L26.0673 26.3167C26.634 26.65 27.3673 26.4833 27.7007 25.9167C27.7843 25.7817 27.84 25.6313 27.8644 25.4744C27.8887 25.3175 27.8812 25.1573 27.8423 25.0033C27.8034 24.8493 27.734 24.7048 27.6381 24.5782C27.5421 24.4517 27.4217 24.3457 27.284 24.2667L20.834 20.4333V12.8667C20.834 12.2 20.3007 11.6667 19.634 11.6667V11.6667Z" fill="#492FB1" fill-opacity="0.5" /> </svg>`;
								v_result += `\n\t\t\t\t\t\t\t\t</div>`;
								v_result += `\n\t\t\t\t\t\t\t\t<p class="program-time-txt">${v_module[j]['timer'][k]} ак. часа</p>`;
								v_result += `\n\t\t\t\t\t\t\t</div>`;
								v_result += `\n\t\t\t\t\t\t</div>`;
							}
						}
						v_result += `\n\t\t\t\t\t</div>`;
					v_result += `\n\t\t\t\t</div>`;
					v_result += `\n\t\t\t</div>`;
					}
					v_result += `\n\t\t</div>`;
					v_result += `\n\t</div>`;
					v_result += `\n</section>`;
					wa_end.value = v_result;
				}
			});

			wa_clear.addEventListener('click', function() {
				wa_start.value = '';
				wa_end.value = '';
			});

			wa_copy.addEventListener('click', function() {
				wa_end.select();
				document.execCommand("copy");
				if(!alert.classList.contains('alert-copy-done')) {
					alert.classList.add('alert-copy-done');
					setTimeout(function() {
						alert.classList.remove('alert-copy-done')
					}, 3000)
				}
			});
		}
	}
});