import uuid from 'uuid/v4';
import { AsyncStorage } from 'react-native';

const fetchCollection = (resourceName) => {
  const idsKey = `${resourceName}Ids`;

  return AsyncStorage.getItem(idsKey).then(idsJSON => {
    if (!idsJSON) {
      // initialize ids list
      return AsyncStorage.setItem(idsKey, JSON.stringify([])).then(() => {
        // return empty collection
        return {}
      });
     }

    const ids = JSON.parse(idsJSON);
    const storageIds = ids.map(id => `${resourceName}:${id}`);
    const instantiateResources = storageKeyVals => (
      storageKeyVals.reduce((resourceList, keyVal) => {
        const storageValue = keyVal[1];
        const object = JSON.parse(storageValue);
        return {...resourceList, [object.id]: object }
      }, {})
    );
    const returnResourceList = resourceList => new Promise((resolve, reject) => resolve(resourceList));

    return AsyncStorage.multiGet(storageIds)
      .then(instantiateResources)
      .then(returnResourceList)
      .catch(error => console.warn(error))
  });
};
const createResource = (resourceName, object) => {
  const resourceIdsKey = `${resourceName}Ids`;
  const resource = {...object, id: uuid()};

  const saveResource = () => AsyncStorage.setItem(`${resourceName}:${resource.id}`, JSON.stringify(resource))
  const returnResource = () => new Promise((resolve, reject) => resolve(resource));
  const getIdList = () => AsyncStorage.getItem(resourceIdsKey);
  const addIdToIdList = resourceIdsJSON => {
    const idList = JSON.parse(resourceIdsJSON) || [];
    idList.push(resource.id);
    return AsyncStorage.setItem(resourceIdsKey, JSON.stringify(idList));
  };

  return getIdList()
    .then(addIdToIdList)
    .then(saveResource)
    .then(returnResource);
};

export const setLastQuizCompletedAt = () => {
  return AsyncStorage.setItem('lastQuizCompletedAt', new Date().toString());
}

export const fetchDecks = () => fetchCollection('deck');
export const fetchQuestions = () => fetchCollection('question');

export const createDeck = title => {
  const id = uuid();
  const deckObject = {
    id,
    title,
    questionIds: []
  };

  return createResource('deck', deckObject);
};

export const createQuestion = (question) => {
  const id = uuid();
  const questionObject = {
    ...question,
    id
  };

  return createResource('question', questionObject);
};

export const getLastCompletedAt = () => {
  return AsyncStorage.getItem('lastQuizCompletedAt')
};
