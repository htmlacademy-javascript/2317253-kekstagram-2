const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Артём',
  'Роман',
  'Ксения',
  'Фёдор',
  'Карина',
  'Яна',
  'Андрей',
  'Карина',
  'Стас',
  'Паша',
];

const PHOTO_DESCRIPTIONS = [
  'Яркий городской пейзаж с неоновыми вывесками, снятый в дождливый вечер с размытыми отражениями на асфальте',
  'Крупный план кофейной чашки с паром на фоне открытого ноутбука и разбросанных бумаг',
  'Панорама горного хребта в утреннем тумане с одинокой сосной на переднем плане',
  'Макросъемка капель росы на паутине с бликами от восходящего солнца',
  'Динамичный кадр уличного музыканта с размытым движением толпы на заднем плане',
  'Интерьер старой библиотеки с солнечным лучом, подсвечивающим пыль в воздухе между книжными стеллажами',
  'Заброшенная фабрика с проросшими сквозь бетон деревьями и граффити на стенах',
  'Вид из окна поезда: размытые зеленые поля и одинокий фермерский дом вдали',
  'Фуд-фото пиццы с тянущимся сыром и рассыпанными вокруг ингредиентами',
  'Портрет пожилого рыбака с морщинами, освещенными закатным светом, и сетью в руках',
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomId = (a, b) => {
  const previousValues = [];
  return () => {
    let result = getRandomInteger(a, b);

    if (previousValues.length >= b - a + 1) {
      // eslint-disable-next-line no-console
      console.error(`Перебраны все числа из диапазона от ${a} до ${b}`);
      return null;
    }
    while (previousValues.includes(result)) {
      result = getRandomInteger(a, b);
    }
    previousValues.push(result);
    return result;
  };
};

const generatePhotoId = createRandomId(1, 25);
const generatePhotoUrlId = createRandomId(1, 25);
const generateCommentId = createRandomId(1, 10000);
const getRandomAvatarId = () => getRandomInteger(1, 6);
const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];
const getRandomMessage = (elements) => {
  const shouldUseTwoSentences = Math.random() > 0.5;
  const firstSentence = getRandomArrayElement(elements);

  if (shouldUseTwoSentences && elements.length > 1) {
    let secondSentence = getRandomArrayElement(elements);
    while (secondSentence === firstSentence) {
      secondSentence = getRandomArrayElement(elements);
    }
    return `${firstSentence} ${secondSentence}`;
  }

  return firstSentence;
};

const getRandomPhotoComments = () => {
  const commentId = generateCommentId();
  const avatarId = getRandomAvatarId();
  const message = getRandomMessage(MESSAGES);
  return {
    id: commentId,
    avatar: `img/avatar-${avatarId}.svg`,
    message: message,
    name: getRandomArrayElement(NAMES),
  };
};

const getRandomPhotoDescription = () => {
  const id = generatePhotoId();
  const urlId = generatePhotoUrlId();

  return {
    id: id,
    url: `photos/${urlId}.jpg`,
    description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: Array.from(
      { length: getRandomInteger(0, 30) },
      getRandomPhotoComments
    ),
  };
};

const photoDescriptions = Array.from({ length: 25 }, getRandomPhotoDescription);

// eslint-disable-next-line no-console
console.log(photoDescriptions);
