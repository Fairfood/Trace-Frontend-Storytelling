import { Injectable } from '@angular/core';
import { BaseStoreService } from './base-store.service';
import { Observable } from 'rxjs';

export interface IStory {
  themeConfiguration: any;
  sharingData: any;
  companyClaims: any[];
}

const initialState: IStory = {
  themeConfiguration: null,
  sharingData: null,
  companyClaims: [],
};

@Injectable({
  providedIn: 'root',
})
export class StoryStoreService extends BaseStoreService<IStory> {
  /* istanbul ignore next */
  storyConfiguration$: Observable<any> = this.select(
    (state: IStory) => state.themeConfiguration
  );

  /* istanbul ignore next */
  sharingData$: Observable<any> = this.select(
    (state: IStory) => state.sharingData
  );

  /* istanbul ignore next */
  companyClaimsData$: Observable<any[]> = this.select(
    (state: IStory) => state.companyClaims
  );

  constructor() {
    super(initialState);
  }

  updateStateProp<T>(key: string, value: T): void {
    this.setState({ [key]: value });
  }
}
