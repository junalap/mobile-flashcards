import uuid from 'uuid/v4';
import { AsyncStorage } from 'react-native';
// AsyncStorage.clear()
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

    return AsyncStorage.multiGet(storageIds).then(storageKeyVals => {
      const resourceList = storageKeyVals.reduce((resourceList, keyVal) => {
        const storageValue = keyVal[1];
        const object = JSON.parse(storageValue);

        return {...resourceList, [object.id]: object }
      }, {});

      return new Promise((resolve, reject) => {
        return resolve(resourceList);
      })
    }).catch((error) => console.warn(error));
  });
};

const createResource = (resourceName, object) => {
  const resourceIdsKey = `${resourceName}Ids`;
  const resource = {...object, id: uuid()}

  return AsyncStorage.getItem(resourceIdsKey).then(resourceIdsJSON => {
    const allIds = JSON.parse(resourceIdsJSON || []);

    return AsyncStorage.setItem(`${resourceName}:${resource.id}`, JSON.stringify(resource)).then(() => {
      allIds.push(resource.id);

      return AsyncStorage.setItem(resourceIdsKey, JSON.stringify(allIds)).then(() => {
        return new Promise((resolve, reject) => {
          return resolve(resource);
        });
      });
    });

  })
};

export const fetchDecks = () => fetchCollection('deck');

export const fetchQuestions = () => {};

export const createDeck = (title) => {
  const id = uuid();
  const deckObject = {
    id,
    title,
    questionIds: []
  };

  return createResource('deck', deckObject);
};
