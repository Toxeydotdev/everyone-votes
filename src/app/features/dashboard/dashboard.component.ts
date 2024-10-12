import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { combineLatest, filter, map } from 'rxjs';
import { EveryoneVotesService } from '../../services/everyone-votes/everyone-votes.service';
import { Poll, Vote } from '../../services/everyone-votes/poll';
import { PollComponent } from '../poll/poll.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    PollComponent,
    CarouselModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  everyoneVotesService = inject(EveryoneVotesService);
  processing = signal(false);
  responsiveOptions = [
    {
      breakpoint: '1256px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '960px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '630px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  polls$ = this.everyoneVotesService
    .getPolls()
    .pipe(map(({ response }) => response.data));

  userVotes$ = this.everyoneVotesService
    .getUserVotes()
    .pipe(map(({ response }) => response.data));

  pollsAndVotes$ = combineLatest([this.polls$, this.userVotes$]).pipe(
    filter(([polls]) => polls !== null),
    map(([polls, votes]) => {
      if (!votes) return polls;
      return polls?.map((poll: Poll) => {
        const userVote = votes?.find((vote: Vote) => vote.poll_id === poll.id);
        return { ...poll, userVote };
      });
    })
  );
}
