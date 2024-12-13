import { EventData, Page } from '@nativescript/core';
import { PlayerViewModel } from './view-models/player-view-model';

export function onNavigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new PlayerViewModel();
}