import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { SupabaseGenericResponse } from '../supabase';
import { SupabaseService } from '../supabase/supabase.service';
import { PollWithUserVote, Vote } from './poll';

@Injectable({
  providedIn: 'root',
})
export class EveryoneVotesService {
  authService = inject(AuthService);
  supabaseService = inject(SupabaseService);
  http = inject(HttpClient);
  getPolls(): Observable<SupabaseGenericResponse<PollWithUserVote>> {
    return from(
      this.http.get<SupabaseGenericResponse<PollWithUserVote>>(
        '/.netlify/functions/get-polls'
      )
    );
  }

  getUserVotes(): Observable<SupabaseGenericResponse<Vote>> {
    return from(
      this.http.post<SupabaseGenericResponse<Vote>>(
        '/.netlify/functions/get-user-votes',
        {
          id: this.authService.user()?.id,
        }
      )
    );
  }

  submitVote(
    pollId: string,
    optionSelected: number
  ): Observable<SupabaseGenericResponse<Vote>> {
    return from(
      this.http.post<SupabaseGenericResponse<Vote>>(
        '/.netlify/functions/post-poll-vote',
        {
          pollId,
          userId: this.authService.user()?.id,
          optionSelected,
        }
      )
    );
  }
}
