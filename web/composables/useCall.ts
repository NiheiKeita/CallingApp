import { SkyWayStreamFactory } from '@skyway-sdk/room';
const dataConnection = await SkyWayStreamFactory.createDataStream();

export const useCall = async () => {
  const dataSubmit = (data: any) => {
    dataConnection.write(data);
  };
  return { dataConnection, dataSubmit };
};

// FIXME:dataconnectionの初期化したいけどわからない。。。
