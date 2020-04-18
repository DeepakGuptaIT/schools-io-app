import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppState, getAllItems, getDataState } from "../reducers";
import { Store } from "@ngrx/store";
import * as DataActions from "../actions/data.actions";
import { CommonService } from './core/common.service'

@Injectable({
    providedIn: "root"
})
export class DataService {
    constructor(private store: Store<AppState>, private http: HttpClient, private commonService: CommonService) { }

    loadData() {
        if (this.commonService.getIsOnline3()) {

            return this.http.get("/assets/data/test-data.json");
        } else {
            return this.commonService.getInternetFailedError();
        }
    }
    load() {
        this.store.dispatch(DataActions.LoadDataBegin());
    }

    getData() {
        return this.store.select(getDataState);
    }


    getItems() {
        return this.store.select(getAllItems);
    }

}