import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiResponseVM } from "@app/model/apiResponseVM";

@Injectable({
    providedIn: "root",
})
export class VehiclesServiceService {
    url: string = "http://23.96.88.204:820/api/services/app/Vehicles";

    constructor(private http: HttpClient) {}

    getAllVehicles(): Observable<any> {
        return this.http.get<any>(`${this.url}/GetAll`).pipe(
            map((response: ApiResponseVM) => {
                return response;
            })
        );
    }

    getVehicleById(id): Observable<any> {
      return this.http.get<any>(`${this.url}/GetVehiclesForView/`,{
        params:{
          id: id
        }
      }).pipe(
        map((response: ApiResponseVM)=>{
          return response;
        })
      )
    }

    createOrEditVehcile(vehicle){
      return this.http.post<any>(`${this.url}/CreateOrEdit/`, {vehicle}).pipe(
        map((response: ApiResponseVM)=>{
          return response;
        })
      )
    }
}
