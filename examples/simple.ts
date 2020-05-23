// Copyright 2020 Yamboy1. All rights reserved. MIT license.

import { createLogger, consoleSink } from "../mod.ts";

const logger = createLogger().addSink(consoleSink());

logger.debug("Debug");
logger.info("Info");
logger.warn("Warn");
logger.error("Error");
logger.critical("Critical");
