import { CompleteAddressConcatPipe } from './complete-address-concat.pipe';

describe('CompleteAddressConcatPipe', () => {
  it('create an instance', () => {
    const pipe = new CompleteAddressConcatPipe();
    expect(pipe).toBeTruthy();
  });
});
