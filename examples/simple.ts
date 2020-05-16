import { createLogger } from "../mod.ts";

const logger = createLogger();

logger.debug("Debug");
logger.info("Info");
logger.warning("Warning");
logger.error("Error");
logger.critical("Critical");