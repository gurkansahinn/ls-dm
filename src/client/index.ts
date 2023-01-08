import 'reflect-metadata';

import { ServiceIdentify } from 'serviceIdentify';
import { RageEventStreamEmitter } from 'eventStream/rageEventStreamEmitter';
import { container } from 'tsyringe';
import { PlayerContext } from './domain/playerContext';

container.register(ServiceIdentify.EventStreamEmitter, RageEventStreamEmitter);

container.resolve(PlayerContext);