// Copyright 2020 Yamboy1. All rights reserved. MIT license.

import { createLogger, LogLevel } from "./mod.ts";

const logger = createLogger({ minimumLevel: LogLevel.INFO });

logger.debug("Debug");
logger.info("Info");
logger.warning("Warning");
logger.error("Error");
logger.critical("Critical");
