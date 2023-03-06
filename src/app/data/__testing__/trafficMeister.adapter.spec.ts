import { adaptResponse } from '../trafficMeister.adapter';
import {
  severalVehiclesResponse,
  severalVehiclesResponseTransformedMock,
  simpleResposeMock,
  simpleResposeTransformedMock,
} from './trafficMeister.mock.spec';

describe('trafficMeister', () => {
  it('adaptResponse should transform the response into a model 1', () => {
    expect(adaptResponse(simpleResposeMock)).toEqual(
      simpleResposeTransformedMock
    );
  });

  it('adaptResponse should transform the response into a model 2', () => {
    expect(adaptResponse(severalVehiclesResponse)).toEqual(
      severalVehiclesResponseTransformedMock
    );
  });
});
