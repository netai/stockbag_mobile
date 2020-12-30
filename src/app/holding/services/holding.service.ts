import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/app.config';
import { ServerService } from 'src/app/core/services/server.service';
import { Holding } from 'src/app/models/holding.model';

@Injectable({
  providedIn: 'root'
})
export class HoldingService {

  holdingList: Holding[] = [];

  constructor(
    private _ss: ServerService
  ) {}

}
