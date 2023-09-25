import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudyPlace } from '@shared/entities/study-place';
import { ActivatedRoute, Params } from '@angular/router';

export interface GetStudyPlacesParams extends Params {
  isPublic?: boolean;
  isJoinPublic?: boolean;
  isSchedulePublic?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class StudyPlacesService {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);

  get currentID(): string | null {
    return this.route.snapshot.queryParams['studyPlaceID'] ?? null;
  }

  getStudyPlaces(params?: GetStudyPlacesParams): Observable<StudyPlace[]> {
    return this.http.get<StudyPlace[]>(`api/v1/studyPlaces`, { params });
  }
}
