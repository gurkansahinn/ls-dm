import 'reflect-metadata';
import './chat/chat';

import { ServiceIdentify } from './serviceIdentify';
import { RageEventStreamEmitter } from './eventStream/rageEventStreamEmitter';
import { container } from 'tsyringe';
import { PlayerContext } from './domain/playerContext';
import { RageEventStreamListener } from './eventStream/rageEventStreamListener';
import { DeathmatchContext } from './domain/deathmatchContext';

container.register(ServiceIdentify.EventStreamEmitter, RageEventStreamEmitter);
container.register(ServiceIdentify.EventStreamListener, RageEventStreamListener);
container.resolve(ServiceIdentify.EventStreamListener);

container.resolve(PlayerContext);
container.resolve(DeathmatchContext);