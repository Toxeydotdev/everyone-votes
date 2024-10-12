import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  model,
  OnInit,
  signal,
} from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { MeterGroupModule } from 'primeng/metergroup';
import { finalize, map } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { EveryoneVotesService } from '../../services/everyone-votes/everyone-votes.service';
import { PollWithUserVote, Vote } from '../../services/everyone-votes/poll';

@Component({
  selector: 'app-poll',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    MeterGroupModule,
    DividerModule,
  ],
  templateUrl: './poll.component.html',
  styleUrl: './poll.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PollComponent implements OnInit {
  messageService = inject(MessageService);
  authService = inject(AuthService);
  everyoneVotesService = inject(EveryoneVotesService);

  poll = model.required<PollWithUserVote>();
  userAuthenticated = computed(() => this.authService.isAuthenticated());
  meterValues = signal([
    { label: '', color: '', icon: '', value: 0 },
    { label: '', color: '', icon: '', value: 0 },
  ]);

  buttons = signal([{ label: '', isSelected: false }]);

  optionSelected = computed(
    () => this.buttons().filter((button) => button.isSelected).length < 1
  );

  alreadyVoted = computed(() => this.poll().userVote !== undefined);

  processing = signal(false);

  colors = [
    'blue',
    'green',
    'red',
    'yellow',
    'purple',
    'orange',
    'pink',
    'cyan',
    'indigo',
    'teal',
    'orange',
    'bluegray',
    'gray',
  ];

  shades = ['100', '200', '300', '400', '500', '600', '700', '800', '900'];

  color = signal(this.randomColor());

  randomColor(): string {
    return `bg-${this.colors[Math.floor(Math.random() * this.colors.length)]}-${
      this.shades[Math.floor(Math.random() * this.shades.length)]
    }`;
  }
  updateMeterValues() {
    this.meterValues.update(() => {
      return this.poll().poll_option_labels.map((label, index) => {
        return {
          label,
          color:
            this.poll().userVote?.option_selected === index
              ? '#22c55e'
              : '#64748b',
          icon: '',
          value:
            (this.poll().poll_option_votes[index] /
              this.poll().poll_votes_total) *
            100,
        };
      });
    });
  }
  ngOnInit() {
    this.buttons.update(() => {
      return this.poll().poll_option_labels.map((option, index) => {
        return {
          label: option,
          isSelected: index === this.poll().userVote?.option_selected,
        };
      });
    });

    this.updateMeterValues();
  }

  handleSelection(index: number): void {
    this.buttons.update((buttons) => {
      return buttons.map((button, i) => {
        return { ...button, isSelected: i === index };
      });
    });
  }

  handleSubmit(pollId: string): void {
    this.processing.update(() => true);
    const selectedOption = this.buttons().findIndex(
      (button) => button.isSelected
    );

    this.everyoneVotesService
      .submitVote(pollId, selectedOption)
      .pipe(
        map(({ response }) => response),
        map(({ data, error }) => {
          if (error) {
            console.error(error);
            this.messageService.add({
              severity: 'error',
              summary: 'Something went wrong.',
              detail: 'Your vote was not submitted.',
            });
            return;
          } else {
            this.messageService.add({
              severity: 'success',
              summary: `Vote submitted for ${this.poll().poll_title}.`,
              detail: 'Your vote has been submitted.',
            });
            this.poll.update((poll) => ({
              ...poll,
              poll_votes_total: poll.poll_votes_total + 1,
              poll_option_votes: poll.poll_option_votes.map((votes, index) => {
                return index === selectedOption ? votes + 1 : votes;
              }),
              userVote: data[0] as Vote,
            }));
            this.updateMeterValues();
          }

          // force ui refresh of buttons
          this.buttons.update(() => {
            return this.buttons().map((button) => ({ ...button }));
          });
        }),
        finalize(() => this.processing.update(() => false))
      )
      .subscribe();
  }
}
