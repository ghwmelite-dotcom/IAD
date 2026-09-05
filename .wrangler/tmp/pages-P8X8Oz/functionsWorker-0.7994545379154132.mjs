var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all2) => {
  for (var name in all2)
    __defProp(target, name, { get: all2[name], enumerable: true });
};
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// ../.wrangler/tmp/bundle-FYeu1P/strip-cf-connecting-ip-header.js
function stripCfConnectingIPHeader(input, init) {
  const request = new Request(input, init);
  request.headers.delete("CF-Connecting-IP");
  return request;
}
var init_strip_cf_connecting_ip_header = __esm({
  "../.wrangler/tmp/bundle-FYeu1P/strip-cf-connecting-ip-header.js"() {
    "use strict";
    __name(stripCfConnectingIPHeader, "stripCfConnectingIPHeader");
    globalThis.fetch = new Proxy(globalThis.fetch, {
      apply(target, thisArg, argArray) {
        return Reflect.apply(target, thisArg, [
          stripCfConnectingIPHeader.apply(null, argArray)
        ]);
      }
    });
  }
});

// ../node_modules/unenv/dist/runtime/_internal/utils.mjs
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
var init_utils = __esm({
  "../node_modules/unenv/dist/runtime/_internal/utils.mjs"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(createNotImplementedError, "createNotImplementedError");
    __name(notImplemented, "notImplemented");
    __name(notImplementedClass, "notImplementedClass");
  }
});

// ../node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin, _performanceNow, nodeTiming, PerformanceEntry, PerformanceMark, PerformanceMeasure, PerformanceResourceTiming, PerformanceObserverEntryList, Performance, PerformanceObserver, performance;
var init_performance = __esm({
  "../node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
    _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
    nodeTiming = {
      name: "node",
      entryType: "node",
      startTime: 0,
      duration: 0,
      nodeStart: 0,
      v8Start: 0,
      bootstrapComplete: 0,
      environment: 0,
      loopStart: 0,
      loopExit: 0,
      idleTime: 0,
      uvMetricsInfo: {
        loopCount: 0,
        events: 0,
        eventsWaiting: 0
      },
      detail: void 0,
      toJSON() {
        return this;
      }
    };
    PerformanceEntry = class {
      __unenv__ = true;
      detail;
      entryType = "event";
      name;
      startTime;
      constructor(name, options) {
        this.name = name;
        this.startTime = options?.startTime || _performanceNow();
        this.detail = options?.detail;
      }
      get duration() {
        return _performanceNow() - this.startTime;
      }
      toJSON() {
        return {
          name: this.name,
          entryType: this.entryType,
          startTime: this.startTime,
          duration: this.duration,
          detail: this.detail
        };
      }
    };
    __name(PerformanceEntry, "PerformanceEntry");
    PerformanceMark = /* @__PURE__ */ __name(class PerformanceMark2 extends PerformanceEntry {
      entryType = "mark";
      constructor() {
        super(...arguments);
      }
      get duration() {
        return 0;
      }
    }, "PerformanceMark");
    PerformanceMeasure = class extends PerformanceEntry {
      entryType = "measure";
    };
    __name(PerformanceMeasure, "PerformanceMeasure");
    PerformanceResourceTiming = class extends PerformanceEntry {
      entryType = "resource";
      serverTiming = [];
      connectEnd = 0;
      connectStart = 0;
      decodedBodySize = 0;
      domainLookupEnd = 0;
      domainLookupStart = 0;
      encodedBodySize = 0;
      fetchStart = 0;
      initiatorType = "";
      name = "";
      nextHopProtocol = "";
      redirectEnd = 0;
      redirectStart = 0;
      requestStart = 0;
      responseEnd = 0;
      responseStart = 0;
      secureConnectionStart = 0;
      startTime = 0;
      transferSize = 0;
      workerStart = 0;
      responseStatus = 0;
    };
    __name(PerformanceResourceTiming, "PerformanceResourceTiming");
    PerformanceObserverEntryList = class {
      __unenv__ = true;
      getEntries() {
        return [];
      }
      getEntriesByName(_name, _type) {
        return [];
      }
      getEntriesByType(type) {
        return [];
      }
    };
    __name(PerformanceObserverEntryList, "PerformanceObserverEntryList");
    Performance = class {
      __unenv__ = true;
      timeOrigin = _timeOrigin;
      eventCounts = /* @__PURE__ */ new Map();
      _entries = [];
      _resourceTimingBufferSize = 0;
      navigation = void 0;
      timing = void 0;
      timerify(_fn, _options) {
        throw createNotImplementedError("Performance.timerify");
      }
      get nodeTiming() {
        return nodeTiming;
      }
      eventLoopUtilization() {
        return {};
      }
      markResourceTiming() {
        return new PerformanceResourceTiming("");
      }
      onresourcetimingbufferfull = null;
      now() {
        if (this.timeOrigin === _timeOrigin) {
          return _performanceNow();
        }
        return Date.now() - this.timeOrigin;
      }
      clearMarks(markName) {
        this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
      }
      clearMeasures(measureName) {
        this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
      }
      clearResourceTimings() {
        this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
      }
      getEntries() {
        return this._entries;
      }
      getEntriesByName(name, type) {
        return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
      }
      getEntriesByType(type) {
        return this._entries.filter((e) => e.entryType === type);
      }
      mark(name, options) {
        const entry = new PerformanceMark(name, options);
        this._entries.push(entry);
        return entry;
      }
      measure(measureName, startOrMeasureOptions, endMark) {
        let start;
        let end;
        if (typeof startOrMeasureOptions === "string") {
          start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
          end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
        } else {
          start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
          end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
        }
        const entry = new PerformanceMeasure(measureName, {
          startTime: start,
          detail: {
            start,
            end
          }
        });
        this._entries.push(entry);
        return entry;
      }
      setResourceTimingBufferSize(maxSize) {
        this._resourceTimingBufferSize = maxSize;
      }
      addEventListener(type, listener, options) {
        throw createNotImplementedError("Performance.addEventListener");
      }
      removeEventListener(type, listener, options) {
        throw createNotImplementedError("Performance.removeEventListener");
      }
      dispatchEvent(event) {
        throw createNotImplementedError("Performance.dispatchEvent");
      }
      toJSON() {
        return this;
      }
    };
    __name(Performance, "Performance");
    PerformanceObserver = class {
      __unenv__ = true;
      _callback = null;
      constructor(callback) {
        this._callback = callback;
      }
      takeRecords() {
        return [];
      }
      disconnect() {
        throw createNotImplementedError("PerformanceObserver.disconnect");
      }
      observe(options) {
        throw createNotImplementedError("PerformanceObserver.observe");
      }
      bind(fn) {
        return fn;
      }
      runInAsyncScope(fn, thisArg, ...args) {
        return fn.call(thisArg, ...args);
      }
      asyncId() {
        return 0;
      }
      triggerAsyncId() {
        return 0;
      }
      emitDestroy() {
        return this;
      }
    };
    __name(PerformanceObserver, "PerformanceObserver");
    __publicField(PerformanceObserver, "supportedEntryTypes", []);
    performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();
  }
});

// ../node_modules/unenv/dist/runtime/node/perf_hooks.mjs
var init_perf_hooks = __esm({
  "../node_modules/unenv/dist/runtime/node/perf_hooks.mjs"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_performance();
  }
});

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
var init_performance2 = __esm({
  "../node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs"() {
    init_perf_hooks();
    globalThis.performance = performance;
    globalThis.Performance = Performance;
    globalThis.PerformanceEntry = PerformanceEntry;
    globalThis.PerformanceMark = PerformanceMark;
    globalThis.PerformanceMeasure = PerformanceMeasure;
    globalThis.PerformanceObserver = PerformanceObserver;
    globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
    globalThis.PerformanceResourceTiming = PerformanceResourceTiming;
  }
});

// ../node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default;
var init_noop = __esm({
  "../node_modules/unenv/dist/runtime/mock/noop.mjs"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    noop_default = Object.assign(() => {
    }, { __unenv__: true });
  }
});

// ../node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";
var _console, _ignoreErrors, _stderr, _stdout, log, info, trace, debug, table, error, warn, createTask, clear, count, countReset, dir, dirxml, group, groupEnd, groupCollapsed, profile, profileEnd, time, timeEnd, timeLog, timeStamp, Console, _times, _stdoutErrorHandler, _stderrErrorHandler;
var init_console = __esm({
  "../node_modules/unenv/dist/runtime/node/console.mjs"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_noop();
    init_utils();
    _console = globalThis.console;
    _ignoreErrors = true;
    _stderr = new Writable();
    _stdout = new Writable();
    log = _console?.log ?? noop_default;
    info = _console?.info ?? log;
    trace = _console?.trace ?? info;
    debug = _console?.debug ?? log;
    table = _console?.table ?? log;
    error = _console?.error ?? log;
    warn = _console?.warn ?? error;
    createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
    clear = _console?.clear ?? noop_default;
    count = _console?.count ?? noop_default;
    countReset = _console?.countReset ?? noop_default;
    dir = _console?.dir ?? noop_default;
    dirxml = _console?.dirxml ?? noop_default;
    group = _console?.group ?? noop_default;
    groupEnd = _console?.groupEnd ?? noop_default;
    groupCollapsed = _console?.groupCollapsed ?? noop_default;
    profile = _console?.profile ?? noop_default;
    profileEnd = _console?.profileEnd ?? noop_default;
    time = _console?.time ?? noop_default;
    timeEnd = _console?.timeEnd ?? noop_default;
    timeLog = _console?.timeLog ?? noop_default;
    timeStamp = _console?.timeStamp ?? noop_default;
    Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
    _times = /* @__PURE__ */ new Map();
    _stdoutErrorHandler = noop_default;
    _stderrErrorHandler = noop_default;
  }
});

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole, assert, clear2, context, count2, countReset2, createTask2, debug2, dir2, dirxml2, error2, group2, groupCollapsed2, groupEnd2, info2, log2, profile2, profileEnd2, table2, time2, timeEnd2, timeLog2, timeStamp2, trace2, warn2, console_default;
var init_console2 = __esm({
  "../node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_console();
    workerdConsole = globalThis["console"];
    ({
      assert,
      clear: clear2,
      context: (
        // @ts-expect-error undocumented public API
        context
      ),
      count: count2,
      countReset: countReset2,
      createTask: (
        // @ts-expect-error undocumented public API
        createTask2
      ),
      debug: debug2,
      dir: dir2,
      dirxml: dirxml2,
      error: error2,
      group: group2,
      groupCollapsed: groupCollapsed2,
      groupEnd: groupEnd2,
      info: info2,
      log: log2,
      profile: profile2,
      profileEnd: profileEnd2,
      table: table2,
      time: time2,
      timeEnd: timeEnd2,
      timeLog: timeLog2,
      timeStamp: timeStamp2,
      trace: trace2,
      warn: warn2
    } = workerdConsole);
    Object.assign(workerdConsole, {
      Console,
      _ignoreErrors,
      _stderr,
      _stderrErrorHandler,
      _stdout,
      _stdoutErrorHandler,
      _times
    });
    console_default = workerdConsole;
  }
});

// ../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console = __esm({
  "../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console"() {
    init_console2();
    globalThis.console = console_default;
  }
});

// ../node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime;
var init_hrtime = __esm({
  "../node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
      const now = Date.now();
      const seconds = Math.trunc(now / 1e3);
      const nanos = now % 1e3 * 1e6;
      if (startTime) {
        let diffSeconds = seconds - startTime[0];
        let diffNanos = nanos - startTime[0];
        if (diffNanos < 0) {
          diffSeconds = diffSeconds - 1;
          diffNanos = 1e9 + diffNanos;
        }
        return [diffSeconds, diffNanos];
      }
      return [seconds, nanos];
    }, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
      return BigInt(Date.now() * 1e6);
    }, "bigint") });
  }
});

// ../node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
import { Socket } from "node:net";
var ReadStream;
var init_read_stream = __esm({
  "../node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    ReadStream = class extends Socket {
      fd;
      constructor(fd) {
        super();
        this.fd = fd;
      }
      isRaw = false;
      setRawMode(mode) {
        this.isRaw = mode;
        return this;
      }
      isTTY = false;
    };
    __name(ReadStream, "ReadStream");
  }
});

// ../node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
import { Socket as Socket2 } from "node:net";
var WriteStream;
var init_write_stream = __esm({
  "../node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    WriteStream = class extends Socket2 {
      fd;
      constructor(fd) {
        super();
        this.fd = fd;
      }
      clearLine(dir3, callback) {
        callback && callback();
        return false;
      }
      clearScreenDown(callback) {
        callback && callback();
        return false;
      }
      cursorTo(x, y, callback) {
        callback && typeof callback === "function" && callback();
        return false;
      }
      moveCursor(dx, dy, callback) {
        callback && callback();
        return false;
      }
      getColorDepth(env2) {
        return 1;
      }
      hasColors(count3, env2) {
        return false;
      }
      getWindowSize() {
        return [this.columns, this.rows];
      }
      columns = 80;
      rows = 24;
      isTTY = false;
    };
    __name(WriteStream, "WriteStream");
  }
});

// ../node_modules/unenv/dist/runtime/node/tty.mjs
var init_tty = __esm({
  "../node_modules/unenv/dist/runtime/node/tty.mjs"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_read_stream();
    init_write_stream();
  }
});

// ../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";
var Process;
var init_process = __esm({
  "../node_modules/unenv/dist/runtime/node/internal/process/process.mjs"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_tty();
    init_utils();
    Process = class extends EventEmitter {
      env;
      hrtime;
      nextTick;
      constructor(impl) {
        super();
        this.env = impl.env;
        this.hrtime = impl.hrtime;
        this.nextTick = impl.nextTick;
        for (const prop of [...Object.getOwnPropertyNames(Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
          const value = this[prop];
          if (typeof value === "function") {
            this[prop] = value.bind(this);
          }
        }
      }
      emitWarning(warning, type, code) {
        console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
      }
      emit(...args) {
        return super.emit(...args);
      }
      listeners(eventName) {
        return super.listeners(eventName);
      }
      #stdin;
      #stdout;
      #stderr;
      get stdin() {
        return this.#stdin ??= new ReadStream(0);
      }
      get stdout() {
        return this.#stdout ??= new WriteStream(1);
      }
      get stderr() {
        return this.#stderr ??= new WriteStream(2);
      }
      #cwd = "/";
      chdir(cwd2) {
        this.#cwd = cwd2;
      }
      cwd() {
        return this.#cwd;
      }
      arch = "";
      platform = "";
      argv = [];
      argv0 = "";
      execArgv = [];
      execPath = "";
      title = "";
      pid = 200;
      ppid = 100;
      get version() {
        return "";
      }
      get versions() {
        return {};
      }
      get allowedNodeEnvironmentFlags() {
        return /* @__PURE__ */ new Set();
      }
      get sourceMapsEnabled() {
        return false;
      }
      get debugPort() {
        return 0;
      }
      get throwDeprecation() {
        return false;
      }
      get traceDeprecation() {
        return false;
      }
      get features() {
        return {};
      }
      get release() {
        return {};
      }
      get connected() {
        return false;
      }
      get config() {
        return {};
      }
      get moduleLoadList() {
        return [];
      }
      constrainedMemory() {
        return 0;
      }
      availableMemory() {
        return 0;
      }
      uptime() {
        return 0;
      }
      resourceUsage() {
        return {};
      }
      ref() {
      }
      unref() {
      }
      umask() {
        throw createNotImplementedError("process.umask");
      }
      getBuiltinModule() {
        return void 0;
      }
      getActiveResourcesInfo() {
        throw createNotImplementedError("process.getActiveResourcesInfo");
      }
      exit() {
        throw createNotImplementedError("process.exit");
      }
      reallyExit() {
        throw createNotImplementedError("process.reallyExit");
      }
      kill() {
        throw createNotImplementedError("process.kill");
      }
      abort() {
        throw createNotImplementedError("process.abort");
      }
      dlopen() {
        throw createNotImplementedError("process.dlopen");
      }
      setSourceMapsEnabled() {
        throw createNotImplementedError("process.setSourceMapsEnabled");
      }
      loadEnvFile() {
        throw createNotImplementedError("process.loadEnvFile");
      }
      disconnect() {
        throw createNotImplementedError("process.disconnect");
      }
      cpuUsage() {
        throw createNotImplementedError("process.cpuUsage");
      }
      setUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
      }
      hasUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
      }
      initgroups() {
        throw createNotImplementedError("process.initgroups");
      }
      openStdin() {
        throw createNotImplementedError("process.openStdin");
      }
      assert() {
        throw createNotImplementedError("process.assert");
      }
      binding() {
        throw createNotImplementedError("process.binding");
      }
      permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
      report = {
        directory: "",
        filename: "",
        signal: "SIGUSR2",
        compact: false,
        reportOnFatalError: false,
        reportOnSignal: false,
        reportOnUncaughtException: false,
        getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
        writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
      };
      finalization = {
        register: /* @__PURE__ */ notImplemented("process.finalization.register"),
        unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
        registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
      };
      memoryUsage = Object.assign(() => ({
        arrayBuffers: 0,
        rss: 0,
        external: 0,
        heapTotal: 0,
        heapUsed: 0
      }), { rss: () => 0 });
      mainModule = void 0;
      domain = void 0;
      send = void 0;
      exitCode = void 0;
      channel = void 0;
      getegid = void 0;
      geteuid = void 0;
      getgid = void 0;
      getgroups = void 0;
      getuid = void 0;
      setegid = void 0;
      seteuid = void 0;
      setgid = void 0;
      setgroups = void 0;
      setuid = void 0;
      _events = void 0;
      _eventsCount = void 0;
      _exiting = void 0;
      _maxListeners = void 0;
      _debugEnd = void 0;
      _debugProcess = void 0;
      _fatalException = void 0;
      _getActiveHandles = void 0;
      _getActiveRequests = void 0;
      _kill = void 0;
      _preload_modules = void 0;
      _rawDebug = void 0;
      _startProfilerIdleNotifier = void 0;
      _stopProfilerIdleNotifier = void 0;
      _tickCallback = void 0;
      _disconnect = void 0;
      _handleQueue = void 0;
      _pendingMessage = void 0;
      _channel = void 0;
      _send = void 0;
      _linkedBinding = void 0;
    };
    __name(Process, "Process");
  }
});

// ../node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess, getBuiltinModule, exit, platform, nextTick, unenvProcess, abort, addListener, allowedNodeEnvironmentFlags, hasUncaughtExceptionCaptureCallback, setUncaughtExceptionCaptureCallback, loadEnvFile, sourceMapsEnabled, arch, argv, argv0, chdir, config, connected, constrainedMemory, availableMemory, cpuUsage, cwd, debugPort, dlopen, disconnect, emit, emitWarning, env, eventNames, execArgv, execPath, finalization, features, getActiveResourcesInfo, getMaxListeners, hrtime3, kill, listeners, listenerCount, memoryUsage, on, off, once, pid, ppid, prependListener, prependOnceListener, rawListeners, release, removeAllListeners, removeListener, report, resourceUsage, setMaxListeners, setSourceMapsEnabled, stderr, stdin, stdout, title, throwDeprecation, traceDeprecation, umask, uptime, version, versions, domain, initgroups, moduleLoadList, reallyExit, openStdin, assert2, binding, send, exitCode, channel, getegid, geteuid, getgid, getgroups, getuid, setegid, seteuid, setgid, setgroups, setuid, permission, mainModule, _events, _eventsCount, _exiting, _maxListeners, _debugEnd, _debugProcess, _fatalException, _getActiveHandles, _getActiveRequests, _kill, _preload_modules, _rawDebug, _startProfilerIdleNotifier, _stopProfilerIdleNotifier, _tickCallback, _disconnect, _handleQueue, _pendingMessage, _channel, _send, _linkedBinding, _process, process_default;
var init_process2 = __esm({
  "../node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_hrtime();
    init_process();
    globalProcess = globalThis["process"];
    getBuiltinModule = globalProcess.getBuiltinModule;
    ({ exit, platform, nextTick } = getBuiltinModule(
      "node:process"
    ));
    unenvProcess = new Process({
      env: globalProcess.env,
      hrtime,
      nextTick
    });
    ({
      abort,
      addListener,
      allowedNodeEnvironmentFlags,
      hasUncaughtExceptionCaptureCallback,
      setUncaughtExceptionCaptureCallback,
      loadEnvFile,
      sourceMapsEnabled,
      arch,
      argv,
      argv0,
      chdir,
      config,
      connected,
      constrainedMemory,
      availableMemory,
      cpuUsage,
      cwd,
      debugPort,
      dlopen,
      disconnect,
      emit,
      emitWarning,
      env,
      eventNames,
      execArgv,
      execPath,
      finalization,
      features,
      getActiveResourcesInfo,
      getMaxListeners,
      hrtime: hrtime3,
      kill,
      listeners,
      listenerCount,
      memoryUsage,
      on,
      off,
      once,
      pid,
      ppid,
      prependListener,
      prependOnceListener,
      rawListeners,
      release,
      removeAllListeners,
      removeListener,
      report,
      resourceUsage,
      setMaxListeners,
      setSourceMapsEnabled,
      stderr,
      stdin,
      stdout,
      title,
      throwDeprecation,
      traceDeprecation,
      umask,
      uptime,
      version,
      versions,
      domain,
      initgroups,
      moduleLoadList,
      reallyExit,
      openStdin,
      assert: assert2,
      binding,
      send,
      exitCode,
      channel,
      getegid,
      geteuid,
      getgid,
      getgroups,
      getuid,
      setegid,
      seteuid,
      setgid,
      setgroups,
      setuid,
      permission,
      mainModule,
      _events,
      _eventsCount,
      _exiting,
      _maxListeners,
      _debugEnd,
      _debugProcess,
      _fatalException,
      _getActiveHandles,
      _getActiveRequests,
      _kill,
      _preload_modules,
      _rawDebug,
      _startProfilerIdleNotifier,
      _stopProfilerIdleNotifier,
      _tickCallback,
      _disconnect,
      _handleQueue,
      _pendingMessage,
      _channel,
      _send,
      _linkedBinding
    } = unenvProcess);
    _process = {
      abort,
      addListener,
      allowedNodeEnvironmentFlags,
      hasUncaughtExceptionCaptureCallback,
      setUncaughtExceptionCaptureCallback,
      loadEnvFile,
      sourceMapsEnabled,
      arch,
      argv,
      argv0,
      chdir,
      config,
      connected,
      constrainedMemory,
      availableMemory,
      cpuUsage,
      cwd,
      debugPort,
      dlopen,
      disconnect,
      emit,
      emitWarning,
      env,
      eventNames,
      execArgv,
      execPath,
      exit,
      finalization,
      features,
      getBuiltinModule,
      getActiveResourcesInfo,
      getMaxListeners,
      hrtime: hrtime3,
      kill,
      listeners,
      listenerCount,
      memoryUsage,
      nextTick,
      on,
      off,
      once,
      pid,
      platform,
      ppid,
      prependListener,
      prependOnceListener,
      rawListeners,
      release,
      removeAllListeners,
      removeListener,
      report,
      resourceUsage,
      setMaxListeners,
      setSourceMapsEnabled,
      stderr,
      stdin,
      stdout,
      title,
      throwDeprecation,
      traceDeprecation,
      umask,
      uptime,
      version,
      versions,
      // @ts-expect-error old API
      domain,
      initgroups,
      moduleLoadList,
      reallyExit,
      openStdin,
      assert: assert2,
      binding,
      send,
      exitCode,
      channel,
      getegid,
      geteuid,
      getgid,
      getgroups,
      getuid,
      setegid,
      seteuid,
      setgid,
      setgroups,
      setuid,
      permission,
      mainModule,
      _events,
      _eventsCount,
      _exiting,
      _maxListeners,
      _debugEnd,
      _debugProcess,
      _fatalException,
      _getActiveHandles,
      _getActiveRequests,
      _kill,
      _preload_modules,
      _rawDebug,
      _startProfilerIdleNotifier,
      _stopProfilerIdleNotifier,
      _tickCallback,
      _disconnect,
      _handleQueue,
      _pendingMessage,
      _channel,
      _send,
      _linkedBinding
    };
    process_default = _process;
  }
});

// ../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process = __esm({
  "../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process"() {
    init_process2();
    globalThis.process = process_default;
  }
});

// _shared/json.ts
function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...init.headers ?? {}
    }
  });
}
var init_json = __esm({
  "_shared/json.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(json, "json");
  }
});

// _shared/db.ts
async function first(env2, sql, ...binds) {
  return await env2.DB.prepare(sql).bind(...binds).first() ?? null;
}
async function all(env2, sql, ...binds) {
  const result = await env2.DB.prepare(sql).bind(...binds).all();
  return result.results ?? [];
}
async function run(env2, sql, ...binds) {
  await env2.DB.prepare(sql).bind(...binds).run();
}
var init_db = __esm({
  "_shared/db.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(first, "first");
    __name(all, "all");
    __name(run, "run");
  }
});

// _shared/hmac.ts
async function hmacSign(secret, payload) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  return base64UrlEncode(new Uint8Array(sig));
}
async function hmacVerify(secret, payload, candidate) {
  const expected = await hmacSign(secret, payload);
  return constantTimeEquals(expected, candidate);
}
function constantTimeEquals(a, b) {
  if (a.length !== b.length)
    return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}
function base64UrlEncode(bytes) {
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
var init_hmac = __esm({
  "_shared/hmac.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(hmacSign, "hmacSign");
    __name(hmacVerify, "hmacVerify");
    __name(constantTimeEquals, "constantTimeEquals");
    __name(base64UrlEncode, "base64UrlEncode");
  }
});

// _shared/secrets.ts
function requireSecret(env2, key) {
  const v = env2[key];
  if (typeof v !== "string" || v.length === 0) {
    throw new MissingSecretError(key);
  }
  return v;
}
var MissingSecretError;
var init_secrets = __esm({
  "_shared/secrets.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    MissingSecretError = class extends Error {
      constructor(key) {
        super(`server misconfigured: ${key} is not set`);
        this.key = key;
        this.name = "MissingSecretError";
      }
    };
    __name(MissingSecretError, "MissingSecretError");
    __name(requireSecret, "requireSecret");
  }
});

// api/admin/applications/[id]/documents/[docTypeId]/file.ts
var onRequestGet;
var init_file = __esm({
  "api/admin/applications/[id]/documents/[docTypeId]/file.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_db();
    init_hmac();
    init_secrets();
    onRequestGet = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const url2 = new URL(request.url);
      const expires = parseInt(url2.searchParams.get("expires") ?? "0", 10);
      const sig = url2.searchParams.get("sig") ?? "";
      if (!expires || !sig)
        return json({ error: "missing token" }, { status: 401 });
      if (Date.now() / 1e3 > expires)
        return json({ error: "token expired" }, { status: 401 });
      let secret;
      try {
        secret = requireSecret(env2, "SYSTEM_CRON_SECRET");
      } catch (err) {
        if (err instanceof MissingSecretError) {
          console.error(err.message);
          return json({ error: "server misconfigured" }, { status: 500 });
        }
        throw err;
      }
      const p = params;
      const ok = await hmacVerify(secret, `${p.id}:${p.docTypeId}:${expires}`, sig);
      if (!ok)
        return json({ error: "invalid token" }, { status: 401 });
      const row = await first(
        env2,
        "SELECT r2_key, mime_type, original_filename FROM application_documents WHERE application_id = ? AND document_type_id = ?",
        p.id,
        p.docTypeId
      );
      if (!row)
        return json({ error: "document not found" }, { status: 404 });
      const obj = await env2.UPLOADS.get(row.r2_key);
      if (!obj)
        return json({ error: "file missing in R2" }, { status: 404 });
      return new Response(obj.body, {
        headers: {
          "content-type": row.mime_type,
          "content-disposition": `inline; filename="${row.original_filename}"`,
          "cache-control": "private, max-age=60"
        }
      });
    }, "onRequestGet");
  }
});

// _shared/admin-cookies.ts
function buildSetAdminSessionCookie(sessionId, maxAgeSeconds) {
  return [
    `${COOKIE_NAME}=${sessionId}`,
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    "Path=/",
    `Max-Age=${maxAgeSeconds}`
  ].join("; ");
}
function buildClearAdminSessionCookie() {
  return `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
}
function parseAdminSessionId(request) {
  const header = request.headers.get("cookie") ?? request.headers.get("Cookie");
  if (!header)
    return null;
  for (const part of header.split(/;\s*/)) {
    const eq = part.indexOf("=");
    if (eq === -1)
      continue;
    const name = part.slice(0, eq);
    if (name === COOKIE_NAME) {
      const value = part.slice(eq + 1);
      return value.length > 0 ? value : null;
    }
  }
  return null;
}
var COOKIE_NAME;
var init_admin_cookies = __esm({
  "_shared/admin-cookies.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    COOKIE_NAME = "admin_session";
    __name(buildSetAdminSessionCookie, "buildSetAdminSessionCookie");
    __name(buildClearAdminSessionCookie, "buildClearAdminSessionCookie");
    __name(parseAdminSessionId, "parseAdminSessionId");
  }
});

// _shared/admin-session.ts
function generateSessionId() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
async function createAdminSession(env2, input) {
  const id = generateSessionId();
  const now = Date.now();
  await run(
    env2,
    "INSERT INTO admin_sessions (session_id, email, created_at, expires_at, last_used_at, ip_address) VALUES (?, ?, ?, ?, ?, ?)",
    id,
    input.email,
    now,
    now + ADMIN_SESSION_TTL_MS,
    now,
    input.ipAddress ?? null
  );
  return id;
}
async function readAdminSession(env2, sessionId) {
  const now = Date.now();
  let row = await first(
    env2,
    "SELECT s.session_id, s.email, s.created_at, s.expires_at, s.last_used_at, u.role FROM admin_sessions s JOIN admin_users u ON u.email = s.email WHERE s.session_id = ? AND s.expires_at > ? AND u.is_active = 1",
    sessionId,
    now
  );
  if (!row) {
    row = await first(
      env2,
      "SELECT s.session_id, s.email, s.created_at, s.expires_at, s.last_used_at, u.role FROM admin_sessions s JOIN users u ON u.email = s.email WHERE s.session_id = ? AND s.expires_at > ? AND u.active = 1",
      sessionId,
      now
    );
  }
  if (!row)
    return null;
  if (now - row.created_at > ADMIN_SESSION_HARD_CAP_MS) {
    await run(env2, "DELETE FROM admin_sessions WHERE session_id = ?", sessionId);
    return null;
  }
  const newExpires = now + ADMIN_SESSION_TTL_MS;
  await run(
    env2,
    "UPDATE admin_sessions SET last_used_at = ?, expires_at = ? WHERE session_id = ?",
    now,
    newExpires,
    sessionId
  );
  return {
    sessionId: row.session_id,
    email: row.email,
    role: row.role,
    createdAt: row.created_at,
    expiresAt: newExpires,
    lastUsedAt: now
  };
}
async function deleteAdminSession(env2, sessionId) {
  await run(env2, "DELETE FROM admin_sessions WHERE session_id = ?", sessionId);
}
var ADMIN_SESSION_TTL_MS, ADMIN_SESSION_HARD_CAP_MS;
var init_admin_session = __esm({
  "_shared/admin-session.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_db();
    ADMIN_SESSION_TTL_MS = 4 * 60 * 60 * 1e3;
    ADMIN_SESSION_HARD_CAP_MS = 7 * 24 * 60 * 60 * 1e3;
    __name(generateSessionId, "generateSessionId");
    __name(createAdminSession, "createAdminSession");
    __name(readAdminSession, "readAdminSession");
    __name(deleteAdminSession, "deleteAdminSession");
  }
});

// _shared/admin-auth.ts
async function isDemoModeEnabled(env2) {
  if (env2.APP_ENV === "production")
    return false;
  const row = await first(
    env2,
    "SELECT value FROM site_config WHERE key = ?",
    "admin_demo_mode_enabled"
  );
  return row?.value === "true";
}
function readHeaderContext(request) {
  const email3 = request.headers.get("X-Admin-User-Email")?.trim() ?? "";
  const role = request.headers.get("X-Admin-User-Role")?.trim() ?? "";
  if (!email3 || !role) {
    return {
      kind: "reject",
      response: json({ error: "authentication required", code: "AUTH_MISSING" }, { status: 401 })
    };
  }
  if (!ADMIN_ROLES.has(role)) {
    return {
      kind: "reject",
      response: json({ error: "admin role required", code: "AUTH_FORBIDDEN" }, { status: 403 })
    };
  }
  return { kind: "ok", admin: { email: email3, role } };
}
async function requireAdmin(request, env2) {
  const sessionId = parseAdminSessionId(request);
  if (sessionId) {
    const session = await readAdminSession(env2, sessionId);
    if (session) {
      if (!ADMIN_ROLES.has(session.role)) {
        return {
          kind: "reject",
          response: json({ error: "admin role required", code: "AUTH_FORBIDDEN" }, { status: 403 })
        };
      }
      return { kind: "ok", admin: { email: session.email, role: session.role } };
    }
  }
  if (await isDemoModeEnabled(env2)) {
    return readHeaderContext(request);
  }
  return {
    kind: "reject",
    response: json({ error: "authentication required", code: "AUTH_MISSING" }, { status: 401 })
  };
}
var ADMIN_ROLES;
var init_admin_auth = __esm({
  "_shared/admin-auth.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_db();
    init_admin_cookies();
    init_admin_session();
    ADMIN_ROLES = /* @__PURE__ */ new Set(["super_admin", "recruitment_admin", "content_manager", "viewer"]);
    __name(isDemoModeEnabled, "isDemoModeEnabled");
    __name(readHeaderContext, "readHeaderContext");
    __name(requireAdmin, "requireAdmin");
  }
});

// api/admin/applications/[id]/documents/[docTypeId]/url.ts
var TTL_SECONDS, onRequestGet2;
var init_url = __esm({
  "api/admin/applications/[id]/documents/[docTypeId]/url.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_admin_auth();
    init_db();
    init_hmac();
    init_secrets();
    TTL_SECONDS = 60;
    onRequestGet2 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      let secret;
      try {
        secret = requireSecret(env2, "SYSTEM_CRON_SECRET");
      } catch (err) {
        if (err instanceof MissingSecretError) {
          console.error(err.message);
          return json({ error: "server misconfigured" }, { status: 500 });
        }
        throw err;
      }
      const p = params;
      const exists = await first(
        env2,
        "SELECT r2_key FROM application_documents WHERE application_id = ? AND document_type_id = ?",
        p.id,
        p.docTypeId
      );
      if (!exists)
        return json({ error: "document not found" }, { status: 404 });
      const expiry = Math.floor(Date.now() / 1e3) + TTL_SECONDS;
      const payload = `${p.id}:${p.docTypeId}:${expiry}`;
      const sig = await hmacSign(secret, payload);
      const url2 = `/api/admin/applications/${encodeURIComponent(p.id)}/documents/${encodeURIComponent(p.docTypeId)}/file?expires=${expiry}&sig=${sig}`;
      return json({ data: { url: url2, expires_at: expiry * 1e3 } });
    }, "onRequestGet");
  }
});

// api/admin/comms/campaigns/[id]/recipients.ts
var onRequestGet3;
var init_recipients = __esm({
  "api/admin/comms/campaigns/[id]/recipients.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_db();
    init_admin_auth();
    onRequestGet3 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      const rows = await all(
        env2,
        "SELECT application_id, email, phone, email_status, email_error, sms_status, sms_error, created_at FROM comm_campaign_recipients WHERE campaign_id = ? ORDER BY created_at ASC",
        params.id
      );
      return json({ data: rows });
    }, "onRequestGet");
  }
});

// _shared/validate.ts
async function parseBody(request, schema) {
  let raw;
  try {
    raw = await request.json();
  } catch {
    return {
      kind: "reject",
      response: json(
        { error: "invalid request body", issues: [{ message: "malformed JSON" }] },
        { status: 400 }
      )
    };
  }
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return {
      kind: "reject",
      response: json({ error: "invalid request body", issues: parsed.error.issues }, { status: 400 })
    };
  }
  return { kind: "ok", value: parsed.data };
}
var init_validate = __esm({
  "_shared/validate.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    __name(parseBody, "parseBody");
  }
});

// _shared/email.ts
async function sendViaMailChannels(env2, input) {
  const body = {
    personalizations: [{ to: [{ email: input.to }] }],
    from: { email: env2.EMAIL_FROM, name: env2.EMAIL_FROM_NAME },
    subject: input.subject,
    content: [
      { type: "text/html", value: input.html },
      ...input.text ? [{ type: "text/plain", value: input.text }] : []
    ]
  };
  return fetch(MAILCHANNELS_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  });
}
async function sendViaResend(env2, input) {
  return fetch(RESEND_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${env2.RESEND_API_KEY}`
    },
    body: JSON.stringify({
      from: `${env2.EMAIL_FROM_NAME} <${env2.EMAIL_FROM}>`,
      to: [input.to],
      subject: input.subject,
      html: input.html,
      ...input.text ? { text: input.text } : {}
    })
  });
}
async function sendEmail(env2, input) {
  const provider = env2.EMAIL_PROVIDER ?? "auto";
  if (provider === "resend") {
    if (!env2.RESEND_API_KEY) {
      throw new Error("EMAIL_PROVIDER=resend but RESEND_API_KEY is not set");
    }
    const rs2 = await sendViaResend(env2, input);
    if (rs2.ok)
      return;
    throw new Error(`resend failed (${rs2.status}): ${await rs2.text()}`);
  }
  if (provider === "mailchannels") {
    const mc2 = await sendViaMailChannels(env2, input);
    if (mc2.ok)
      return;
    throw new Error(`mailchannels failed (${mc2.status}): ${await mc2.text()}`);
  }
  const mc = await sendViaMailChannels(env2, input);
  if (mc.ok)
    return;
  const mcText = await mc.text();
  if (!env2.RESEND_API_KEY) {
    throw new Error(`mailchannels failed (${mc.status}): ${mcText}`);
  }
  const rs = await sendViaResend(env2, input);
  if (rs.ok)
    return;
  const rsText = await rs.text();
  throw new Error(
    `email send failed: mailchannels=${mc.status} ${mcText} | resend=${rs.status} ${rsText}`
  );
}
var MAILCHANNELS_URL, RESEND_URL;
var init_email = __esm({
  "_shared/email.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    MAILCHANNELS_URL = "https://api.mailchannels.net/tx/v1/send";
    RESEND_URL = "https://api.resend.com/emails";
    __name(sendViaMailChannels, "sendViaMailChannels");
    __name(sendViaResend, "sendViaResend");
    __name(sendEmail, "sendEmail");
  }
});

// _shared/sms.ts
async function sendSms(env2, input) {
  if (!env2.HUBTEL_SMS_API_KEY || !env2.HUBTEL_SMS_FROM) {
    if (env2.APP_ENV !== "production") {
      console.log(
        `[sms:dev] would send to=${input.to} content=${JSON.stringify(input.message)}`
      );
    }
    return;
  }
  const res = await fetch(HUBTEL_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Basic ${env2.HUBTEL_SMS_API_KEY}`
    },
    body: JSON.stringify({
      From: env2.HUBTEL_SMS_FROM,
      To: input.to,
      Content: input.message
    })
  });
  if (!res.ok) {
    throw new Error(`hubtel sms failed (${res.status}): ${await res.text()}`);
  }
}
var HUBTEL_URL;
var init_sms = __esm({
  "_shared/sms.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    HUBTEL_URL = "https://sms.hubtel.com/v1/messages/send";
    __name(sendSms, "sendSms");
  }
});

// _shared/escape-html.ts
function escapeHtml(input) {
  return input.replace(/[&<>"']/g, (ch) => REPLACEMENTS[ch] ?? ch);
}
var REPLACEMENTS;
var init_escape_html = __esm({
  "_shared/escape-html.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    REPLACEMENTS = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };
    __name(escapeHtml, "escapeHtml");
  }
});

// _shared/form-data.ts
function extractPhone(formDataJson) {
  if (!formDataJson)
    return null;
  try {
    const parsed = JSON.parse(formDataJson);
    if (typeof parsed.phone === "string" && parsed.phone.trim().length > 0) {
      return parsed.phone.trim();
    }
  } catch {
  }
  return null;
}
function extractFullName(formDataJson) {
  if (!formDataJson)
    return null;
  try {
    const parsed = JSON.parse(formDataJson);
    if (typeof parsed.full_name === "string" && parsed.full_name.trim().length > 0) {
      return parsed.full_name.trim();
    }
  } catch {
  }
  return null;
}
var init_form_data = __esm({
  "_shared/form-data.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(extractPhone, "extractPhone");
    __name(extractFullName, "extractFullName");
  }
});

// ../node_modules/zod/v4/core/core.js
function $constructor(name, initializer3, params) {
  function init(inst, def) {
    if (!inst._zod) {
      Object.defineProperty(inst, "_zod", {
        value: {
          def,
          constr: _,
          traits: /* @__PURE__ */ new Set()
        },
        enumerable: false
      });
    }
    if (inst._zod.traits.has(name)) {
      return;
    }
    inst._zod.traits.add(name);
    initializer3(inst, def);
    const proto = _.prototype;
    const keys = Object.keys(proto);
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      if (!(k in inst)) {
        inst[k] = proto[k].bind(inst);
      }
    }
  }
  __name(init, "init");
  const Parent = params?.Parent ?? Object;
  class Definition extends Parent {
  }
  __name(Definition, "Definition");
  Object.defineProperty(Definition, "name", { value: name });
  function _(def) {
    var _a2;
    const inst = params?.Parent ? new Definition() : this;
    init(inst, def);
    (_a2 = inst._zod).deferred ?? (_a2.deferred = []);
    for (const fn of inst._zod.deferred) {
      fn();
    }
    return inst;
  }
  __name(_, "_");
  Object.defineProperty(_, "init", { value: init });
  Object.defineProperty(_, Symbol.hasInstance, {
    value: (inst) => {
      if (params?.Parent && inst instanceof params.Parent)
        return true;
      return inst?._zod?.traits?.has(name);
    }
  });
  Object.defineProperty(_, "name", { value: name });
  return _;
}
function config2(newConfig) {
  if (newConfig)
    Object.assign(globalConfig, newConfig);
  return globalConfig;
}
var NEVER, $brand, $ZodAsyncError, $ZodEncodeError, globalConfig;
var init_core = __esm({
  "../node_modules/zod/v4/core/core.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    NEVER = Object.freeze({
      status: "aborted"
    });
    __name($constructor, "$constructor");
    $brand = Symbol("zod_brand");
    $ZodAsyncError = class extends Error {
      constructor() {
        super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
      }
    };
    __name($ZodAsyncError, "$ZodAsyncError");
    $ZodEncodeError = class extends Error {
      constructor(name) {
        super(`Encountered unidirectional transform during encode: ${name}`);
        this.name = "ZodEncodeError";
      }
    };
    __name($ZodEncodeError, "$ZodEncodeError");
    globalConfig = {};
    __name(config2, "config");
  }
});

// ../node_modules/zod/v4/core/util.js
var util_exports = {};
__export(util_exports, {
  BIGINT_FORMAT_RANGES: () => BIGINT_FORMAT_RANGES,
  Class: () => Class,
  NUMBER_FORMAT_RANGES: () => NUMBER_FORMAT_RANGES,
  aborted: () => aborted,
  allowsEval: () => allowsEval,
  assert: () => assert3,
  assertEqual: () => assertEqual,
  assertIs: () => assertIs,
  assertNever: () => assertNever,
  assertNotEqual: () => assertNotEqual,
  assignProp: () => assignProp,
  base64ToUint8Array: () => base64ToUint8Array,
  base64urlToUint8Array: () => base64urlToUint8Array,
  cached: () => cached,
  captureStackTrace: () => captureStackTrace,
  cleanEnum: () => cleanEnum,
  cleanRegex: () => cleanRegex,
  clone: () => clone,
  cloneDef: () => cloneDef,
  createTransparentProxy: () => createTransparentProxy,
  defineLazy: () => defineLazy,
  esc: () => esc,
  escapeRegex: () => escapeRegex,
  extend: () => extend,
  finalizeIssue: () => finalizeIssue,
  floatSafeRemainder: () => floatSafeRemainder,
  getElementAtPath: () => getElementAtPath,
  getEnumValues: () => getEnumValues,
  getLengthableOrigin: () => getLengthableOrigin,
  getParsedType: () => getParsedType,
  getSizableOrigin: () => getSizableOrigin,
  hexToUint8Array: () => hexToUint8Array,
  isObject: () => isObject,
  isPlainObject: () => isPlainObject,
  issue: () => issue,
  joinValues: () => joinValues,
  jsonStringifyReplacer: () => jsonStringifyReplacer,
  merge: () => merge,
  mergeDefs: () => mergeDefs,
  normalizeParams: () => normalizeParams,
  nullish: () => nullish,
  numKeys: () => numKeys,
  objectClone: () => objectClone,
  omit: () => omit,
  optionalKeys: () => optionalKeys,
  parsedType: () => parsedType,
  partial: () => partial,
  pick: () => pick,
  prefixIssues: () => prefixIssues,
  primitiveTypes: () => primitiveTypes,
  promiseAllObject: () => promiseAllObject,
  propertyKeyTypes: () => propertyKeyTypes,
  randomString: () => randomString,
  required: () => required,
  safeExtend: () => safeExtend,
  shallowClone: () => shallowClone,
  slugify: () => slugify,
  stringifyPrimitive: () => stringifyPrimitive,
  uint8ArrayToBase64: () => uint8ArrayToBase64,
  uint8ArrayToBase64url: () => uint8ArrayToBase64url,
  uint8ArrayToHex: () => uint8ArrayToHex,
  unwrapMessage: () => unwrapMessage
});
function assertEqual(val) {
  return val;
}
function assertNotEqual(val) {
  return val;
}
function assertIs(_arg) {
}
function assertNever(_x) {
  throw new Error("Unexpected value in exhaustive check");
}
function assert3(_) {
}
function getEnumValues(entries) {
  const numericValues = Object.values(entries).filter((v) => typeof v === "number");
  const values = Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
  return values;
}
function joinValues(array2, separator = "|") {
  return array2.map((val) => stringifyPrimitive(val)).join(separator);
}
function jsonStringifyReplacer(_, value) {
  if (typeof value === "bigint")
    return value.toString();
  return value;
}
function cached(getter) {
  const set2 = false;
  return {
    get value() {
      if (!set2) {
        const value = getter();
        Object.defineProperty(this, "value", { value });
        return value;
      }
      throw new Error("cached value already set");
    }
  };
}
function nullish(input) {
  return input === null || input === void 0;
}
function cleanRegex(source) {
  const start = source.startsWith("^") ? 1 : 0;
  const end = source.endsWith("$") ? source.length - 1 : source.length;
  return source.slice(start, end);
}
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepString = step.toString();
  let stepDecCount = (stepString.split(".")[1] || "").length;
  if (stepDecCount === 0 && /\d?e-\d?/.test(stepString)) {
    const match2 = stepString.match(/\d?e-(\d?)/);
    if (match2?.[1]) {
      stepDecCount = Number.parseInt(match2[1]);
    }
  }
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
function defineLazy(object2, key, getter) {
  let value = void 0;
  Object.defineProperty(object2, key, {
    get() {
      if (value === EVALUATING) {
        return void 0;
      }
      if (value === void 0) {
        value = EVALUATING;
        value = getter();
      }
      return value;
    },
    set(v) {
      Object.defineProperty(object2, key, {
        value: v
        // configurable: true,
      });
    },
    configurable: true
  });
}
function objectClone(obj) {
  return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
}
function assignProp(target, prop, value) {
  Object.defineProperty(target, prop, {
    value,
    writable: true,
    enumerable: true,
    configurable: true
  });
}
function mergeDefs(...defs) {
  const mergedDescriptors = {};
  for (const def of defs) {
    const descriptors = Object.getOwnPropertyDescriptors(def);
    Object.assign(mergedDescriptors, descriptors);
  }
  return Object.defineProperties({}, mergedDescriptors);
}
function cloneDef(schema) {
  return mergeDefs(schema._zod.def);
}
function getElementAtPath(obj, path) {
  if (!path)
    return obj;
  return path.reduce((acc, key) => acc?.[key], obj);
}
function promiseAllObject(promisesObj) {
  const keys = Object.keys(promisesObj);
  const promises = keys.map((key) => promisesObj[key]);
  return Promise.all(promises).then((results) => {
    const resolvedObj = {};
    for (let i = 0; i < keys.length; i++) {
      resolvedObj[keys[i]] = results[i];
    }
    return resolvedObj;
  });
}
function randomString(length = 10) {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}
function esc(str) {
  return JSON.stringify(str);
}
function slugify(input) {
  return input.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
function isObject(data) {
  return typeof data === "object" && data !== null && !Array.isArray(data);
}
function isPlainObject(o) {
  if (isObject(o) === false)
    return false;
  const ctor = o.constructor;
  if (ctor === void 0)
    return true;
  if (typeof ctor !== "function")
    return true;
  const prot = ctor.prototype;
  if (isObject(prot) === false)
    return false;
  if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) {
    return false;
  }
  return true;
}
function shallowClone(o) {
  if (isPlainObject(o))
    return { ...o };
  if (Array.isArray(o))
    return [...o];
  return o;
}
function numKeys(data) {
  let keyCount = 0;
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      keyCount++;
    }
  }
  return keyCount;
}
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function clone(inst, def, params) {
  const cl = new inst._zod.constr(def ?? inst._zod.def);
  if (!def || params?.parent)
    cl._zod.parent = inst;
  return cl;
}
function normalizeParams(_params) {
  const params = _params;
  if (!params)
    return {};
  if (typeof params === "string")
    return { error: () => params };
  if (params?.message !== void 0) {
    if (params?.error !== void 0)
      throw new Error("Cannot specify both `message` and `error` params");
    params.error = params.message;
  }
  delete params.message;
  if (typeof params.error === "string")
    return { ...params, error: () => params.error };
  return params;
}
function createTransparentProxy(getter) {
  let target;
  return new Proxy({}, {
    get(_, prop, receiver) {
      target ?? (target = getter());
      return Reflect.get(target, prop, receiver);
    },
    set(_, prop, value, receiver) {
      target ?? (target = getter());
      return Reflect.set(target, prop, value, receiver);
    },
    has(_, prop) {
      target ?? (target = getter());
      return Reflect.has(target, prop);
    },
    deleteProperty(_, prop) {
      target ?? (target = getter());
      return Reflect.deleteProperty(target, prop);
    },
    ownKeys(_) {
      target ?? (target = getter());
      return Reflect.ownKeys(target);
    },
    getOwnPropertyDescriptor(_, prop) {
      target ?? (target = getter());
      return Reflect.getOwnPropertyDescriptor(target, prop);
    },
    defineProperty(_, prop, descriptor) {
      target ?? (target = getter());
      return Reflect.defineProperty(target, prop, descriptor);
    }
  });
}
function stringifyPrimitive(value) {
  if (typeof value === "bigint")
    return value.toString() + "n";
  if (typeof value === "string")
    return `"${value}"`;
  return `${value}`;
}
function optionalKeys(shape) {
  return Object.keys(shape).filter((k) => {
    return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
  });
}
function pick(schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const newShape = {};
      for (const key in mask) {
        if (!(key in currDef.shape)) {
          throw new Error(`Unrecognized key: "${key}"`);
        }
        if (!mask[key])
          continue;
        newShape[key] = currDef.shape[key];
      }
      assignProp(this, "shape", newShape);
      return newShape;
    },
    checks: []
  });
  return clone(schema, def);
}
function omit(schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const newShape = { ...schema._zod.def.shape };
      for (const key in mask) {
        if (!(key in currDef.shape)) {
          throw new Error(`Unrecognized key: "${key}"`);
        }
        if (!mask[key])
          continue;
        delete newShape[key];
      }
      assignProp(this, "shape", newShape);
      return newShape;
    },
    checks: []
  });
  return clone(schema, def);
}
function extend(schema, shape) {
  if (!isPlainObject(shape)) {
    throw new Error("Invalid input to extend: expected a plain object");
  }
  const checks = schema._zod.def.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    const existingShape = schema._zod.def.shape;
    for (const key in shape) {
      if (Object.getOwnPropertyDescriptor(existingShape, key) !== void 0) {
        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
      }
    }
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const _shape = { ...schema._zod.def.shape, ...shape };
      assignProp(this, "shape", _shape);
      return _shape;
    }
  });
  return clone(schema, def);
}
function safeExtend(schema, shape) {
  if (!isPlainObject(shape)) {
    throw new Error("Invalid input to safeExtend: expected a plain object");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const _shape = { ...schema._zod.def.shape, ...shape };
      assignProp(this, "shape", _shape);
      return _shape;
    }
  });
  return clone(schema, def);
}
function merge(a, b) {
  const def = mergeDefs(a._zod.def, {
    get shape() {
      const _shape = { ...a._zod.def.shape, ...b._zod.def.shape };
      assignProp(this, "shape", _shape);
      return _shape;
    },
    get catchall() {
      return b._zod.def.catchall;
    },
    checks: []
    // delete existing checks
  });
  return clone(a, def);
}
function partial(Class2, schema, mask) {
  const currDef = schema._zod.def;
  const checks = currDef.checks;
  const hasChecks = checks && checks.length > 0;
  if (hasChecks) {
    throw new Error(".partial() cannot be used on object schemas containing refinements");
  }
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const oldShape = schema._zod.def.shape;
      const shape = { ...oldShape };
      if (mask) {
        for (const key in mask) {
          if (!(key in oldShape)) {
            throw new Error(`Unrecognized key: "${key}"`);
          }
          if (!mask[key])
            continue;
          shape[key] = Class2 ? new Class2({
            type: "optional",
            innerType: oldShape[key]
          }) : oldShape[key];
        }
      } else {
        for (const key in oldShape) {
          shape[key] = Class2 ? new Class2({
            type: "optional",
            innerType: oldShape[key]
          }) : oldShape[key];
        }
      }
      assignProp(this, "shape", shape);
      return shape;
    },
    checks: []
  });
  return clone(schema, def);
}
function required(Class2, schema, mask) {
  const def = mergeDefs(schema._zod.def, {
    get shape() {
      const oldShape = schema._zod.def.shape;
      const shape = { ...oldShape };
      if (mask) {
        for (const key in mask) {
          if (!(key in shape)) {
            throw new Error(`Unrecognized key: "${key}"`);
          }
          if (!mask[key])
            continue;
          shape[key] = new Class2({
            type: "nonoptional",
            innerType: oldShape[key]
          });
        }
      } else {
        for (const key in oldShape) {
          shape[key] = new Class2({
            type: "nonoptional",
            innerType: oldShape[key]
          });
        }
      }
      assignProp(this, "shape", shape);
      return shape;
    }
  });
  return clone(schema, def);
}
function aborted(x, startIndex = 0) {
  if (x.aborted === true)
    return true;
  for (let i = startIndex; i < x.issues.length; i++) {
    if (x.issues[i]?.continue !== true) {
      return true;
    }
  }
  return false;
}
function prefixIssues(path, issues) {
  return issues.map((iss) => {
    var _a2;
    (_a2 = iss).path ?? (_a2.path = []);
    iss.path.unshift(path);
    return iss;
  });
}
function unwrapMessage(message) {
  return typeof message === "string" ? message : message?.message;
}
function finalizeIssue(iss, ctx, config3) {
  const full = { ...iss, path: iss.path ?? [] };
  if (!iss.message) {
    const message = unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config3.customError?.(iss)) ?? unwrapMessage(config3.localeError?.(iss)) ?? "Invalid input";
    full.message = message;
  }
  delete full.inst;
  delete full.continue;
  if (!ctx?.reportInput) {
    delete full.input;
  }
  return full;
}
function getSizableOrigin(input) {
  if (input instanceof Set)
    return "set";
  if (input instanceof Map)
    return "map";
  if (input instanceof File)
    return "file";
  return "unknown";
}
function getLengthableOrigin(input) {
  if (Array.isArray(input))
    return "array";
  if (typeof input === "string")
    return "string";
  return "unknown";
}
function parsedType(data) {
  const t = typeof data;
  switch (t) {
    case "number": {
      return Number.isNaN(data) ? "nan" : "number";
    }
    case "object": {
      if (data === null) {
        return "null";
      }
      if (Array.isArray(data)) {
        return "array";
      }
      const obj = data;
      if (obj && Object.getPrototypeOf(obj) !== Object.prototype && "constructor" in obj && obj.constructor) {
        return obj.constructor.name;
      }
    }
  }
  return t;
}
function issue(...args) {
  const [iss, input, inst] = args;
  if (typeof iss === "string") {
    return {
      message: iss,
      code: "custom",
      input,
      inst
    };
  }
  return { ...iss };
}
function cleanEnum(obj) {
  return Object.entries(obj).filter(([k, _]) => {
    return Number.isNaN(Number.parseInt(k, 10));
  }).map((el) => el[1]);
}
function base64ToUint8Array(base643) {
  const binaryString = atob(base643);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}
function uint8ArrayToBase64(bytes) {
  let binaryString = "";
  for (let i = 0; i < bytes.length; i++) {
    binaryString += String.fromCharCode(bytes[i]);
  }
  return btoa(binaryString);
}
function base64urlToUint8Array(base64url3) {
  const base643 = base64url3.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - base643.length % 4) % 4);
  return base64ToUint8Array(base643 + padding);
}
function uint8ArrayToBase64url(bytes) {
  return uint8ArrayToBase64(bytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
function hexToUint8Array(hex3) {
  const cleanHex = hex3.replace(/^0x/, "");
  if (cleanHex.length % 2 !== 0) {
    throw new Error("Invalid hex string length");
  }
  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < cleanHex.length; i += 2) {
    bytes[i / 2] = Number.parseInt(cleanHex.slice(i, i + 2), 16);
  }
  return bytes;
}
function uint8ArrayToHex(bytes) {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}
var EVALUATING, captureStackTrace, allowsEval, getParsedType, propertyKeyTypes, primitiveTypes, NUMBER_FORMAT_RANGES, BIGINT_FORMAT_RANGES, Class;
var init_util = __esm({
  "../node_modules/zod/v4/core/util.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(assertEqual, "assertEqual");
    __name(assertNotEqual, "assertNotEqual");
    __name(assertIs, "assertIs");
    __name(assertNever, "assertNever");
    __name(assert3, "assert");
    __name(getEnumValues, "getEnumValues");
    __name(joinValues, "joinValues");
    __name(jsonStringifyReplacer, "jsonStringifyReplacer");
    __name(cached, "cached");
    __name(nullish, "nullish");
    __name(cleanRegex, "cleanRegex");
    __name(floatSafeRemainder, "floatSafeRemainder");
    EVALUATING = Symbol("evaluating");
    __name(defineLazy, "defineLazy");
    __name(objectClone, "objectClone");
    __name(assignProp, "assignProp");
    __name(mergeDefs, "mergeDefs");
    __name(cloneDef, "cloneDef");
    __name(getElementAtPath, "getElementAtPath");
    __name(promiseAllObject, "promiseAllObject");
    __name(randomString, "randomString");
    __name(esc, "esc");
    __name(slugify, "slugify");
    captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {
    };
    __name(isObject, "isObject");
    allowsEval = cached(() => {
      if (typeof navigator !== "undefined" && "Cloudflare-Workers"?.includes("Cloudflare")) {
        return false;
      }
      try {
        const F = Function;
        new F("");
        return true;
      } catch (_) {
        return false;
      }
    });
    __name(isPlainObject, "isPlainObject");
    __name(shallowClone, "shallowClone");
    __name(numKeys, "numKeys");
    getParsedType = /* @__PURE__ */ __name((data) => {
      const t = typeof data;
      switch (t) {
        case "undefined":
          return "undefined";
        case "string":
          return "string";
        case "number":
          return Number.isNaN(data) ? "nan" : "number";
        case "boolean":
          return "boolean";
        case "function":
          return "function";
        case "bigint":
          return "bigint";
        case "symbol":
          return "symbol";
        case "object":
          if (Array.isArray(data)) {
            return "array";
          }
          if (data === null) {
            return "null";
          }
          if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
            return "promise";
          }
          if (typeof Map !== "undefined" && data instanceof Map) {
            return "map";
          }
          if (typeof Set !== "undefined" && data instanceof Set) {
            return "set";
          }
          if (typeof Date !== "undefined" && data instanceof Date) {
            return "date";
          }
          if (typeof File !== "undefined" && data instanceof File) {
            return "file";
          }
          return "object";
        default:
          throw new Error(`Unknown data type: ${t}`);
      }
    }, "getParsedType");
    propertyKeyTypes = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
    primitiveTypes = /* @__PURE__ */ new Set(["string", "number", "bigint", "boolean", "symbol", "undefined"]);
    __name(escapeRegex, "escapeRegex");
    __name(clone, "clone");
    __name(normalizeParams, "normalizeParams");
    __name(createTransparentProxy, "createTransparentProxy");
    __name(stringifyPrimitive, "stringifyPrimitive");
    __name(optionalKeys, "optionalKeys");
    NUMBER_FORMAT_RANGES = {
      safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
      int32: [-2147483648, 2147483647],
      uint32: [0, 4294967295],
      float32: [-34028234663852886e22, 34028234663852886e22],
      float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
    };
    BIGINT_FORMAT_RANGES = {
      int64: [/* @__PURE__ */ BigInt("-9223372036854775808"), /* @__PURE__ */ BigInt("9223372036854775807")],
      uint64: [/* @__PURE__ */ BigInt(0), /* @__PURE__ */ BigInt("18446744073709551615")]
    };
    __name(pick, "pick");
    __name(omit, "omit");
    __name(extend, "extend");
    __name(safeExtend, "safeExtend");
    __name(merge, "merge");
    __name(partial, "partial");
    __name(required, "required");
    __name(aborted, "aborted");
    __name(prefixIssues, "prefixIssues");
    __name(unwrapMessage, "unwrapMessage");
    __name(finalizeIssue, "finalizeIssue");
    __name(getSizableOrigin, "getSizableOrigin");
    __name(getLengthableOrigin, "getLengthableOrigin");
    __name(parsedType, "parsedType");
    __name(issue, "issue");
    __name(cleanEnum, "cleanEnum");
    __name(base64ToUint8Array, "base64ToUint8Array");
    __name(uint8ArrayToBase64, "uint8ArrayToBase64");
    __name(base64urlToUint8Array, "base64urlToUint8Array");
    __name(uint8ArrayToBase64url, "uint8ArrayToBase64url");
    __name(hexToUint8Array, "hexToUint8Array");
    __name(uint8ArrayToHex, "uint8ArrayToHex");
    Class = class {
      constructor(..._args) {
      }
    };
    __name(Class, "Class");
  }
});

// ../node_modules/zod/v4/core/errors.js
function flattenError(error50, mapper = (issue2) => issue2.message) {
  const fieldErrors = {};
  const formErrors = [];
  for (const sub of error50.issues) {
    if (sub.path.length > 0) {
      fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
      fieldErrors[sub.path[0]].push(mapper(sub));
    } else {
      formErrors.push(mapper(sub));
    }
  }
  return { formErrors, fieldErrors };
}
function formatError(error50, mapper = (issue2) => issue2.message) {
  const fieldErrors = { _errors: [] };
  const processError = /* @__PURE__ */ __name((error51) => {
    for (const issue2 of error51.issues) {
      if (issue2.code === "invalid_union" && issue2.errors.length) {
        issue2.errors.map((issues) => processError({ issues }));
      } else if (issue2.code === "invalid_key") {
        processError({ issues: issue2.issues });
      } else if (issue2.code === "invalid_element") {
        processError({ issues: issue2.issues });
      } else if (issue2.path.length === 0) {
        fieldErrors._errors.push(mapper(issue2));
      } else {
        let curr = fieldErrors;
        let i = 0;
        while (i < issue2.path.length) {
          const el = issue2.path[i];
          const terminal = i === issue2.path.length - 1;
          if (!terminal) {
            curr[el] = curr[el] || { _errors: [] };
          } else {
            curr[el] = curr[el] || { _errors: [] };
            curr[el]._errors.push(mapper(issue2));
          }
          curr = curr[el];
          i++;
        }
      }
    }
  }, "processError");
  processError(error50);
  return fieldErrors;
}
function treeifyError(error50, mapper = (issue2) => issue2.message) {
  const result = { errors: [] };
  const processError = /* @__PURE__ */ __name((error51, path = []) => {
    var _a2, _b;
    for (const issue2 of error51.issues) {
      if (issue2.code === "invalid_union" && issue2.errors.length) {
        issue2.errors.map((issues) => processError({ issues }, issue2.path));
      } else if (issue2.code === "invalid_key") {
        processError({ issues: issue2.issues }, issue2.path);
      } else if (issue2.code === "invalid_element") {
        processError({ issues: issue2.issues }, issue2.path);
      } else {
        const fullpath = [...path, ...issue2.path];
        if (fullpath.length === 0) {
          result.errors.push(mapper(issue2));
          continue;
        }
        let curr = result;
        let i = 0;
        while (i < fullpath.length) {
          const el = fullpath[i];
          const terminal = i === fullpath.length - 1;
          if (typeof el === "string") {
            curr.properties ?? (curr.properties = {});
            (_a2 = curr.properties)[el] ?? (_a2[el] = { errors: [] });
            curr = curr.properties[el];
          } else {
            curr.items ?? (curr.items = []);
            (_b = curr.items)[el] ?? (_b[el] = { errors: [] });
            curr = curr.items[el];
          }
          if (terminal) {
            curr.errors.push(mapper(issue2));
          }
          i++;
        }
      }
    }
  }, "processError");
  processError(error50);
  return result;
}
function toDotPath(_path) {
  const segs = [];
  const path = _path.map((seg) => typeof seg === "object" ? seg.key : seg);
  for (const seg of path) {
    if (typeof seg === "number")
      segs.push(`[${seg}]`);
    else if (typeof seg === "symbol")
      segs.push(`[${JSON.stringify(String(seg))}]`);
    else if (/[^\w$]/.test(seg))
      segs.push(`[${JSON.stringify(seg)}]`);
    else {
      if (segs.length)
        segs.push(".");
      segs.push(seg);
    }
  }
  return segs.join("");
}
function prettifyError(error50) {
  const lines = [];
  const issues = [...error50.issues].sort((a, b) => (a.path ?? []).length - (b.path ?? []).length);
  for (const issue2 of issues) {
    lines.push(`\u2716 ${issue2.message}`);
    if (issue2.path?.length)
      lines.push(`  \u2192 at ${toDotPath(issue2.path)}`);
  }
  return lines.join("\n");
}
var initializer, $ZodError, $ZodRealError;
var init_errors = __esm({
  "../node_modules/zod/v4/core/errors.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_core();
    init_util();
    initializer = /* @__PURE__ */ __name((inst, def) => {
      inst.name = "$ZodError";
      Object.defineProperty(inst, "_zod", {
        value: inst._zod,
        enumerable: false
      });
      Object.defineProperty(inst, "issues", {
        value: def,
        enumerable: false
      });
      inst.message = JSON.stringify(def, jsonStringifyReplacer, 2);
      Object.defineProperty(inst, "toString", {
        value: () => inst.message,
        enumerable: false
      });
    }, "initializer");
    $ZodError = $constructor("$ZodError", initializer);
    $ZodRealError = $constructor("$ZodError", initializer, { Parent: Error });
    __name(flattenError, "flattenError");
    __name(formatError, "formatError");
    __name(treeifyError, "treeifyError");
    __name(toDotPath, "toDotPath");
    __name(prettifyError, "prettifyError");
  }
});

// ../node_modules/zod/v4/core/parse.js
var _parse, parse, _parseAsync, parseAsync, _safeParse, safeParse, _safeParseAsync, safeParseAsync, _encode, encode, _decode, decode, _encodeAsync, encodeAsync, _decodeAsync, decodeAsync, _safeEncode, safeEncode, _safeDecode, safeDecode, _safeEncodeAsync, safeEncodeAsync, _safeDecodeAsync, safeDecodeAsync;
var init_parse = __esm({
  "../node_modules/zod/v4/core/parse.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_core();
    init_errors();
    init_util();
    _parse = /* @__PURE__ */ __name((_Err) => (schema, value, _ctx, _params) => {
      const ctx = _ctx ? Object.assign(_ctx, { async: false }) : { async: false };
      const result = schema._zod.run({ value, issues: [] }, ctx);
      if (result instanceof Promise) {
        throw new $ZodAsyncError();
      }
      if (result.issues.length) {
        const e = new (_params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config2())));
        captureStackTrace(e, _params?.callee);
        throw e;
      }
      return result.value;
    }, "_parse");
    parse = /* @__PURE__ */ _parse($ZodRealError);
    _parseAsync = /* @__PURE__ */ __name((_Err) => async (schema, value, _ctx, params) => {
      const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
      let result = schema._zod.run({ value, issues: [] }, ctx);
      if (result instanceof Promise)
        result = await result;
      if (result.issues.length) {
        const e = new (params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config2())));
        captureStackTrace(e, params?.callee);
        throw e;
      }
      return result.value;
    }, "_parseAsync");
    parseAsync = /* @__PURE__ */ _parseAsync($ZodRealError);
    _safeParse = /* @__PURE__ */ __name((_Err) => (schema, value, _ctx) => {
      const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
      const result = schema._zod.run({ value, issues: [] }, ctx);
      if (result instanceof Promise) {
        throw new $ZodAsyncError();
      }
      return result.issues.length ? {
        success: false,
        error: new (_Err ?? $ZodError)(result.issues.map((iss) => finalizeIssue(iss, ctx, config2())))
      } : { success: true, data: result.value };
    }, "_safeParse");
    safeParse = /* @__PURE__ */ _safeParse($ZodRealError);
    _safeParseAsync = /* @__PURE__ */ __name((_Err) => async (schema, value, _ctx) => {
      const ctx = _ctx ? Object.assign(_ctx, { async: true }) : { async: true };
      let result = schema._zod.run({ value, issues: [] }, ctx);
      if (result instanceof Promise)
        result = await result;
      return result.issues.length ? {
        success: false,
        error: new _Err(result.issues.map((iss) => finalizeIssue(iss, ctx, config2())))
      } : { success: true, data: result.value };
    }, "_safeParseAsync");
    safeParseAsync = /* @__PURE__ */ _safeParseAsync($ZodRealError);
    _encode = /* @__PURE__ */ __name((_Err) => (schema, value, _ctx) => {
      const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
      return _parse(_Err)(schema, value, ctx);
    }, "_encode");
    encode = /* @__PURE__ */ _encode($ZodRealError);
    _decode = /* @__PURE__ */ __name((_Err) => (schema, value, _ctx) => {
      return _parse(_Err)(schema, value, _ctx);
    }, "_decode");
    decode = /* @__PURE__ */ _decode($ZodRealError);
    _encodeAsync = /* @__PURE__ */ __name((_Err) => async (schema, value, _ctx) => {
      const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
      return _parseAsync(_Err)(schema, value, ctx);
    }, "_encodeAsync");
    encodeAsync = /* @__PURE__ */ _encodeAsync($ZodRealError);
    _decodeAsync = /* @__PURE__ */ __name((_Err) => async (schema, value, _ctx) => {
      return _parseAsync(_Err)(schema, value, _ctx);
    }, "_decodeAsync");
    decodeAsync = /* @__PURE__ */ _decodeAsync($ZodRealError);
    _safeEncode = /* @__PURE__ */ __name((_Err) => (schema, value, _ctx) => {
      const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
      return _safeParse(_Err)(schema, value, ctx);
    }, "_safeEncode");
    safeEncode = /* @__PURE__ */ _safeEncode($ZodRealError);
    _safeDecode = /* @__PURE__ */ __name((_Err) => (schema, value, _ctx) => {
      return _safeParse(_Err)(schema, value, _ctx);
    }, "_safeDecode");
    safeDecode = /* @__PURE__ */ _safeDecode($ZodRealError);
    _safeEncodeAsync = /* @__PURE__ */ __name((_Err) => async (schema, value, _ctx) => {
      const ctx = _ctx ? Object.assign(_ctx, { direction: "backward" }) : { direction: "backward" };
      return _safeParseAsync(_Err)(schema, value, ctx);
    }, "_safeEncodeAsync");
    safeEncodeAsync = /* @__PURE__ */ _safeEncodeAsync($ZodRealError);
    _safeDecodeAsync = /* @__PURE__ */ __name((_Err) => async (schema, value, _ctx) => {
      return _safeParseAsync(_Err)(schema, value, _ctx);
    }, "_safeDecodeAsync");
    safeDecodeAsync = /* @__PURE__ */ _safeDecodeAsync($ZodRealError);
  }
});

// ../node_modules/zod/v4/core/regexes.js
var regexes_exports = {};
__export(regexes_exports, {
  base64: () => base64,
  base64url: () => base64url,
  bigint: () => bigint2,
  boolean: () => boolean,
  browserEmail: () => browserEmail,
  cidrv4: () => cidrv4,
  cidrv6: () => cidrv6,
  cuid: () => cuid,
  cuid2: () => cuid2,
  date: () => date,
  datetime: () => datetime,
  domain: () => domain2,
  duration: () => duration,
  e164: () => e164,
  email: () => email,
  emoji: () => emoji,
  extendedDuration: () => extendedDuration,
  guid: () => guid,
  hex: () => hex,
  hostname: () => hostname,
  html5Email: () => html5Email,
  idnEmail: () => idnEmail,
  integer: () => integer,
  ipv4: () => ipv4,
  ipv6: () => ipv6,
  ksuid: () => ksuid,
  lowercase: () => lowercase,
  mac: () => mac,
  md5_base64: () => md5_base64,
  md5_base64url: () => md5_base64url,
  md5_hex: () => md5_hex,
  nanoid: () => nanoid,
  null: () => _null,
  number: () => number,
  rfc5322Email: () => rfc5322Email,
  sha1_base64: () => sha1_base64,
  sha1_base64url: () => sha1_base64url,
  sha1_hex: () => sha1_hex,
  sha256_base64: () => sha256_base64,
  sha256_base64url: () => sha256_base64url,
  sha256_hex: () => sha256_hex,
  sha384_base64: () => sha384_base64,
  sha384_base64url: () => sha384_base64url,
  sha384_hex: () => sha384_hex,
  sha512_base64: () => sha512_base64,
  sha512_base64url: () => sha512_base64url,
  sha512_hex: () => sha512_hex,
  string: () => string,
  time: () => time3,
  ulid: () => ulid,
  undefined: () => _undefined,
  unicodeEmail: () => unicodeEmail,
  uppercase: () => uppercase,
  uuid: () => uuid,
  uuid4: () => uuid4,
  uuid6: () => uuid6,
  uuid7: () => uuid7,
  xid: () => xid
});
function emoji() {
  return new RegExp(_emoji, "u");
}
function timeSource(args) {
  const hhmm = `(?:[01]\\d|2[0-3]):[0-5]\\d`;
  const regex = typeof args.precision === "number" ? args.precision === -1 ? `${hhmm}` : args.precision === 0 ? `${hhmm}:[0-5]\\d` : `${hhmm}:[0-5]\\d\\.\\d{${args.precision}}` : `${hhmm}(?::[0-5]\\d(?:\\.\\d+)?)?`;
  return regex;
}
function time3(args) {
  return new RegExp(`^${timeSource(args)}$`);
}
function datetime(args) {
  const time5 = timeSource({ precision: args.precision });
  const opts = ["Z"];
  if (args.local)
    opts.push("");
  if (args.offset)
    opts.push(`([+-](?:[01]\\d|2[0-3]):[0-5]\\d)`);
  const timeRegex = `${time5}(?:${opts.join("|")})`;
  return new RegExp(`^${dateSource}T(?:${timeRegex})$`);
}
function fixedBase64(bodyLength, padding) {
  return new RegExp(`^[A-Za-z0-9+/]{${bodyLength}}${padding}$`);
}
function fixedBase64url(length) {
  return new RegExp(`^[A-Za-z0-9_-]{${length}}$`);
}
var cuid, cuid2, ulid, xid, ksuid, nanoid, duration, extendedDuration, guid, uuid, uuid4, uuid6, uuid7, email, html5Email, rfc5322Email, unicodeEmail, idnEmail, browserEmail, _emoji, ipv4, ipv6, mac, cidrv4, cidrv6, base64, base64url, hostname, domain2, e164, dateSource, date, string, bigint2, integer, number, boolean, _null, _undefined, lowercase, uppercase, hex, md5_hex, md5_base64, md5_base64url, sha1_hex, sha1_base64, sha1_base64url, sha256_hex, sha256_base64, sha256_base64url, sha384_hex, sha384_base64, sha384_base64url, sha512_hex, sha512_base64, sha512_base64url;
var init_regexes = __esm({
  "../node_modules/zod/v4/core/regexes.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    cuid = /^[cC][^\s-]{8,}$/;
    cuid2 = /^[0-9a-z]+$/;
    ulid = /^[0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{26}$/;
    xid = /^[0-9a-vA-V]{20}$/;
    ksuid = /^[A-Za-z0-9]{27}$/;
    nanoid = /^[a-zA-Z0-9_-]{21}$/;
    duration = /^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;
    extendedDuration = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
    guid = /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/;
    uuid = /* @__PURE__ */ __name((version3) => {
      if (!version3)
        return /^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;
      return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${version3}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`);
    }, "uuid");
    uuid4 = /* @__PURE__ */ uuid(4);
    uuid6 = /* @__PURE__ */ uuid(6);
    uuid7 = /* @__PURE__ */ uuid(7);
    email = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_'+\-\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;
    html5Email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    rfc5322Email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    unicodeEmail = /^[^\s@"]{1,64}@[^\s@]{1,255}$/u;
    idnEmail = unicodeEmail;
    browserEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    _emoji = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
    __name(emoji, "emoji");
    ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
    ipv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;
    mac = /* @__PURE__ */ __name((delimiter) => {
      const escapedDelim = escapeRegex(delimiter ?? ":");
      return new RegExp(`^(?:[0-9A-F]{2}${escapedDelim}){5}[0-9A-F]{2}$|^(?:[0-9a-f]{2}${escapedDelim}){5}[0-9a-f]{2}$`);
    }, "mac");
    cidrv4 = /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/;
    cidrv6 = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4})?::([0-9a-fA-F]{1,4}:?){0,6})\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
    base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
    base64url = /^[A-Za-z0-9_-]*$/;
    hostname = /^(?=.{1,253}\.?$)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[-0-9a-zA-Z]{0,61}[0-9a-zA-Z])?)*\.?$/;
    domain2 = /^([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    e164 = /^\+[1-9]\d{6,14}$/;
    dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
    date = /* @__PURE__ */ new RegExp(`^${dateSource}$`);
    __name(timeSource, "timeSource");
    __name(time3, "time");
    __name(datetime, "datetime");
    string = /* @__PURE__ */ __name((params) => {
      const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
      return new RegExp(`^${regex}$`);
    }, "string");
    bigint2 = /^-?\d+n?$/;
    integer = /^-?\d+$/;
    number = /^-?\d+(?:\.\d+)?$/;
    boolean = /^(?:true|false)$/i;
    _null = /^null$/i;
    _undefined = /^undefined$/i;
    lowercase = /^[^A-Z]*$/;
    uppercase = /^[^a-z]*$/;
    hex = /^[0-9a-fA-F]*$/;
    __name(fixedBase64, "fixedBase64");
    __name(fixedBase64url, "fixedBase64url");
    md5_hex = /^[0-9a-fA-F]{32}$/;
    md5_base64 = /* @__PURE__ */ fixedBase64(22, "==");
    md5_base64url = /* @__PURE__ */ fixedBase64url(22);
    sha1_hex = /^[0-9a-fA-F]{40}$/;
    sha1_base64 = /* @__PURE__ */ fixedBase64(27, "=");
    sha1_base64url = /* @__PURE__ */ fixedBase64url(27);
    sha256_hex = /^[0-9a-fA-F]{64}$/;
    sha256_base64 = /* @__PURE__ */ fixedBase64(43, "=");
    sha256_base64url = /* @__PURE__ */ fixedBase64url(43);
    sha384_hex = /^[0-9a-fA-F]{96}$/;
    sha384_base64 = /* @__PURE__ */ fixedBase64(64, "");
    sha384_base64url = /* @__PURE__ */ fixedBase64url(64);
    sha512_hex = /^[0-9a-fA-F]{128}$/;
    sha512_base64 = /* @__PURE__ */ fixedBase64(86, "==");
    sha512_base64url = /* @__PURE__ */ fixedBase64url(86);
  }
});

// ../node_modules/zod/v4/core/checks.js
function handleCheckPropertyResult(result, payload, property) {
  if (result.issues.length) {
    payload.issues.push(...prefixIssues(property, result.issues));
  }
}
var $ZodCheck, numericOriginMap, $ZodCheckLessThan, $ZodCheckGreaterThan, $ZodCheckMultipleOf, $ZodCheckNumberFormat, $ZodCheckBigIntFormat, $ZodCheckMaxSize, $ZodCheckMinSize, $ZodCheckSizeEquals, $ZodCheckMaxLength, $ZodCheckMinLength, $ZodCheckLengthEquals, $ZodCheckStringFormat, $ZodCheckRegex, $ZodCheckLowerCase, $ZodCheckUpperCase, $ZodCheckIncludes, $ZodCheckStartsWith, $ZodCheckEndsWith, $ZodCheckProperty, $ZodCheckMimeType, $ZodCheckOverwrite;
var init_checks = __esm({
  "../node_modules/zod/v4/core/checks.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_core();
    init_regexes();
    init_util();
    $ZodCheck = /* @__PURE__ */ $constructor("$ZodCheck", (inst, def) => {
      var _a2;
      inst._zod ?? (inst._zod = {});
      inst._zod.def = def;
      (_a2 = inst._zod).onattach ?? (_a2.onattach = []);
    });
    numericOriginMap = {
      number: "number",
      bigint: "bigint",
      object: "date"
    };
    $ZodCheckLessThan = /* @__PURE__ */ $constructor("$ZodCheckLessThan", (inst, def) => {
      $ZodCheck.init(inst, def);
      const origin = numericOriginMap[typeof def.value];
      inst._zod.onattach.push((inst2) => {
        const bag = inst2._zod.bag;
        const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
        if (def.value < curr) {
          if (def.inclusive)
            bag.maximum = def.value;
          else
            bag.exclusiveMaximum = def.value;
        }
      });
      inst._zod.check = (payload) => {
        if (def.inclusive ? payload.value <= def.value : payload.value < def.value) {
          return;
        }
        payload.issues.push({
          origin,
          code: "too_big",
          maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
          input: payload.value,
          inclusive: def.inclusive,
          inst,
          continue: !def.abort
        });
      };
    });
    $ZodCheckGreaterThan = /* @__PURE__ */ $constructor("$ZodCheckGreaterThan", (inst, def) => {
      $ZodCheck.init(inst, def);
      const origin = numericOriginMap[typeof def.value];
      inst._zod.onattach.push((inst2) => {
        const bag = inst2._zod.bag;
        const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
        if (def.value > curr) {
          if (def.inclusive)
            bag.minimum = def.value;
          else
            bag.exclusiveMinimum = def.value;
        }
      });
      inst._zod.check = (payload) => {
        if (def.inclusive ? payload.value >= def.value : payload.value > def.value) {
          return;
        }
        payload.issues.push({
          origin,
          code: "too_small",
          minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
          input: payload.value,
          inclusive: def.inclusive,
          inst,
          continue: !def.abort
        });
      };
    });
    $ZodCheckMultipleOf = /* @__PURE__ */ $constructor("$ZodCheckMultipleOf", (inst, def) => {
      $ZodCheck.init(inst, def);
      inst._zod.onattach.push((inst2) => {
        var _a2;
        (_a2 = inst2._zod.bag).multipleOf ?? (_a2.multipleOf = def.value);
      });
      inst._zod.check = (payload) => {
        if (typeof payload.value !== typeof def.value)
          throw new Error("Cannot mix number and bigint in multiple_of check.");
        const isMultiple = typeof payload.value === "bigint" ? payload.value % def.value === BigInt(0) : floatSafeRemainder(payload.value, def.value) === 0;
        if (isMultiple)
          return;
        payload.issues.push({
          origin: typeof payload.value,
          code: "not_multiple_of",
          divisor: def.value,
          input: payload.value,
          inst,
          continue: !def.abort
        });
      };
    });
    $ZodCheckNumberFormat = /* @__PURE__ */ $constructor("$ZodCheckNumberFormat", (inst, def) => {
      $ZodCheck.init(inst, def);
      def.format = def.format || "float64";
      const isInt = def.format?.includes("int");
      const origin = isInt ? "int" : "number";
      const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
      inst._zod.onattach.push((inst2) => {
        const bag = inst2._zod.bag;
        bag.format = def.format;
        bag.minimum = minimum;
        bag.maximum = maximum;
        if (isInt)
          bag.pattern = integer;
      });
      inst._zod.check = (payload) => {
        const input = payload.value;
        if (isInt) {
          if (!Number.isInteger(input)) {
            payload.issues.push({
              expected: origin,
              format: def.format,
              code: "invalid_type",
              continue: false,
              input,
              inst
            });
            return;
          }
          if (!Number.isSafeInteger(input)) {
            if (input > 0) {
              payload.issues.push({
                input,
                code: "too_big",
                maximum: Number.MAX_SAFE_INTEGER,
                note: "Integers must be within the safe integer range.",
                inst,
                origin,
                inclusive: true,
                continue: !def.abort
              });
            } else {
              payload.issues.push({
                input,
                code: "too_small",
                minimum: Number.MIN_SAFE_INTEGER,
                note: "Integers must be within the safe integer range.",
                inst,
                origin,
                inclusive: true,
                continue: !def.abort
              });
            }
            return;
          }
        }
        if (input < minimum) {
          payload.issues.push({
            origin: "number",
            input,
            code: "too_small",
            minimum,
            inclusive: true,
            inst,
            continue: !def.abort
          });
        }
        if (input > maximum) {
          payload.issues.push({
            origin: "number",
            input,
            code: "too_big",
            maximum,
            inclusive: true,
            inst,
            continue: !def.abort
          });
        }
      };
    });
    $ZodCheckBigIntFormat = /* @__PURE__ */ $constructor("$ZodCheckBigIntFormat", (inst, def) => {
      $ZodCheck.init(inst, def);
      const [minimum, maximum] = BIGINT_FORMAT_RANGES[def.format];
      inst._zod.onattach.push((inst2) => {
        const bag = inst2._zod.bag;
        bag.format = def.format;
        bag.minimum = minimum;
        bag.maximum = maximum;
      });
      inst._zod.check = (payload) => {
        const input = payload.value;
        if (input < minimum) {
          payload.issues.push({
            origin: "bigint",
            input,
            code: "too_small",
            minimum,
            inclusive: true,
            inst,
            continue: !def.abort
          });
        }
        if (input > maximum) {
          payload.issues.push({
            origin: "bigint",
            input,
            code: "too_big",
            maximum,
            inclusive: true,
            inst,
            continue: !def.abort
          });
        }
      };
    });
    $ZodCheckMaxSize = /* @__PURE__ */ $constructor("$ZodCheckMaxSize", (inst, def) => {
      var _a2;
      $ZodCheck.init(inst, def);
      (_a2 = inst._zod.def).when ?? (_a2.when = (payload) => {
        const val = payload.value;
        return !nullish(val) && val.size !== void 0;
      });
      inst._zod.onattach.push((inst2) => {
        const curr = inst2._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
        if (def.maximum < curr)
          inst2._zod.bag.maximum = def.maximum;
      });
      inst._zod.check = (payload) => {
        const input = payload.value;
        const size = input.size;
        if (size <= def.maximum)
          return;
        payload.issues.push({
          origin: getSizableOrigin(input),
          code: "too_big",
          maximum: def.maximum,
          inclusive: true,
          input,
          inst,
          continue: !def.abort
        });
      };
    });
    $ZodCheckMinSize = /* @__PURE__ */ $constructor("$ZodCheckMinSize", (inst, def) => {
      var _a2;
      $ZodCheck.init(inst, def);
      (_a2 = inst._zod.def).when ?? (_a2.when = (payload) => {
        const val = payload.value;
        return !nullish(val) && val.size !== void 0;
      });
      inst._zod.onattach.push((inst2) => {
        const curr = inst2._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
        if (def.minimum > curr)
          inst2._zod.bag.minimum = def.minimum;
      });
      inst._zod.check = (payload) => {
        const input = payload.value;
        const size = input.size;
        if (size >= def.minimum)
          return;
        payload.issues.push({
          origin: getSizableOrigin(input),
          code: "too_small",
          minimum: def.minimum,
          inclusive: true,
          input,
          inst,
          continue: !def.abort
        });
      };
    });
    $ZodCheckSizeEquals = /* @__PURE__ */ $constructor("$ZodCheckSizeEquals", (inst, def) => {
      var _a2;
      $ZodCheck.init(inst, def);
      (_a2 = inst._zod.def).when ?? (_a2.when = (payload) => {
        const val = payload.value;
        return !nullish(val) && val.size !== void 0;
      });
      inst._zod.onattach.push((inst2) => {
        const bag = inst2._zod.bag;
        bag.minimum = def.size;
        bag.maximum = def.size;
        bag.size = def.size;
      });
      inst._zod.check = (payload) => {
        const input = payload.value;
        const size = input.size;
        if (size === def.size)
          return;
        const tooBig = size > def.size;
        payload.issues.push({
          origin: getSizableOrigin(input),
          ...tooBig ? { code: "too_big", maximum: def.size } : { code: "too_small", minimum: def.size },
          inclusive: true,
          exact: true,
          input: payload.value,
          inst,
          continue: !def.abort
        });
      };
    });
    $ZodCheckMaxLength = /* @__PURE__ */ $constructor("$ZodCheckMaxLength", (inst, def) => {
      var _a2;
      $ZodCheck.init(inst, def);
      (_a2 = inst._zod.def).when ?? (_a2.when = (payload) => {
        const val = payload.value;
        return !nullish(val) && val.length !== void 0;
      });
      inst._zod.onattach.push((inst2) => {
        const curr = inst2._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
        if (def.maximum < curr)
          inst2._zod.bag.maximum = def.maximum;
      });
      inst._zod.check = (payload) => {
        const input = payload.value;
        const length = input.length;
        if (length <= def.maximum)
          return;
        const origin = getLengthableOrigin(input);
        payload.issues.push({
          origin,
          code: "too_big",
          maximum: def.maximum,
          inclusive: true,
          input,
          inst,
          continue: !def.abort
        });
      };
    });
    $ZodCheckMinLength = /* @__PURE__ */ $constructor("$ZodCheckMinLength", (inst, def) => {
      var _a2;
      $ZodCheck.init(inst, def);
      (_a2 = inst._zod.def).when ?? (_a2.when = (payload) => {
        const val = payload.value;
        return !nullish(val) && val.length !== void 0;
      });
      inst._zod.onattach.push((inst2) => {
        const curr = inst2._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
        if (def.minimum > curr)
          inst2._zod.bag.minimum = def.minimum;
      });
      inst._zod.check = (payload) => {
        const input = payload.value;
        const length = input.length;
        if (length >= def.minimum)
          return;
        const origin = getLengthableOrigin(input);
        payload.issues.push({
          origin,
          code: "too_small",
          minimum: def.minimum,
          inclusive: true,
          input,
          inst,
          continue: !def.abort
        });
      };
    });
    $ZodCheckLengthEquals = /* @__PURE__ */ $constructor("$ZodCheckLengthEquals", (inst, def) => {
      var _a2;
      $ZodCheck.init(inst, def);
      (_a2 = inst._zod.def).when ?? (_a2.when = (payload) => {
        const val = payload.value;
        return !nullish(val) && val.length !== void 0;
      });
      inst._zod.onattach.push((inst2) => {
        const bag = inst2._zod.bag;
        bag.minimum = def.length;
        bag.maximum = def.length;
        bag.length = def.length;
      });
      inst._zod.check = (payload) => {
        const input = payload.value;
        const length = input.length;
        if (length === def.length)
          return;
        const origin = getLengthableOrigin(input);
        const tooBig = length > def.length;
        payload.issues.push({
          origin,
          ...tooBig ? { code: "too_big", maximum: def.length } : { code: "too_small", minimum: def.length },
          inclusive: true,
          exact: true,
          input: payload.value,
          inst,
          continue: !def.abort
        });
      };
    });
    $ZodCheckStringFormat = /* @__PURE__ */ $constructor("$ZodCheckStringFormat", (inst, def) => {
      var _a2, _b;
      $ZodCheck.init(inst, def);
      inst._zod.onattach.push((inst2) => {
        const bag = inst2._zod.bag;
        bag.format = def.format;
        if (def.pattern) {
          bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
          bag.patterns.add(def.pattern);
        }
      });
      if (def.pattern)
        (_a2 = inst._zod).check ?? (_a2.check = (payload) => {
          def.pattern.lastIndex = 0;
          if (def.pattern.test(payload.value))
            return;
          payload.issues.push({
            origin: "string",
            code: "invalid_format",
            format: def.format,
            input: payload.value,
            ...def.pattern ? { pattern: def.pattern.toString() } : {},
            inst,
            continue: !def.abort
          });
        });
      else
        (_b = inst._zod).check ?? (_b.check = () => {
        });
    });
    $ZodCheckRegex = /* @__PURE__ */ $constructor("$ZodCheckRegex", (inst, def) => {
      $ZodCheckStringFormat.init(inst, def);
      inst._zod.check = (payload) => {
        def.pattern.lastIndex = 0;
        if (def.pattern.test(payload.value))
          return;
        payload.issues.push({
          origin: "string",
          code: "invalid_format",
          format: "regex",
          input: payload.value,
          pattern: def.pattern.toString(),
          inst,
          continue: !def.abort
        });
      };
    });
    $ZodCheckLowerCase = /* @__PURE__ */ $constructor("$ZodCheckLowerCase", (inst, def) => {
      def.pattern ?? (def.pattern = lowercase);
      $ZodCheckStringFormat.init(inst, def);
    });
    $ZodCheckUpperCase = /* @__PURE__ */ $constructor("$ZodCheckUpperCase", (inst, def) => {
      def.pattern ?? (def.pattern = uppercase);
      $ZodCheckStringFormat.init(inst, def);
    });
    $ZodCheckIncludes = /* @__PURE__ */ $constructor("$ZodCheckIncludes", (inst, def) => {
      $ZodCheck.init(inst, def);
      const escapedRegex = escapeRegex(def.includes);
      const pattern = new RegExp(typeof def.position === "number" ? `^.{${def.position}}${escapedRegex}` : escapedRegex);
      def.pattern = pattern;
      inst._zod.onattach.push((inst2) => {
        const bag = inst2._zod.bag;
        bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
        bag.patterns.add(pattern);
      });
      inst._zod.check = (payload) => {
        if (payload.value.includes(def.includes, def.position))
          return;
        payload.issues.push({
          origin: "string",
          code: "invalid_format",
          format: "includes",
          includes: def.includes,
          input: payload.value,
          inst,
          continue: !def.abort
        });
      };
    });
    $ZodCheckStartsWith = /* @__PURE__ */ $constructor("$ZodCheckStartsWith", (inst, def) => {
      $ZodCheck.init(inst, def);
      const pattern = new RegExp(`^${escapeRegex(def.prefix)}.*`);
      def.pattern ?? (def.pattern = pattern);
      inst._zod.onattach.push((inst2) => {
        const bag = inst2._zod.bag;
        bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
        bag.patterns.add(pattern);
      });
      inst._zod.check = (payload) => {
        if (payload.value.startsWith(def.prefix))
          return;
        payload.issues.push({
          origin: "string",
          code: "invalid_format",
          format: "starts_with",
          prefix: def.prefix,
          input: payload.value,
          inst,
          continue: !def.abort
        });
      };
    });
    $ZodCheckEndsWith = /* @__PURE__ */ $constructor("$ZodCheckEndsWith", (inst, def) => {
      $ZodCheck.init(inst, def);
      const pattern = new RegExp(`.*${escapeRegex(def.suffix)}$`);
      def.pattern ?? (def.pattern = pattern);
      inst._zod.onattach.push((inst2) => {
        const bag = inst2._zod.bag;
        bag.patterns ?? (bag.patterns = /* @__PURE__ */ new Set());
        bag.patterns.add(pattern);
      });
      inst._zod.check = (payload) => {
        if (payload.value.endsWith(def.suffix))
          return;
        payload.issues.push({
          origin: "string",
          code: "invalid_format",
          format: "ends_with",
          suffix: def.suffix,
          input: payload.value,
          inst,
          continue: !def.abort
        });
      };
    });
    __name(handleCheckPropertyResult, "handleCheckPropertyResult");
    $ZodCheckProperty = /* @__PURE__ */ $constructor("$ZodCheckProperty", (inst, def) => {
      $ZodCheck.init(inst, def);
      inst._zod.check = (payload) => {
        const result = def.schema._zod.run({
          value: payload.value[def.property],
          issues: []
        }, {});
        if (result instanceof Promise) {
          return result.then((result2) => handleCheckPropertyResult(result2, payload, def.property));
        }
        handleCheckPropertyResult(result, payload, def.property);
        return;
      };
    });
    $ZodCheckMimeType = /* @__PURE__ */ $constructor("$ZodCheckMimeType", (inst, def) => {
      $ZodCheck.init(inst, def);
      const mimeSet = new Set(def.mime);
      inst._zod.onattach.push((inst2) => {
        inst2._zod.bag.mime = def.mime;
      });
      inst._zod.check = (payload) => {
        if (mimeSet.has(payload.value.type))
          return;
        payload.issues.push({
          code: "invalid_value",
          values: def.mime,
          input: payload.value.type,
          inst,
          continue: !def.abort
        });
      };
    });
    $ZodCheckOverwrite = /* @__PURE__ */ $constructor("$ZodCheckOverwrite", (inst, def) => {
      $ZodCheck.init(inst, def);
      inst._zod.check = (payload) => {
        payload.value = def.tx(payload.value);
      };
    });
  }
});

// ../node_modules/zod/v4/core/doc.js
var Doc;
var init_doc = __esm({
  "../node_modules/zod/v4/core/doc.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Doc = class {
      constructor(args = []) {
        this.content = [];
        this.indent = 0;
        if (this)
          this.args = args;
      }
      indented(fn) {
        this.indent += 1;
        fn(this);
        this.indent -= 1;
      }
      write(arg) {
        if (typeof arg === "function") {
          arg(this, { execution: "sync" });
          arg(this, { execution: "async" });
          return;
        }
        const content = arg;
        const lines = content.split("\n").filter((x) => x);
        const minIndent = Math.min(...lines.map((x) => x.length - x.trimStart().length));
        const dedented = lines.map((x) => x.slice(minIndent)).map((x) => " ".repeat(this.indent * 2) + x);
        for (const line of dedented) {
          this.content.push(line);
        }
      }
      compile() {
        const F = Function;
        const args = this?.args;
        const content = this?.content ?? [``];
        const lines = [...content.map((x) => `  ${x}`)];
        return new F(...args, lines.join("\n"));
      }
    };
    __name(Doc, "Doc");
  }
});

// ../node_modules/zod/v4/core/versions.js
var version2;
var init_versions = __esm({
  "../node_modules/zod/v4/core/versions.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    version2 = {
      major: 4,
      minor: 3,
      patch: 6
    };
  }
});

// ../node_modules/zod/v4/core/schemas.js
function isValidBase64(data) {
  if (data === "")
    return true;
  if (data.length % 4 !== 0)
    return false;
  try {
    atob(data);
    return true;
  } catch {
    return false;
  }
}
function isValidBase64URL(data) {
  if (!base64url.test(data))
    return false;
  const base643 = data.replace(/[-_]/g, (c) => c === "-" ? "+" : "/");
  const padded = base643.padEnd(Math.ceil(base643.length / 4) * 4, "=");
  return isValidBase64(padded);
}
function isValidJWT(token, algorithm = null) {
  try {
    const tokensParts = token.split(".");
    if (tokensParts.length !== 3)
      return false;
    const [header] = tokensParts;
    if (!header)
      return false;
    const parsedHeader = JSON.parse(atob(header));
    if ("typ" in parsedHeader && parsedHeader?.typ !== "JWT")
      return false;
    if (!parsedHeader.alg)
      return false;
    if (algorithm && (!("alg" in parsedHeader) || parsedHeader.alg !== algorithm))
      return false;
    return true;
  } catch {
    return false;
  }
}
function handleArrayResult(result, final, index) {
  if (result.issues.length) {
    final.issues.push(...prefixIssues(index, result.issues));
  }
  final.value[index] = result.value;
}
function handlePropertyResult(result, final, key, input, isOptionalOut) {
  if (result.issues.length) {
    if (isOptionalOut && !(key in input)) {
      return;
    }
    final.issues.push(...prefixIssues(key, result.issues));
  }
  if (result.value === void 0) {
    if (key in input) {
      final.value[key] = void 0;
    }
  } else {
    final.value[key] = result.value;
  }
}
function normalizeDef(def) {
  const keys = Object.keys(def.shape);
  for (const k of keys) {
    if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) {
      throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
    }
  }
  const okeys = optionalKeys(def.shape);
  return {
    ...def,
    keys,
    keySet: new Set(keys),
    numKeys: keys.length,
    optionalKeys: new Set(okeys)
  };
}
function handleCatchall(proms, input, payload, ctx, def, inst) {
  const unrecognized = [];
  const keySet = def.keySet;
  const _catchall = def.catchall._zod;
  const t = _catchall.def.type;
  const isOptionalOut = _catchall.optout === "optional";
  for (const key in input) {
    if (keySet.has(key))
      continue;
    if (t === "never") {
      unrecognized.push(key);
      continue;
    }
    const r = _catchall.run({ value: input[key], issues: [] }, ctx);
    if (r instanceof Promise) {
      proms.push(r.then((r2) => handlePropertyResult(r2, payload, key, input, isOptionalOut)));
    } else {
      handlePropertyResult(r, payload, key, input, isOptionalOut);
    }
  }
  if (unrecognized.length) {
    payload.issues.push({
      code: "unrecognized_keys",
      keys: unrecognized,
      input,
      inst
    });
  }
  if (!proms.length)
    return payload;
  return Promise.all(proms).then(() => {
    return payload;
  });
}
function handleUnionResults(results, final, inst, ctx) {
  for (const result of results) {
    if (result.issues.length === 0) {
      final.value = result.value;
      return final;
    }
  }
  const nonaborted = results.filter((r) => !aborted(r));
  if (nonaborted.length === 1) {
    final.value = nonaborted[0].value;
    return nonaborted[0];
  }
  final.issues.push({
    code: "invalid_union",
    input: final.value,
    inst,
    errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config2())))
  });
  return final;
}
function handleExclusiveUnionResults(results, final, inst, ctx) {
  const successes = results.filter((r) => r.issues.length === 0);
  if (successes.length === 1) {
    final.value = successes[0].value;
    return final;
  }
  if (successes.length === 0) {
    final.issues.push({
      code: "invalid_union",
      input: final.value,
      inst,
      errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config2())))
    });
  } else {
    final.issues.push({
      code: "invalid_union",
      input: final.value,
      inst,
      errors: [],
      inclusive: false
    });
  }
  return final;
}
function mergeValues(a, b) {
  if (a === b) {
    return { valid: true, data: a };
  }
  if (a instanceof Date && b instanceof Date && +a === +b) {
    return { valid: true, data: a };
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const bKeys = Object.keys(b);
    const sharedKeys = Object.keys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return {
          valid: false,
          mergeErrorPath: [key, ...sharedValue.mergeErrorPath]
        };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return { valid: false, mergeErrorPath: [] };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return {
          valid: false,
          mergeErrorPath: [index, ...sharedValue.mergeErrorPath]
        };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  }
  return { valid: false, mergeErrorPath: [] };
}
function handleIntersectionResults(result, left, right) {
  const unrecKeys = /* @__PURE__ */ new Map();
  let unrecIssue;
  for (const iss of left.issues) {
    if (iss.code === "unrecognized_keys") {
      unrecIssue ?? (unrecIssue = iss);
      for (const k of iss.keys) {
        if (!unrecKeys.has(k))
          unrecKeys.set(k, {});
        unrecKeys.get(k).l = true;
      }
    } else {
      result.issues.push(iss);
    }
  }
  for (const iss of right.issues) {
    if (iss.code === "unrecognized_keys") {
      for (const k of iss.keys) {
        if (!unrecKeys.has(k))
          unrecKeys.set(k, {});
        unrecKeys.get(k).r = true;
      }
    } else {
      result.issues.push(iss);
    }
  }
  const bothKeys = [...unrecKeys].filter(([, f]) => f.l && f.r).map(([k]) => k);
  if (bothKeys.length && unrecIssue) {
    result.issues.push({ ...unrecIssue, keys: bothKeys });
  }
  if (aborted(result))
    return result;
  const merged = mergeValues(left.value, right.value);
  if (!merged.valid) {
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(merged.mergeErrorPath)}`);
  }
  result.value = merged.data;
  return result;
}
function handleTupleResult(result, final, index) {
  if (result.issues.length) {
    final.issues.push(...prefixIssues(index, result.issues));
  }
  final.value[index] = result.value;
}
function handleMapResult(keyResult, valueResult, final, key, input, inst, ctx) {
  if (keyResult.issues.length) {
    if (propertyKeyTypes.has(typeof key)) {
      final.issues.push(...prefixIssues(key, keyResult.issues));
    } else {
      final.issues.push({
        code: "invalid_key",
        origin: "map",
        input,
        inst,
        issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config2()))
      });
    }
  }
  if (valueResult.issues.length) {
    if (propertyKeyTypes.has(typeof key)) {
      final.issues.push(...prefixIssues(key, valueResult.issues));
    } else {
      final.issues.push({
        origin: "map",
        code: "invalid_element",
        input,
        inst,
        key,
        issues: valueResult.issues.map((iss) => finalizeIssue(iss, ctx, config2()))
      });
    }
  }
  final.value.set(keyResult.value, valueResult.value);
}
function handleSetResult(result, final) {
  if (result.issues.length) {
    final.issues.push(...result.issues);
  }
  final.value.add(result.value);
}
function handleOptionalResult(result, input) {
  if (result.issues.length && input === void 0) {
    return { issues: [], value: void 0 };
  }
  return result;
}
function handleDefaultResult(payload, def) {
  if (payload.value === void 0) {
    payload.value = def.defaultValue;
  }
  return payload;
}
function handleNonOptionalResult(payload, inst) {
  if (!payload.issues.length && payload.value === void 0) {
    payload.issues.push({
      code: "invalid_type",
      expected: "nonoptional",
      input: payload.value,
      inst
    });
  }
  return payload;
}
function handlePipeResult(left, next, ctx) {
  if (left.issues.length) {
    left.aborted = true;
    return left;
  }
  return next._zod.run({ value: left.value, issues: left.issues }, ctx);
}
function handleCodecAResult(result, def, ctx) {
  if (result.issues.length) {
    result.aborted = true;
    return result;
  }
  const direction = ctx.direction || "forward";
  if (direction === "forward") {
    const transformed = def.transform(result.value, result);
    if (transformed instanceof Promise) {
      return transformed.then((value) => handleCodecTxResult(result, value, def.out, ctx));
    }
    return handleCodecTxResult(result, transformed, def.out, ctx);
  } else {
    const transformed = def.reverseTransform(result.value, result);
    if (transformed instanceof Promise) {
      return transformed.then((value) => handleCodecTxResult(result, value, def.in, ctx));
    }
    return handleCodecTxResult(result, transformed, def.in, ctx);
  }
}
function handleCodecTxResult(left, value, nextSchema, ctx) {
  if (left.issues.length) {
    left.aborted = true;
    return left;
  }
  return nextSchema._zod.run({ value, issues: left.issues }, ctx);
}
function handleReadonlyResult(payload) {
  payload.value = Object.freeze(payload.value);
  return payload;
}
function handleRefineResult(result, payload, input, inst) {
  if (!result) {
    const _iss = {
      code: "custom",
      input,
      inst,
      // incorporates params.error into issue reporting
      path: [...inst._zod.def.path ?? []],
      // incorporates params.error into issue reporting
      continue: !inst._zod.def.abort
      // params: inst._zod.def.params,
    };
    if (inst._zod.def.params)
      _iss.params = inst._zod.def.params;
    payload.issues.push(issue(_iss));
  }
}
var $ZodType, $ZodString, $ZodStringFormat, $ZodGUID, $ZodUUID, $ZodEmail, $ZodURL, $ZodEmoji, $ZodNanoID, $ZodCUID, $ZodCUID2, $ZodULID, $ZodXID, $ZodKSUID, $ZodISODateTime, $ZodISODate, $ZodISOTime, $ZodISODuration, $ZodIPv4, $ZodIPv6, $ZodMAC, $ZodCIDRv4, $ZodCIDRv6, $ZodBase64, $ZodBase64URL, $ZodE164, $ZodJWT, $ZodCustomStringFormat, $ZodNumber, $ZodNumberFormat, $ZodBoolean, $ZodBigInt, $ZodBigIntFormat, $ZodSymbol, $ZodUndefined, $ZodNull, $ZodAny, $ZodUnknown, $ZodNever, $ZodVoid, $ZodDate, $ZodArray, $ZodObject, $ZodObjectJIT, $ZodUnion, $ZodXor, $ZodDiscriminatedUnion, $ZodIntersection, $ZodTuple, $ZodRecord, $ZodMap, $ZodSet, $ZodEnum, $ZodLiteral, $ZodFile, $ZodTransform, $ZodOptional, $ZodExactOptional, $ZodNullable, $ZodDefault, $ZodPrefault, $ZodNonOptional, $ZodSuccess, $ZodCatch, $ZodNaN, $ZodPipe, $ZodCodec, $ZodReadonly, $ZodTemplateLiteral, $ZodFunction, $ZodPromise, $ZodLazy, $ZodCustom;
var init_schemas = __esm({
  "../node_modules/zod/v4/core/schemas.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_checks();
    init_core();
    init_doc();
    init_parse();
    init_regexes();
    init_util();
    init_versions();
    init_util();
    $ZodType = /* @__PURE__ */ $constructor("$ZodType", (inst, def) => {
      var _a2;
      inst ?? (inst = {});
      inst._zod.def = def;
      inst._zod.bag = inst._zod.bag || {};
      inst._zod.version = version2;
      const checks = [...inst._zod.def.checks ?? []];
      if (inst._zod.traits.has("$ZodCheck")) {
        checks.unshift(inst);
      }
      for (const ch of checks) {
        for (const fn of ch._zod.onattach) {
          fn(inst);
        }
      }
      if (checks.length === 0) {
        (_a2 = inst._zod).deferred ?? (_a2.deferred = []);
        inst._zod.deferred?.push(() => {
          inst._zod.run = inst._zod.parse;
        });
      } else {
        const runChecks = /* @__PURE__ */ __name((payload, checks2, ctx) => {
          let isAborted = aborted(payload);
          let asyncResult;
          for (const ch of checks2) {
            if (ch._zod.def.when) {
              const shouldRun = ch._zod.def.when(payload);
              if (!shouldRun)
                continue;
            } else if (isAborted) {
              continue;
            }
            const currLen = payload.issues.length;
            const _ = ch._zod.check(payload);
            if (_ instanceof Promise && ctx?.async === false) {
              throw new $ZodAsyncError();
            }
            if (asyncResult || _ instanceof Promise) {
              asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
                await _;
                const nextLen = payload.issues.length;
                if (nextLen === currLen)
                  return;
                if (!isAborted)
                  isAborted = aborted(payload, currLen);
              });
            } else {
              const nextLen = payload.issues.length;
              if (nextLen === currLen)
                continue;
              if (!isAborted)
                isAborted = aborted(payload, currLen);
            }
          }
          if (asyncResult) {
            return asyncResult.then(() => {
              return payload;
            });
          }
          return payload;
        }, "runChecks");
        const handleCanaryResult = /* @__PURE__ */ __name((canary, payload, ctx) => {
          if (aborted(canary)) {
            canary.aborted = true;
            return canary;
          }
          const checkResult = runChecks(payload, checks, ctx);
          if (checkResult instanceof Promise) {
            if (ctx.async === false)
              throw new $ZodAsyncError();
            return checkResult.then((checkResult2) => inst._zod.parse(checkResult2, ctx));
          }
          return inst._zod.parse(checkResult, ctx);
        }, "handleCanaryResult");
        inst._zod.run = (payload, ctx) => {
          if (ctx.skipChecks) {
            return inst._zod.parse(payload, ctx);
          }
          if (ctx.direction === "backward") {
            const canary = inst._zod.parse({ value: payload.value, issues: [] }, { ...ctx, skipChecks: true });
            if (canary instanceof Promise) {
              return canary.then((canary2) => {
                return handleCanaryResult(canary2, payload, ctx);
              });
            }
            return handleCanaryResult(canary, payload, ctx);
          }
          const result = inst._zod.parse(payload, ctx);
          if (result instanceof Promise) {
            if (ctx.async === false)
              throw new $ZodAsyncError();
            return result.then((result2) => runChecks(result2, checks, ctx));
          }
          return runChecks(result, checks, ctx);
        };
      }
      defineLazy(inst, "~standard", () => ({
        validate: (value) => {
          try {
            const r = safeParse(inst, value);
            return r.success ? { value: r.data } : { issues: r.error?.issues };
          } catch (_) {
            return safeParseAsync(inst, value).then((r) => r.success ? { value: r.data } : { issues: r.error?.issues });
          }
        },
        vendor: "zod",
        version: 1
      }));
    });
    $ZodString = /* @__PURE__ */ $constructor("$ZodString", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.pattern = [...inst?._zod.bag?.patterns ?? []].pop() ?? string(inst._zod.bag);
      inst._zod.parse = (payload, _) => {
        if (def.coerce)
          try {
            payload.value = String(payload.value);
          } catch (_2) {
          }
        if (typeof payload.value === "string")
          return payload;
        payload.issues.push({
          expected: "string",
          code: "invalid_type",
          input: payload.value,
          inst
        });
        return payload;
      };
    });
    $ZodStringFormat = /* @__PURE__ */ $constructor("$ZodStringFormat", (inst, def) => {
      $ZodCheckStringFormat.init(inst, def);
      $ZodString.init(inst, def);
    });
    $ZodGUID = /* @__PURE__ */ $constructor("$ZodGUID", (inst, def) => {
      def.pattern ?? (def.pattern = guid);
      $ZodStringFormat.init(inst, def);
    });
    $ZodUUID = /* @__PURE__ */ $constructor("$ZodUUID", (inst, def) => {
      if (def.version) {
        const versionMap = {
          v1: 1,
          v2: 2,
          v3: 3,
          v4: 4,
          v5: 5,
          v6: 6,
          v7: 7,
          v8: 8
        };
        const v = versionMap[def.version];
        if (v === void 0)
          throw new Error(`Invalid UUID version: "${def.version}"`);
        def.pattern ?? (def.pattern = uuid(v));
      } else
        def.pattern ?? (def.pattern = uuid());
      $ZodStringFormat.init(inst, def);
    });
    $ZodEmail = /* @__PURE__ */ $constructor("$ZodEmail", (inst, def) => {
      def.pattern ?? (def.pattern = email);
      $ZodStringFormat.init(inst, def);
    });
    $ZodURL = /* @__PURE__ */ $constructor("$ZodURL", (inst, def) => {
      $ZodStringFormat.init(inst, def);
      inst._zod.check = (payload) => {
        try {
          const trimmed = payload.value.trim();
          const url2 = new URL(trimmed);
          if (def.hostname) {
            def.hostname.lastIndex = 0;
            if (!def.hostname.test(url2.hostname)) {
              payload.issues.push({
                code: "invalid_format",
                format: "url",
                note: "Invalid hostname",
                pattern: def.hostname.source,
                input: payload.value,
                inst,
                continue: !def.abort
              });
            }
          }
          if (def.protocol) {
            def.protocol.lastIndex = 0;
            if (!def.protocol.test(url2.protocol.endsWith(":") ? url2.protocol.slice(0, -1) : url2.protocol)) {
              payload.issues.push({
                code: "invalid_format",
                format: "url",
                note: "Invalid protocol",
                pattern: def.protocol.source,
                input: payload.value,
                inst,
                continue: !def.abort
              });
            }
          }
          if (def.normalize) {
            payload.value = url2.href;
          } else {
            payload.value = trimmed;
          }
          return;
        } catch (_) {
          payload.issues.push({
            code: "invalid_format",
            format: "url",
            input: payload.value,
            inst,
            continue: !def.abort
          });
        }
      };
    });
    $ZodEmoji = /* @__PURE__ */ $constructor("$ZodEmoji", (inst, def) => {
      def.pattern ?? (def.pattern = emoji());
      $ZodStringFormat.init(inst, def);
    });
    $ZodNanoID = /* @__PURE__ */ $constructor("$ZodNanoID", (inst, def) => {
      def.pattern ?? (def.pattern = nanoid);
      $ZodStringFormat.init(inst, def);
    });
    $ZodCUID = /* @__PURE__ */ $constructor("$ZodCUID", (inst, def) => {
      def.pattern ?? (def.pattern = cuid);
      $ZodStringFormat.init(inst, def);
    });
    $ZodCUID2 = /* @__PURE__ */ $constructor("$ZodCUID2", (inst, def) => {
      def.pattern ?? (def.pattern = cuid2);
      $ZodStringFormat.init(inst, def);
    });
    $ZodULID = /* @__PURE__ */ $constructor("$ZodULID", (inst, def) => {
      def.pattern ?? (def.pattern = ulid);
      $ZodStringFormat.init(inst, def);
    });
    $ZodXID = /* @__PURE__ */ $constructor("$ZodXID", (inst, def) => {
      def.pattern ?? (def.pattern = xid);
      $ZodStringFormat.init(inst, def);
    });
    $ZodKSUID = /* @__PURE__ */ $constructor("$ZodKSUID", (inst, def) => {
      def.pattern ?? (def.pattern = ksuid);
      $ZodStringFormat.init(inst, def);
    });
    $ZodISODateTime = /* @__PURE__ */ $constructor("$ZodISODateTime", (inst, def) => {
      def.pattern ?? (def.pattern = datetime(def));
      $ZodStringFormat.init(inst, def);
    });
    $ZodISODate = /* @__PURE__ */ $constructor("$ZodISODate", (inst, def) => {
      def.pattern ?? (def.pattern = date);
      $ZodStringFormat.init(inst, def);
    });
    $ZodISOTime = /* @__PURE__ */ $constructor("$ZodISOTime", (inst, def) => {
      def.pattern ?? (def.pattern = time3(def));
      $ZodStringFormat.init(inst, def);
    });
    $ZodISODuration = /* @__PURE__ */ $constructor("$ZodISODuration", (inst, def) => {
      def.pattern ?? (def.pattern = duration);
      $ZodStringFormat.init(inst, def);
    });
    $ZodIPv4 = /* @__PURE__ */ $constructor("$ZodIPv4", (inst, def) => {
      def.pattern ?? (def.pattern = ipv4);
      $ZodStringFormat.init(inst, def);
      inst._zod.bag.format = `ipv4`;
    });
    $ZodIPv6 = /* @__PURE__ */ $constructor("$ZodIPv6", (inst, def) => {
      def.pattern ?? (def.pattern = ipv6);
      $ZodStringFormat.init(inst, def);
      inst._zod.bag.format = `ipv6`;
      inst._zod.check = (payload) => {
        try {
          new URL(`http://[${payload.value}]`);
        } catch {
          payload.issues.push({
            code: "invalid_format",
            format: "ipv6",
            input: payload.value,
            inst,
            continue: !def.abort
          });
        }
      };
    });
    $ZodMAC = /* @__PURE__ */ $constructor("$ZodMAC", (inst, def) => {
      def.pattern ?? (def.pattern = mac(def.delimiter));
      $ZodStringFormat.init(inst, def);
      inst._zod.bag.format = `mac`;
    });
    $ZodCIDRv4 = /* @__PURE__ */ $constructor("$ZodCIDRv4", (inst, def) => {
      def.pattern ?? (def.pattern = cidrv4);
      $ZodStringFormat.init(inst, def);
    });
    $ZodCIDRv6 = /* @__PURE__ */ $constructor("$ZodCIDRv6", (inst, def) => {
      def.pattern ?? (def.pattern = cidrv6);
      $ZodStringFormat.init(inst, def);
      inst._zod.check = (payload) => {
        const parts = payload.value.split("/");
        try {
          if (parts.length !== 2)
            throw new Error();
          const [address, prefix] = parts;
          if (!prefix)
            throw new Error();
          const prefixNum = Number(prefix);
          if (`${prefixNum}` !== prefix)
            throw new Error();
          if (prefixNum < 0 || prefixNum > 128)
            throw new Error();
          new URL(`http://[${address}]`);
        } catch {
          payload.issues.push({
            code: "invalid_format",
            format: "cidrv6",
            input: payload.value,
            inst,
            continue: !def.abort
          });
        }
      };
    });
    __name(isValidBase64, "isValidBase64");
    $ZodBase64 = /* @__PURE__ */ $constructor("$ZodBase64", (inst, def) => {
      def.pattern ?? (def.pattern = base64);
      $ZodStringFormat.init(inst, def);
      inst._zod.bag.contentEncoding = "base64";
      inst._zod.check = (payload) => {
        if (isValidBase64(payload.value))
          return;
        payload.issues.push({
          code: "invalid_format",
          format: "base64",
          input: payload.value,
          inst,
          continue: !def.abort
        });
      };
    });
    __name(isValidBase64URL, "isValidBase64URL");
    $ZodBase64URL = /* @__PURE__ */ $constructor("$ZodBase64URL", (inst, def) => {
      def.pattern ?? (def.pattern = base64url);
      $ZodStringFormat.init(inst, def);
      inst._zod.bag.contentEncoding = "base64url";
      inst._zod.check = (payload) => {
        if (isValidBase64URL(payload.value))
          return;
        payload.issues.push({
          code: "invalid_format",
          format: "base64url",
          input: payload.value,
          inst,
          continue: !def.abort
        });
      };
    });
    $ZodE164 = /* @__PURE__ */ $constructor("$ZodE164", (inst, def) => {
      def.pattern ?? (def.pattern = e164);
      $ZodStringFormat.init(inst, def);
    });
    __name(isValidJWT, "isValidJWT");
    $ZodJWT = /* @__PURE__ */ $constructor("$ZodJWT", (inst, def) => {
      $ZodStringFormat.init(inst, def);
      inst._zod.check = (payload) => {
        if (isValidJWT(payload.value, def.alg))
          return;
        payload.issues.push({
          code: "invalid_format",
          format: "jwt",
          input: payload.value,
          inst,
          continue: !def.abort
        });
      };
    });
    $ZodCustomStringFormat = /* @__PURE__ */ $constructor("$ZodCustomStringFormat", (inst, def) => {
      $ZodStringFormat.init(inst, def);
      inst._zod.check = (payload) => {
        if (def.fn(payload.value))
          return;
        payload.issues.push({
          code: "invalid_format",
          format: def.format,
          input: payload.value,
          inst,
          continue: !def.abort
        });
      };
    });
    $ZodNumber = /* @__PURE__ */ $constructor("$ZodNumber", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.pattern = inst._zod.bag.pattern ?? number;
      inst._zod.parse = (payload, _ctx) => {
        if (def.coerce)
          try {
            payload.value = Number(payload.value);
          } catch (_) {
          }
        const input = payload.value;
        if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) {
          return payload;
        }
        const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? "Infinity" : void 0 : void 0;
        payload.issues.push({
          expected: "number",
          code: "invalid_type",
          input,
          inst,
          ...received ? { received } : {}
        });
        return payload;
      };
    });
    $ZodNumberFormat = /* @__PURE__ */ $constructor("$ZodNumberFormat", (inst, def) => {
      $ZodCheckNumberFormat.init(inst, def);
      $ZodNumber.init(inst, def);
    });
    $ZodBoolean = /* @__PURE__ */ $constructor("$ZodBoolean", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.pattern = boolean;
      inst._zod.parse = (payload, _ctx) => {
        if (def.coerce)
          try {
            payload.value = Boolean(payload.value);
          } catch (_) {
          }
        const input = payload.value;
        if (typeof input === "boolean")
          return payload;
        payload.issues.push({
          expected: "boolean",
          code: "invalid_type",
          input,
          inst
        });
        return payload;
      };
    });
    $ZodBigInt = /* @__PURE__ */ $constructor("$ZodBigInt", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.pattern = bigint2;
      inst._zod.parse = (payload, _ctx) => {
        if (def.coerce)
          try {
            payload.value = BigInt(payload.value);
          } catch (_) {
          }
        if (typeof payload.value === "bigint")
          return payload;
        payload.issues.push({
          expected: "bigint",
          code: "invalid_type",
          input: payload.value,
          inst
        });
        return payload;
      };
    });
    $ZodBigIntFormat = /* @__PURE__ */ $constructor("$ZodBigIntFormat", (inst, def) => {
      $ZodCheckBigIntFormat.init(inst, def);
      $ZodBigInt.init(inst, def);
    });
    $ZodSymbol = /* @__PURE__ */ $constructor("$ZodSymbol", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (typeof input === "symbol")
          return payload;
        payload.issues.push({
          expected: "symbol",
          code: "invalid_type",
          input,
          inst
        });
        return payload;
      };
    });
    $ZodUndefined = /* @__PURE__ */ $constructor("$ZodUndefined", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.pattern = _undefined;
      inst._zod.values = /* @__PURE__ */ new Set([void 0]);
      inst._zod.optin = "optional";
      inst._zod.optout = "optional";
      inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (typeof input === "undefined")
          return payload;
        payload.issues.push({
          expected: "undefined",
          code: "invalid_type",
          input,
          inst
        });
        return payload;
      };
    });
    $ZodNull = /* @__PURE__ */ $constructor("$ZodNull", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.pattern = _null;
      inst._zod.values = /* @__PURE__ */ new Set([null]);
      inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (input === null)
          return payload;
        payload.issues.push({
          expected: "null",
          code: "invalid_type",
          input,
          inst
        });
        return payload;
      };
    });
    $ZodAny = /* @__PURE__ */ $constructor("$ZodAny", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = (payload) => payload;
    });
    $ZodUnknown = /* @__PURE__ */ $constructor("$ZodUnknown", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = (payload) => payload;
    });
    $ZodNever = /* @__PURE__ */ $constructor("$ZodNever", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = (payload, _ctx) => {
        payload.issues.push({
          expected: "never",
          code: "invalid_type",
          input: payload.value,
          inst
        });
        return payload;
      };
    });
    $ZodVoid = /* @__PURE__ */ $constructor("$ZodVoid", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (typeof input === "undefined")
          return payload;
        payload.issues.push({
          expected: "void",
          code: "invalid_type",
          input,
          inst
        });
        return payload;
      };
    });
    $ZodDate = /* @__PURE__ */ $constructor("$ZodDate", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = (payload, _ctx) => {
        if (def.coerce) {
          try {
            payload.value = new Date(payload.value);
          } catch (_err) {
          }
        }
        const input = payload.value;
        const isDate = input instanceof Date;
        const isValidDate = isDate && !Number.isNaN(input.getTime());
        if (isValidDate)
          return payload;
        payload.issues.push({
          expected: "date",
          code: "invalid_type",
          input,
          ...isDate ? { received: "Invalid Date" } : {},
          inst
        });
        return payload;
      };
    });
    __name(handleArrayResult, "handleArrayResult");
    $ZodArray = /* @__PURE__ */ $constructor("$ZodArray", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        if (!Array.isArray(input)) {
          payload.issues.push({
            expected: "array",
            code: "invalid_type",
            input,
            inst
          });
          return payload;
        }
        payload.value = Array(input.length);
        const proms = [];
        for (let i = 0; i < input.length; i++) {
          const item = input[i];
          const result = def.element._zod.run({
            value: item,
            issues: []
          }, ctx);
          if (result instanceof Promise) {
            proms.push(result.then((result2) => handleArrayResult(result2, payload, i)));
          } else {
            handleArrayResult(result, payload, i);
          }
        }
        if (proms.length) {
          return Promise.all(proms).then(() => payload);
        }
        return payload;
      };
    });
    __name(handlePropertyResult, "handlePropertyResult");
    __name(normalizeDef, "normalizeDef");
    __name(handleCatchall, "handleCatchall");
    $ZodObject = /* @__PURE__ */ $constructor("$ZodObject", (inst, def) => {
      $ZodType.init(inst, def);
      const desc = Object.getOwnPropertyDescriptor(def, "shape");
      if (!desc?.get) {
        const sh = def.shape;
        Object.defineProperty(def, "shape", {
          get: () => {
            const newSh = { ...sh };
            Object.defineProperty(def, "shape", {
              value: newSh
            });
            return newSh;
          }
        });
      }
      const _normalized = cached(() => normalizeDef(def));
      defineLazy(inst._zod, "propValues", () => {
        const shape = def.shape;
        const propValues = {};
        for (const key in shape) {
          const field = shape[key]._zod;
          if (field.values) {
            propValues[key] ?? (propValues[key] = /* @__PURE__ */ new Set());
            for (const v of field.values)
              propValues[key].add(v);
          }
        }
        return propValues;
      });
      const isObject2 = isObject;
      const catchall = def.catchall;
      let value;
      inst._zod.parse = (payload, ctx) => {
        value ?? (value = _normalized.value);
        const input = payload.value;
        if (!isObject2(input)) {
          payload.issues.push({
            expected: "object",
            code: "invalid_type",
            input,
            inst
          });
          return payload;
        }
        payload.value = {};
        const proms = [];
        const shape = value.shape;
        for (const key of value.keys) {
          const el = shape[key];
          const isOptionalOut = el._zod.optout === "optional";
          const r = el._zod.run({ value: input[key], issues: [] }, ctx);
          if (r instanceof Promise) {
            proms.push(r.then((r2) => handlePropertyResult(r2, payload, key, input, isOptionalOut)));
          } else {
            handlePropertyResult(r, payload, key, input, isOptionalOut);
          }
        }
        if (!catchall) {
          return proms.length ? Promise.all(proms).then(() => payload) : payload;
        }
        return handleCatchall(proms, input, payload, ctx, _normalized.value, inst);
      };
    });
    $ZodObjectJIT = /* @__PURE__ */ $constructor("$ZodObjectJIT", (inst, def) => {
      $ZodObject.init(inst, def);
      const superParse = inst._zod.parse;
      const _normalized = cached(() => normalizeDef(def));
      const generateFastpass = /* @__PURE__ */ __name((shape) => {
        const doc = new Doc(["shape", "payload", "ctx"]);
        const normalized = _normalized.value;
        const parseStr = /* @__PURE__ */ __name((key) => {
          const k = esc(key);
          return `shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`;
        }, "parseStr");
        doc.write(`const input = payload.value;`);
        const ids = /* @__PURE__ */ Object.create(null);
        let counter = 0;
        for (const key of normalized.keys) {
          ids[key] = `key_${counter++}`;
        }
        doc.write(`const newResult = {};`);
        for (const key of normalized.keys) {
          const id = ids[key];
          const k = esc(key);
          const schema = shape[key];
          const isOptionalOut = schema?._zod?.optout === "optional";
          doc.write(`const ${id} = ${parseStr(key)};`);
          if (isOptionalOut) {
            doc.write(`
        if (${id}.issues.length) {
          if (${k} in input) {
            payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${k}, ...iss.path] : [${k}]
            })));
          }
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
          } else {
            doc.write(`
        if (${id}.issues.length) {
          payload.issues = payload.issues.concat(${id}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${k}, ...iss.path] : [${k}]
          })));
        }
        
        if (${id}.value === undefined) {
          if (${k} in input) {
            newResult[${k}] = undefined;
          }
        } else {
          newResult[${k}] = ${id}.value;
        }
        
      `);
          }
        }
        doc.write(`payload.value = newResult;`);
        doc.write(`return payload;`);
        const fn = doc.compile();
        return (payload, ctx) => fn(shape, payload, ctx);
      }, "generateFastpass");
      let fastpass;
      const isObject2 = isObject;
      const jit = !globalConfig.jitless;
      const allowsEval2 = allowsEval;
      const fastEnabled = jit && allowsEval2.value;
      const catchall = def.catchall;
      let value;
      inst._zod.parse = (payload, ctx) => {
        value ?? (value = _normalized.value);
        const input = payload.value;
        if (!isObject2(input)) {
          payload.issues.push({
            expected: "object",
            code: "invalid_type",
            input,
            inst
          });
          return payload;
        }
        if (jit && fastEnabled && ctx?.async === false && ctx.jitless !== true) {
          if (!fastpass)
            fastpass = generateFastpass(def.shape);
          payload = fastpass(payload, ctx);
          if (!catchall)
            return payload;
          return handleCatchall([], input, payload, ctx, value, inst);
        }
        return superParse(payload, ctx);
      };
    });
    __name(handleUnionResults, "handleUnionResults");
    $ZodUnion = /* @__PURE__ */ $constructor("$ZodUnion", (inst, def) => {
      $ZodType.init(inst, def);
      defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : void 0);
      defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : void 0);
      defineLazy(inst._zod, "values", () => {
        if (def.options.every((o) => o._zod.values)) {
          return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
        }
        return void 0;
      });
      defineLazy(inst._zod, "pattern", () => {
        if (def.options.every((o) => o._zod.pattern)) {
          const patterns = def.options.map((o) => o._zod.pattern);
          return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
        }
        return void 0;
      });
      const single = def.options.length === 1;
      const first2 = def.options[0]._zod.run;
      inst._zod.parse = (payload, ctx) => {
        if (single) {
          return first2(payload, ctx);
        }
        let async = false;
        const results = [];
        for (const option of def.options) {
          const result = option._zod.run({
            value: payload.value,
            issues: []
          }, ctx);
          if (result instanceof Promise) {
            results.push(result);
            async = true;
          } else {
            if (result.issues.length === 0)
              return result;
            results.push(result);
          }
        }
        if (!async)
          return handleUnionResults(results, payload, inst, ctx);
        return Promise.all(results).then((results2) => {
          return handleUnionResults(results2, payload, inst, ctx);
        });
      };
    });
    __name(handleExclusiveUnionResults, "handleExclusiveUnionResults");
    $ZodXor = /* @__PURE__ */ $constructor("$ZodXor", (inst, def) => {
      $ZodUnion.init(inst, def);
      def.inclusive = false;
      const single = def.options.length === 1;
      const first2 = def.options[0]._zod.run;
      inst._zod.parse = (payload, ctx) => {
        if (single) {
          return first2(payload, ctx);
        }
        let async = false;
        const results = [];
        for (const option of def.options) {
          const result = option._zod.run({
            value: payload.value,
            issues: []
          }, ctx);
          if (result instanceof Promise) {
            results.push(result);
            async = true;
          } else {
            results.push(result);
          }
        }
        if (!async)
          return handleExclusiveUnionResults(results, payload, inst, ctx);
        return Promise.all(results).then((results2) => {
          return handleExclusiveUnionResults(results2, payload, inst, ctx);
        });
      };
    });
    $ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("$ZodDiscriminatedUnion", (inst, def) => {
      def.inclusive = false;
      $ZodUnion.init(inst, def);
      const _super = inst._zod.parse;
      defineLazy(inst._zod, "propValues", () => {
        const propValues = {};
        for (const option of def.options) {
          const pv = option._zod.propValues;
          if (!pv || Object.keys(pv).length === 0)
            throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(option)}"`);
          for (const [k, v] of Object.entries(pv)) {
            if (!propValues[k])
              propValues[k] = /* @__PURE__ */ new Set();
            for (const val of v) {
              propValues[k].add(val);
            }
          }
        }
        return propValues;
      });
      const disc = cached(() => {
        const opts = def.options;
        const map2 = /* @__PURE__ */ new Map();
        for (const o of opts) {
          const values = o._zod.propValues?.[def.discriminator];
          if (!values || values.size === 0)
            throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(o)}"`);
          for (const v of values) {
            if (map2.has(v)) {
              throw new Error(`Duplicate discriminator value "${String(v)}"`);
            }
            map2.set(v, o);
          }
        }
        return map2;
      });
      inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        if (!isObject(input)) {
          payload.issues.push({
            code: "invalid_type",
            expected: "object",
            input,
            inst
          });
          return payload;
        }
        const opt = disc.value.get(input?.[def.discriminator]);
        if (opt) {
          return opt._zod.run(payload, ctx);
        }
        if (def.unionFallback) {
          return _super(payload, ctx);
        }
        payload.issues.push({
          code: "invalid_union",
          errors: [],
          note: "No matching discriminator",
          discriminator: def.discriminator,
          input,
          path: [def.discriminator],
          inst
        });
        return payload;
      };
    });
    $ZodIntersection = /* @__PURE__ */ $constructor("$ZodIntersection", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        const left = def.left._zod.run({ value: input, issues: [] }, ctx);
        const right = def.right._zod.run({ value: input, issues: [] }, ctx);
        const async = left instanceof Promise || right instanceof Promise;
        if (async) {
          return Promise.all([left, right]).then(([left2, right2]) => {
            return handleIntersectionResults(payload, left2, right2);
          });
        }
        return handleIntersectionResults(payload, left, right);
      };
    });
    __name(mergeValues, "mergeValues");
    __name(handleIntersectionResults, "handleIntersectionResults");
    $ZodTuple = /* @__PURE__ */ $constructor("$ZodTuple", (inst, def) => {
      $ZodType.init(inst, def);
      const items = def.items;
      inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        if (!Array.isArray(input)) {
          payload.issues.push({
            input,
            inst,
            expected: "tuple",
            code: "invalid_type"
          });
          return payload;
        }
        payload.value = [];
        const proms = [];
        const reversedIndex = [...items].reverse().findIndex((item) => item._zod.optin !== "optional");
        const optStart = reversedIndex === -1 ? 0 : items.length - reversedIndex;
        if (!def.rest) {
          const tooBig = input.length > items.length;
          const tooSmall = input.length < optStart - 1;
          if (tooBig || tooSmall) {
            payload.issues.push({
              ...tooBig ? { code: "too_big", maximum: items.length, inclusive: true } : { code: "too_small", minimum: items.length },
              input,
              inst,
              origin: "array"
            });
            return payload;
          }
        }
        let i = -1;
        for (const item of items) {
          i++;
          if (i >= input.length) {
            if (i >= optStart)
              continue;
          }
          const result = item._zod.run({
            value: input[i],
            issues: []
          }, ctx);
          if (result instanceof Promise) {
            proms.push(result.then((result2) => handleTupleResult(result2, payload, i)));
          } else {
            handleTupleResult(result, payload, i);
          }
        }
        if (def.rest) {
          const rest = input.slice(items.length);
          for (const el of rest) {
            i++;
            const result = def.rest._zod.run({
              value: el,
              issues: []
            }, ctx);
            if (result instanceof Promise) {
              proms.push(result.then((result2) => handleTupleResult(result2, payload, i)));
            } else {
              handleTupleResult(result, payload, i);
            }
          }
        }
        if (proms.length)
          return Promise.all(proms).then(() => payload);
        return payload;
      };
    });
    __name(handleTupleResult, "handleTupleResult");
    $ZodRecord = /* @__PURE__ */ $constructor("$ZodRecord", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        if (!isPlainObject(input)) {
          payload.issues.push({
            expected: "record",
            code: "invalid_type",
            input,
            inst
          });
          return payload;
        }
        const proms = [];
        const values = def.keyType._zod.values;
        if (values) {
          payload.value = {};
          const recordKeys = /* @__PURE__ */ new Set();
          for (const key of values) {
            if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
              recordKeys.add(typeof key === "number" ? key.toString() : key);
              const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
              if (result instanceof Promise) {
                proms.push(result.then((result2) => {
                  if (result2.issues.length) {
                    payload.issues.push(...prefixIssues(key, result2.issues));
                  }
                  payload.value[key] = result2.value;
                }));
              } else {
                if (result.issues.length) {
                  payload.issues.push(...prefixIssues(key, result.issues));
                }
                payload.value[key] = result.value;
              }
            }
          }
          let unrecognized;
          for (const key in input) {
            if (!recordKeys.has(key)) {
              unrecognized = unrecognized ?? [];
              unrecognized.push(key);
            }
          }
          if (unrecognized && unrecognized.length > 0) {
            payload.issues.push({
              code: "unrecognized_keys",
              input,
              inst,
              keys: unrecognized
            });
          }
        } else {
          payload.value = {};
          for (const key of Reflect.ownKeys(input)) {
            if (key === "__proto__")
              continue;
            let keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
            if (keyResult instanceof Promise) {
              throw new Error("Async schemas not supported in object keys currently");
            }
            const checkNumericKey = typeof key === "string" && number.test(key) && keyResult.issues.length;
            if (checkNumericKey) {
              const retryResult = def.keyType._zod.run({ value: Number(key), issues: [] }, ctx);
              if (retryResult instanceof Promise) {
                throw new Error("Async schemas not supported in object keys currently");
              }
              if (retryResult.issues.length === 0) {
                keyResult = retryResult;
              }
            }
            if (keyResult.issues.length) {
              if (def.mode === "loose") {
                payload.value[key] = input[key];
              } else {
                payload.issues.push({
                  code: "invalid_key",
                  origin: "record",
                  issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config2())),
                  input: key,
                  path: [key],
                  inst
                });
              }
              continue;
            }
            const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
            if (result instanceof Promise) {
              proms.push(result.then((result2) => {
                if (result2.issues.length) {
                  payload.issues.push(...prefixIssues(key, result2.issues));
                }
                payload.value[keyResult.value] = result2.value;
              }));
            } else {
              if (result.issues.length) {
                payload.issues.push(...prefixIssues(key, result.issues));
              }
              payload.value[keyResult.value] = result.value;
            }
          }
        }
        if (proms.length) {
          return Promise.all(proms).then(() => payload);
        }
        return payload;
      };
    });
    $ZodMap = /* @__PURE__ */ $constructor("$ZodMap", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        if (!(input instanceof Map)) {
          payload.issues.push({
            expected: "map",
            code: "invalid_type",
            input,
            inst
          });
          return payload;
        }
        const proms = [];
        payload.value = /* @__PURE__ */ new Map();
        for (const [key, value] of input) {
          const keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
          const valueResult = def.valueType._zod.run({ value, issues: [] }, ctx);
          if (keyResult instanceof Promise || valueResult instanceof Promise) {
            proms.push(Promise.all([keyResult, valueResult]).then(([keyResult2, valueResult2]) => {
              handleMapResult(keyResult2, valueResult2, payload, key, input, inst, ctx);
            }));
          } else {
            handleMapResult(keyResult, valueResult, payload, key, input, inst, ctx);
          }
        }
        if (proms.length)
          return Promise.all(proms).then(() => payload);
        return payload;
      };
    });
    __name(handleMapResult, "handleMapResult");
    $ZodSet = /* @__PURE__ */ $constructor("$ZodSet", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = (payload, ctx) => {
        const input = payload.value;
        if (!(input instanceof Set)) {
          payload.issues.push({
            input,
            inst,
            expected: "set",
            code: "invalid_type"
          });
          return payload;
        }
        const proms = [];
        payload.value = /* @__PURE__ */ new Set();
        for (const item of input) {
          const result = def.valueType._zod.run({ value: item, issues: [] }, ctx);
          if (result instanceof Promise) {
            proms.push(result.then((result2) => handleSetResult(result2, payload)));
          } else
            handleSetResult(result, payload);
        }
        if (proms.length)
          return Promise.all(proms).then(() => payload);
        return payload;
      };
    });
    __name(handleSetResult, "handleSetResult");
    $ZodEnum = /* @__PURE__ */ $constructor("$ZodEnum", (inst, def) => {
      $ZodType.init(inst, def);
      const values = getEnumValues(def.entries);
      const valuesSet = new Set(values);
      inst._zod.values = valuesSet;
      inst._zod.pattern = new RegExp(`^(${values.filter((k) => propertyKeyTypes.has(typeof k)).map((o) => typeof o === "string" ? escapeRegex(o) : o.toString()).join("|")})$`);
      inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (valuesSet.has(input)) {
          return payload;
        }
        payload.issues.push({
          code: "invalid_value",
          values,
          input,
          inst
        });
        return payload;
      };
    });
    $ZodLiteral = /* @__PURE__ */ $constructor("$ZodLiteral", (inst, def) => {
      $ZodType.init(inst, def);
      if (def.values.length === 0) {
        throw new Error("Cannot create literal schema with no valid values");
      }
      const values = new Set(def.values);
      inst._zod.values = values;
      inst._zod.pattern = new RegExp(`^(${def.values.map((o) => typeof o === "string" ? escapeRegex(o) : o ? escapeRegex(o.toString()) : String(o)).join("|")})$`);
      inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (values.has(input)) {
          return payload;
        }
        payload.issues.push({
          code: "invalid_value",
          values: def.values,
          input,
          inst
        });
        return payload;
      };
    });
    $ZodFile = /* @__PURE__ */ $constructor("$ZodFile", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = (payload, _ctx) => {
        const input = payload.value;
        if (input instanceof File)
          return payload;
        payload.issues.push({
          expected: "file",
          code: "invalid_type",
          input,
          inst
        });
        return payload;
      };
    });
    $ZodTransform = /* @__PURE__ */ $constructor("$ZodTransform", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
          throw new $ZodEncodeError(inst.constructor.name);
        }
        const _out = def.transform(payload.value, payload);
        if (ctx.async) {
          const output = _out instanceof Promise ? _out : Promise.resolve(_out);
          return output.then((output2) => {
            payload.value = output2;
            return payload;
          });
        }
        if (_out instanceof Promise) {
          throw new $ZodAsyncError();
        }
        payload.value = _out;
        return payload;
      };
    });
    __name(handleOptionalResult, "handleOptionalResult");
    $ZodOptional = /* @__PURE__ */ $constructor("$ZodOptional", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.optin = "optional";
      inst._zod.optout = "optional";
      defineLazy(inst._zod, "values", () => {
        return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, void 0]) : void 0;
      });
      defineLazy(inst._zod, "pattern", () => {
        const pattern = def.innerType._zod.pattern;
        return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : void 0;
      });
      inst._zod.parse = (payload, ctx) => {
        if (def.innerType._zod.optin === "optional") {
          const result = def.innerType._zod.run(payload, ctx);
          if (result instanceof Promise)
            return result.then((r) => handleOptionalResult(r, payload.value));
          return handleOptionalResult(result, payload.value);
        }
        if (payload.value === void 0) {
          return payload;
        }
        return def.innerType._zod.run(payload, ctx);
      };
    });
    $ZodExactOptional = /* @__PURE__ */ $constructor("$ZodExactOptional", (inst, def) => {
      $ZodOptional.init(inst, def);
      defineLazy(inst._zod, "values", () => def.innerType._zod.values);
      defineLazy(inst._zod, "pattern", () => def.innerType._zod.pattern);
      inst._zod.parse = (payload, ctx) => {
        return def.innerType._zod.run(payload, ctx);
      };
    });
    $ZodNullable = /* @__PURE__ */ $constructor("$ZodNullable", (inst, def) => {
      $ZodType.init(inst, def);
      defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
      defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
      defineLazy(inst._zod, "pattern", () => {
        const pattern = def.innerType._zod.pattern;
        return pattern ? new RegExp(`^(${cleanRegex(pattern.source)}|null)$`) : void 0;
      });
      defineLazy(inst._zod, "values", () => {
        return def.innerType._zod.values ? /* @__PURE__ */ new Set([...def.innerType._zod.values, null]) : void 0;
      });
      inst._zod.parse = (payload, ctx) => {
        if (payload.value === null)
          return payload;
        return def.innerType._zod.run(payload, ctx);
      };
    });
    $ZodDefault = /* @__PURE__ */ $constructor("$ZodDefault", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.optin = "optional";
      defineLazy(inst._zod, "values", () => def.innerType._zod.values);
      inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
          return def.innerType._zod.run(payload, ctx);
        }
        if (payload.value === void 0) {
          payload.value = def.defaultValue;
          return payload;
        }
        const result = def.innerType._zod.run(payload, ctx);
        if (result instanceof Promise) {
          return result.then((result2) => handleDefaultResult(result2, def));
        }
        return handleDefaultResult(result, def);
      };
    });
    __name(handleDefaultResult, "handleDefaultResult");
    $ZodPrefault = /* @__PURE__ */ $constructor("$ZodPrefault", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.optin = "optional";
      defineLazy(inst._zod, "values", () => def.innerType._zod.values);
      inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
          return def.innerType._zod.run(payload, ctx);
        }
        if (payload.value === void 0) {
          payload.value = def.defaultValue;
        }
        return def.innerType._zod.run(payload, ctx);
      };
    });
    $ZodNonOptional = /* @__PURE__ */ $constructor("$ZodNonOptional", (inst, def) => {
      $ZodType.init(inst, def);
      defineLazy(inst._zod, "values", () => {
        const v = def.innerType._zod.values;
        return v ? new Set([...v].filter((x) => x !== void 0)) : void 0;
      });
      inst._zod.parse = (payload, ctx) => {
        const result = def.innerType._zod.run(payload, ctx);
        if (result instanceof Promise) {
          return result.then((result2) => handleNonOptionalResult(result2, inst));
        }
        return handleNonOptionalResult(result, inst);
      };
    });
    __name(handleNonOptionalResult, "handleNonOptionalResult");
    $ZodSuccess = /* @__PURE__ */ $constructor("$ZodSuccess", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
          throw new $ZodEncodeError("ZodSuccess");
        }
        const result = def.innerType._zod.run(payload, ctx);
        if (result instanceof Promise) {
          return result.then((result2) => {
            payload.value = result2.issues.length === 0;
            return payload;
          });
        }
        payload.value = result.issues.length === 0;
        return payload;
      };
    });
    $ZodCatch = /* @__PURE__ */ $constructor("$ZodCatch", (inst, def) => {
      $ZodType.init(inst, def);
      defineLazy(inst._zod, "optin", () => def.innerType._zod.optin);
      defineLazy(inst._zod, "optout", () => def.innerType._zod.optout);
      defineLazy(inst._zod, "values", () => def.innerType._zod.values);
      inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
          return def.innerType._zod.run(payload, ctx);
        }
        const result = def.innerType._zod.run(payload, ctx);
        if (result instanceof Promise) {
          return result.then((result2) => {
            payload.value = result2.value;
            if (result2.issues.length) {
              payload.value = def.catchValue({
                ...payload,
                error: {
                  issues: result2.issues.map((iss) => finalizeIssue(iss, ctx, config2()))
                },
                input: payload.value
              });
              payload.issues = [];
            }
            return payload;
          });
        }
        payload.value = result.value;
        if (result.issues.length) {
          payload.value = def.catchValue({
            ...payload,
            error: {
              issues: result.issues.map((iss) => finalizeIssue(iss, ctx, config2()))
            },
            input: payload.value
          });
          payload.issues = [];
        }
        return payload;
      };
    });
    $ZodNaN = /* @__PURE__ */ $constructor("$ZodNaN", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = (payload, _ctx) => {
        if (typeof payload.value !== "number" || !Number.isNaN(payload.value)) {
          payload.issues.push({
            input: payload.value,
            inst,
            expected: "nan",
            code: "invalid_type"
          });
          return payload;
        }
        return payload;
      };
    });
    $ZodPipe = /* @__PURE__ */ $constructor("$ZodPipe", (inst, def) => {
      $ZodType.init(inst, def);
      defineLazy(inst._zod, "values", () => def.in._zod.values);
      defineLazy(inst._zod, "optin", () => def.in._zod.optin);
      defineLazy(inst._zod, "optout", () => def.out._zod.optout);
      defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
      inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
          const right = def.out._zod.run(payload, ctx);
          if (right instanceof Promise) {
            return right.then((right2) => handlePipeResult(right2, def.in, ctx));
          }
          return handlePipeResult(right, def.in, ctx);
        }
        const left = def.in._zod.run(payload, ctx);
        if (left instanceof Promise) {
          return left.then((left2) => handlePipeResult(left2, def.out, ctx));
        }
        return handlePipeResult(left, def.out, ctx);
      };
    });
    __name(handlePipeResult, "handlePipeResult");
    $ZodCodec = /* @__PURE__ */ $constructor("$ZodCodec", (inst, def) => {
      $ZodType.init(inst, def);
      defineLazy(inst._zod, "values", () => def.in._zod.values);
      defineLazy(inst._zod, "optin", () => def.in._zod.optin);
      defineLazy(inst._zod, "optout", () => def.out._zod.optout);
      defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
      inst._zod.parse = (payload, ctx) => {
        const direction = ctx.direction || "forward";
        if (direction === "forward") {
          const left = def.in._zod.run(payload, ctx);
          if (left instanceof Promise) {
            return left.then((left2) => handleCodecAResult(left2, def, ctx));
          }
          return handleCodecAResult(left, def, ctx);
        } else {
          const right = def.out._zod.run(payload, ctx);
          if (right instanceof Promise) {
            return right.then((right2) => handleCodecAResult(right2, def, ctx));
          }
          return handleCodecAResult(right, def, ctx);
        }
      };
    });
    __name(handleCodecAResult, "handleCodecAResult");
    __name(handleCodecTxResult, "handleCodecTxResult");
    $ZodReadonly = /* @__PURE__ */ $constructor("$ZodReadonly", (inst, def) => {
      $ZodType.init(inst, def);
      defineLazy(inst._zod, "propValues", () => def.innerType._zod.propValues);
      defineLazy(inst._zod, "values", () => def.innerType._zod.values);
      defineLazy(inst._zod, "optin", () => def.innerType?._zod?.optin);
      defineLazy(inst._zod, "optout", () => def.innerType?._zod?.optout);
      inst._zod.parse = (payload, ctx) => {
        if (ctx.direction === "backward") {
          return def.innerType._zod.run(payload, ctx);
        }
        const result = def.innerType._zod.run(payload, ctx);
        if (result instanceof Promise) {
          return result.then(handleReadonlyResult);
        }
        return handleReadonlyResult(result);
      };
    });
    __name(handleReadonlyResult, "handleReadonlyResult");
    $ZodTemplateLiteral = /* @__PURE__ */ $constructor("$ZodTemplateLiteral", (inst, def) => {
      $ZodType.init(inst, def);
      const regexParts = [];
      for (const part of def.parts) {
        if (typeof part === "object" && part !== null) {
          if (!part._zod.pattern) {
            throw new Error(`Invalid template literal part, no pattern found: ${[...part._zod.traits].shift()}`);
          }
          const source = part._zod.pattern instanceof RegExp ? part._zod.pattern.source : part._zod.pattern;
          if (!source)
            throw new Error(`Invalid template literal part: ${part._zod.traits}`);
          const start = source.startsWith("^") ? 1 : 0;
          const end = source.endsWith("$") ? source.length - 1 : source.length;
          regexParts.push(source.slice(start, end));
        } else if (part === null || primitiveTypes.has(typeof part)) {
          regexParts.push(escapeRegex(`${part}`));
        } else {
          throw new Error(`Invalid template literal part: ${part}`);
        }
      }
      inst._zod.pattern = new RegExp(`^${regexParts.join("")}$`);
      inst._zod.parse = (payload, _ctx) => {
        if (typeof payload.value !== "string") {
          payload.issues.push({
            input: payload.value,
            inst,
            expected: "string",
            code: "invalid_type"
          });
          return payload;
        }
        inst._zod.pattern.lastIndex = 0;
        if (!inst._zod.pattern.test(payload.value)) {
          payload.issues.push({
            input: payload.value,
            inst,
            code: "invalid_format",
            format: def.format ?? "template_literal",
            pattern: inst._zod.pattern.source
          });
          return payload;
        }
        return payload;
      };
    });
    $ZodFunction = /* @__PURE__ */ $constructor("$ZodFunction", (inst, def) => {
      $ZodType.init(inst, def);
      inst._def = def;
      inst._zod.def = def;
      inst.implement = (func) => {
        if (typeof func !== "function") {
          throw new Error("implement() must be called with a function");
        }
        return function(...args) {
          const parsedArgs = inst._def.input ? parse(inst._def.input, args) : args;
          const result = Reflect.apply(func, this, parsedArgs);
          if (inst._def.output) {
            return parse(inst._def.output, result);
          }
          return result;
        };
      };
      inst.implementAsync = (func) => {
        if (typeof func !== "function") {
          throw new Error("implementAsync() must be called with a function");
        }
        return async function(...args) {
          const parsedArgs = inst._def.input ? await parseAsync(inst._def.input, args) : args;
          const result = await Reflect.apply(func, this, parsedArgs);
          if (inst._def.output) {
            return await parseAsync(inst._def.output, result);
          }
          return result;
        };
      };
      inst._zod.parse = (payload, _ctx) => {
        if (typeof payload.value !== "function") {
          payload.issues.push({
            code: "invalid_type",
            expected: "function",
            input: payload.value,
            inst
          });
          return payload;
        }
        const hasPromiseOutput = inst._def.output && inst._def.output._zod.def.type === "promise";
        if (hasPromiseOutput) {
          payload.value = inst.implementAsync(payload.value);
        } else {
          payload.value = inst.implement(payload.value);
        }
        return payload;
      };
      inst.input = (...args) => {
        const F = inst.constructor;
        if (Array.isArray(args[0])) {
          return new F({
            type: "function",
            input: new $ZodTuple({
              type: "tuple",
              items: args[0],
              rest: args[1]
            }),
            output: inst._def.output
          });
        }
        return new F({
          type: "function",
          input: args[0],
          output: inst._def.output
        });
      };
      inst.output = (output) => {
        const F = inst.constructor;
        return new F({
          type: "function",
          input: inst._def.input,
          output
        });
      };
      return inst;
    });
    $ZodPromise = /* @__PURE__ */ $constructor("$ZodPromise", (inst, def) => {
      $ZodType.init(inst, def);
      inst._zod.parse = (payload, ctx) => {
        return Promise.resolve(payload.value).then((inner) => def.innerType._zod.run({ value: inner, issues: [] }, ctx));
      };
    });
    $ZodLazy = /* @__PURE__ */ $constructor("$ZodLazy", (inst, def) => {
      $ZodType.init(inst, def);
      defineLazy(inst._zod, "innerType", () => def.getter());
      defineLazy(inst._zod, "pattern", () => inst._zod.innerType?._zod?.pattern);
      defineLazy(inst._zod, "propValues", () => inst._zod.innerType?._zod?.propValues);
      defineLazy(inst._zod, "optin", () => inst._zod.innerType?._zod?.optin ?? void 0);
      defineLazy(inst._zod, "optout", () => inst._zod.innerType?._zod?.optout ?? void 0);
      inst._zod.parse = (payload, ctx) => {
        const inner = inst._zod.innerType;
        return inner._zod.run(payload, ctx);
      };
    });
    $ZodCustom = /* @__PURE__ */ $constructor("$ZodCustom", (inst, def) => {
      $ZodCheck.init(inst, def);
      $ZodType.init(inst, def);
      inst._zod.parse = (payload, _) => {
        return payload;
      };
      inst._zod.check = (payload) => {
        const input = payload.value;
        const r = def.fn(input);
        if (r instanceof Promise) {
          return r.then((r2) => handleRefineResult(r2, payload, input, inst));
        }
        handleRefineResult(r, payload, input, inst);
        return;
      };
    });
    __name(handleRefineResult, "handleRefineResult");
  }
});

// ../node_modules/zod/v4/locales/ar.js
function ar_default() {
  return {
    localeError: error3()
  };
}
var error3;
var init_ar = __esm({
  "../node_modules/zod/v4/locales/ar.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error3 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "\u062D\u0631\u0641", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" },
        file: { unit: "\u0628\u0627\u064A\u062A", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" },
        array: { unit: "\u0639\u0646\u0635\u0631", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" },
        set: { unit: "\u0639\u0646\u0635\u0631", verb: "\u0623\u0646 \u064A\u062D\u0648\u064A" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "\u0645\u062F\u062E\u0644",
        email: "\u0628\u0631\u064A\u062F \u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A",
        url: "\u0631\u0627\u0628\u0637",
        emoji: "\u0625\u064A\u0645\u0648\u062C\u064A",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "\u062A\u0627\u0631\u064A\u062E \u0648\u0648\u0642\u062A \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
        date: "\u062A\u0627\u0631\u064A\u062E \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
        time: "\u0648\u0642\u062A \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
        duration: "\u0645\u062F\u0629 \u0628\u0645\u0639\u064A\u0627\u0631 ISO",
        ipv4: "\u0639\u0646\u0648\u0627\u0646 IPv4",
        ipv6: "\u0639\u0646\u0648\u0627\u0646 IPv6",
        cidrv4: "\u0645\u062F\u0649 \u0639\u0646\u0627\u0648\u064A\u0646 \u0628\u0635\u064A\u063A\u0629 IPv4",
        cidrv6: "\u0645\u062F\u0649 \u0639\u0646\u0627\u0648\u064A\u0646 \u0628\u0635\u064A\u063A\u0629 IPv6",
        base64: "\u0646\u064E\u0635 \u0628\u062A\u0631\u0645\u064A\u0632 base64-encoded",
        base64url: "\u0646\u064E\u0635 \u0628\u062A\u0631\u0645\u064A\u0632 base64url-encoded",
        json_string: "\u0646\u064E\u0635 \u0639\u0644\u0649 \u0647\u064A\u0626\u0629 JSON",
        e164: "\u0631\u0642\u0645 \u0647\u0627\u062A\u0641 \u0628\u0645\u0639\u064A\u0627\u0631 E.164",
        jwt: "JWT",
        template_literal: "\u0645\u062F\u062E\u0644"
      };
      const TypeDictionary = {
        nan: "NaN"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 instanceof ${issue2.expected}\u060C \u0648\u0644\u0643\u0646 \u062A\u0645 \u0625\u062F\u062E\u0627\u0644 ${received}`;
            }
            return `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 ${expected}\u060C \u0648\u0644\u0643\u0646 \u062A\u0645 \u0625\u062F\u062E\u0627\u0644 ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `\u0645\u062F\u062E\u0644\u0627\u062A \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644\u0629: \u064A\u0641\u062A\u0631\u0636 \u0625\u062F\u062E\u0627\u0644 ${stringifyPrimitive(issue2.values[0])}`;
            return `\u0627\u062E\u062A\u064A\u0627\u0631 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062A\u0648\u0642\u0639 \u0627\u0646\u062A\u0642\u0627\u0621 \u0623\u062D\u062F \u0647\u0630\u0647 \u0627\u0644\u062E\u064A\u0627\u0631\u0627\u062A: ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return ` \u0623\u0643\u0628\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0623\u0646 \u062A\u0643\u0648\u0646 ${issue2.origin ?? "\u0627\u0644\u0642\u064A\u0645\u0629"} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "\u0639\u0646\u0635\u0631"}`;
            return `\u0623\u0643\u0628\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0623\u0646 \u062A\u0643\u0648\u0646 ${issue2.origin ?? "\u0627\u0644\u0642\u064A\u0645\u0629"} ${adj} ${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `\u0623\u0635\u063A\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0644\u0640 ${issue2.origin} \u0623\u0646 \u064A\u0643\u0648\u0646 ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
            }
            return `\u0623\u0635\u063A\u0631 \u0645\u0646 \u0627\u0644\u0644\u0627\u0632\u0645: \u064A\u0641\u062A\u0631\u0636 \u0644\u0640 ${issue2.origin} \u0623\u0646 \u064A\u0643\u0648\u0646 ${adj} ${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with")
              return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0628\u062F\u0623 \u0628\u0640 "${issue2.prefix}"`;
            if (_issue.format === "ends_with")
              return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0646\u062A\u0647\u064A \u0628\u0640 "${_issue.suffix}"`;
            if (_issue.format === "includes")
              return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u062A\u0636\u0645\u0651\u064E\u0646 "${_issue.includes}"`;
            if (_issue.format === "regex")
              return `\u0646\u064E\u0635 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0637\u0627\u0628\u0642 \u0627\u0644\u0646\u0645\u0637 ${_issue.pattern}`;
            return `${FormatDictionary[_issue.format] ?? issue2.format} \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644`;
          }
          case "not_multiple_of":
            return `\u0631\u0642\u0645 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644: \u064A\u062C\u0628 \u0623\u0646 \u064A\u0643\u0648\u0646 \u0645\u0646 \u0645\u0636\u0627\u0639\u0641\u0627\u062A ${issue2.divisor}`;
          case "unrecognized_keys":
            return `\u0645\u0639\u0631\u0641${issue2.keys.length > 1 ? "\u0627\u062A" : ""} \u063A\u0631\u064A\u0628${issue2.keys.length > 1 ? "\u0629" : ""}: ${joinValues(issue2.keys, "\u060C ")}`;
          case "invalid_key":
            return `\u0645\u0639\u0631\u0641 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644 \u0641\u064A ${issue2.origin}`;
          case "invalid_union":
            return "\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644";
          case "invalid_element":
            return `\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644 \u0641\u064A ${issue2.origin}`;
          default:
            return "\u0645\u062F\u062E\u0644 \u063A\u064A\u0631 \u0645\u0642\u0628\u0648\u0644";
        }
      };
    }, "error");
    __name(ar_default, "default");
  }
});

// ../node_modules/zod/v4/locales/az.js
function az_default() {
  return {
    localeError: error4()
  };
}
var error4;
var init_az = __esm({
  "../node_modules/zod/v4/locales/az.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error4 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "simvol", verb: "olmal\u0131d\u0131r" },
        file: { unit: "bayt", verb: "olmal\u0131d\u0131r" },
        array: { unit: "element", verb: "olmal\u0131d\u0131r" },
        set: { unit: "element", verb: "olmal\u0131d\u0131r" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "input",
        email: "email address",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO datetime",
        date: "ISO date",
        time: "ISO time",
        duration: "ISO duration",
        ipv4: "IPv4 address",
        ipv6: "IPv6 address",
        cidrv4: "IPv4 range",
        cidrv6: "IPv6 range",
        base64: "base64-encoded string",
        base64url: "base64url-encoded string",
        json_string: "JSON string",
        e164: "E.164 number",
        jwt: "JWT",
        template_literal: "input"
      };
      const TypeDictionary = {
        nan: "NaN"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n instanceof ${issue2.expected}, daxil olan ${received}`;
            }
            return `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n ${expected}, daxil olan ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `Yanl\u0131\u015F d\u0259y\u0259r: g\xF6zl\u0259nil\u0259n ${stringifyPrimitive(issue2.values[0])}`;
            return `Yanl\u0131\u015F se\xE7im: a\u015Fa\u011F\u0131dak\u0131lardan biri olmal\u0131d\u0131r: ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `\xC7ox b\xF6y\xFCk: g\xF6zl\u0259nil\u0259n ${issue2.origin ?? "d\u0259y\u0259r"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "element"}`;
            return `\xC7ox b\xF6y\xFCk: g\xF6zl\u0259nil\u0259n ${issue2.origin ?? "d\u0259y\u0259r"} ${adj}${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `\xC7ox ki\xE7ik: g\xF6zl\u0259nil\u0259n ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
            return `\xC7ox ki\xE7ik: g\xF6zl\u0259nil\u0259n ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with")
              return `Yanl\u0131\u015F m\u0259tn: "${_issue.prefix}" il\u0259 ba\u015Flamal\u0131d\u0131r`;
            if (_issue.format === "ends_with")
              return `Yanl\u0131\u015F m\u0259tn: "${_issue.suffix}" il\u0259 bitm\u0259lidir`;
            if (_issue.format === "includes")
              return `Yanl\u0131\u015F m\u0259tn: "${_issue.includes}" daxil olmal\u0131d\u0131r`;
            if (_issue.format === "regex")
              return `Yanl\u0131\u015F m\u0259tn: ${_issue.pattern} \u015Fablonuna uy\u011Fun olmal\u0131d\u0131r`;
            return `Yanl\u0131\u015F ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `Yanl\u0131\u015F \u0259d\u0259d: ${issue2.divisor} il\u0259 b\xF6l\xFCn\u0259 bil\u0259n olmal\u0131d\u0131r`;
          case "unrecognized_keys":
            return `Tan\u0131nmayan a\xE7ar${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `${issue2.origin} daxilind\u0259 yanl\u0131\u015F a\xE7ar`;
          case "invalid_union":
            return "Yanl\u0131\u015F d\u0259y\u0259r";
          case "invalid_element":
            return `${issue2.origin} daxilind\u0259 yanl\u0131\u015F d\u0259y\u0259r`;
          default:
            return `Yanl\u0131\u015F d\u0259y\u0259r`;
        }
      };
    }, "error");
    __name(az_default, "default");
  }
});

// ../node_modules/zod/v4/locales/be.js
function getBelarusianPlural(count3, one, few, many) {
  const absCount = Math.abs(count3);
  const lastDigit = absCount % 10;
  const lastTwoDigits = absCount % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return many;
  }
  if (lastDigit === 1) {
    return one;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return few;
  }
  return many;
}
function be_default() {
  return {
    localeError: error5()
  };
}
var error5;
var init_be = __esm({
  "../node_modules/zod/v4/locales/be.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    __name(getBelarusianPlural, "getBelarusianPlural");
    error5 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: {
          unit: {
            one: "\u0441\u0456\u043C\u0432\u0430\u043B",
            few: "\u0441\u0456\u043C\u0432\u0430\u043B\u044B",
            many: "\u0441\u0456\u043C\u0432\u0430\u043B\u0430\u045E"
          },
          verb: "\u043C\u0435\u0446\u044C"
        },
        array: {
          unit: {
            one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
            few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B",
            many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u045E"
          },
          verb: "\u043C\u0435\u0446\u044C"
        },
        set: {
          unit: {
            one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
            few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B",
            many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u045E"
          },
          verb: "\u043C\u0435\u0446\u044C"
        },
        file: {
          unit: {
            one: "\u0431\u0430\u0439\u0442",
            few: "\u0431\u0430\u0439\u0442\u044B",
            many: "\u0431\u0430\u0439\u0442\u0430\u045E"
          },
          verb: "\u043C\u0435\u0446\u044C"
        }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "\u0443\u0432\u043E\u0434",
        email: "email \u0430\u0434\u0440\u0430\u0441",
        url: "URL",
        emoji: "\u044D\u043C\u043E\u0434\u0437\u0456",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO \u0434\u0430\u0442\u0430 \u0456 \u0447\u0430\u0441",
        date: "ISO \u0434\u0430\u0442\u0430",
        time: "ISO \u0447\u0430\u0441",
        duration: "ISO \u043F\u0440\u0430\u0446\u044F\u0433\u043B\u0430\u0441\u0446\u044C",
        ipv4: "IPv4 \u0430\u0434\u0440\u0430\u0441",
        ipv6: "IPv6 \u0430\u0434\u0440\u0430\u0441",
        cidrv4: "IPv4 \u0434\u044B\u044F\u043F\u0430\u0437\u043E\u043D",
        cidrv6: "IPv6 \u0434\u044B\u044F\u043F\u0430\u0437\u043E\u043D",
        base64: "\u0440\u0430\u0434\u043E\u043A \u0443 \u0444\u0430\u0440\u043C\u0430\u0446\u0435 base64",
        base64url: "\u0440\u0430\u0434\u043E\u043A \u0443 \u0444\u0430\u0440\u043C\u0430\u0446\u0435 base64url",
        json_string: "JSON \u0440\u0430\u0434\u043E\u043A",
        e164: "\u043D\u0443\u043C\u0430\u0440 E.164",
        jwt: "JWT",
        template_literal: "\u0443\u0432\u043E\u0434"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "\u043B\u0456\u043A",
        array: "\u043C\u0430\u0441\u0456\u045E"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u045E\u0441\u044F instanceof ${issue2.expected}, \u0430\u0442\u0440\u044B\u043C\u0430\u043D\u0430 ${received}`;
            }
            return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u045E\u0441\u044F ${expected}, \u0430\u0442\u0440\u044B\u043C\u0430\u043D\u0430 ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F ${stringifyPrimitive(issue2.values[0])}`;
            return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0432\u0430\u0440\u044B\u044F\u043D\u0442: \u0447\u0430\u043A\u0430\u045E\u0441\u044F \u0430\u0434\u0437\u0456\u043D \u0437 ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              const maxValue = Number(issue2.maximum);
              const unit = getBelarusianPlural(maxValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
              return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u0432\u044F\u043B\u0456\u043A\u0456: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435"} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 ${sizing.verb} ${adj}${issue2.maximum.toString()} ${unit}`;
            }
            return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u0432\u044F\u043B\u0456\u043A\u0456: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435"} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 \u0431\u044B\u0446\u044C ${adj}${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              const minValue = Number(issue2.minimum);
              const unit = getBelarusianPlural(minValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
              return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u043C\u0430\u043B\u044B: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue2.origin} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 ${sizing.verb} ${adj}${issue2.minimum.toString()} ${unit}`;
            }
            return `\u0417\u0430\u043D\u0430\u0434\u0442\u0430 \u043C\u0430\u043B\u044B: \u0447\u0430\u043A\u0430\u043B\u0430\u0441\u044F, \u0448\u0442\u043E ${issue2.origin} \u043F\u0430\u0432\u0456\u043D\u043D\u0430 \u0431\u044B\u0446\u044C ${adj}${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with")
              return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u043F\u0430\u0447\u044B\u043D\u0430\u0446\u0446\u0430 \u0437 "${_issue.prefix}"`;
            if (_issue.format === "ends_with")
              return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0437\u0430\u043A\u0430\u043D\u0447\u0432\u0430\u0446\u0446\u0430 \u043D\u0430 "${_issue.suffix}"`;
            if (_issue.format === "includes")
              return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0437\u043C\u044F\u0448\u0447\u0430\u0446\u044C "${_issue.includes}"`;
            if (_issue.format === "regex")
              return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u0440\u0430\u0434\u043E\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0430\u0434\u043F\u0430\u0432\u044F\u0434\u0430\u0446\u044C \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${_issue.pattern}`;
            return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u043B\u0456\u043A: \u043F\u0430\u0432\u0456\u043D\u0435\u043D \u0431\u044B\u0446\u044C \u043A\u0440\u0430\u0442\u043D\u044B\u043C ${issue2.divisor}`;
          case "unrecognized_keys":
            return `\u041D\u0435\u0440\u0430\u0441\u043F\u0430\u0437\u043D\u0430\u043D\u044B ${issue2.keys.length > 1 ? "\u043A\u043B\u044E\u0447\u044B" : "\u043A\u043B\u044E\u0447"}: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u043A\u043B\u044E\u0447 \u0443 ${issue2.origin}`;
          case "invalid_union":
            return "\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434";
          case "invalid_element":
            return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u0430\u0435 \u0437\u043D\u0430\u0447\u044D\u043D\u043D\u0435 \u045E ${issue2.origin}`;
          default:
            return `\u041D\u044F\u043F\u0440\u0430\u0432\u0456\u043B\u044C\u043D\u044B \u045E\u0432\u043E\u0434`;
        }
      };
    }, "error");
    __name(be_default, "default");
  }
});

// ../node_modules/zod/v4/locales/bg.js
function bg_default() {
  return {
    localeError: error6()
  };
}
var error6;
var init_bg = __esm({
  "../node_modules/zod/v4/locales/bg.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error6 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "\u0441\u0438\u043C\u0432\u043E\u043B\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" },
        file: { unit: "\u0431\u0430\u0439\u0442\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" },
        array: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" },
        set: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430", verb: "\u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "\u0432\u0445\u043E\u0434",
        email: "\u0438\u043C\u0435\u0439\u043B \u0430\u0434\u0440\u0435\u0441",
        url: "URL",
        emoji: "\u0435\u043C\u043E\u0434\u0436\u0438",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO \u0432\u0440\u0435\u043C\u0435",
        date: "ISO \u0434\u0430\u0442\u0430",
        time: "ISO \u0432\u0440\u0435\u043C\u0435",
        duration: "ISO \u043F\u0440\u043E\u0434\u044A\u043B\u0436\u0438\u0442\u0435\u043B\u043D\u043E\u0441\u0442",
        ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441",
        ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441",
        cidrv4: "IPv4 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
        cidrv6: "IPv6 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
        base64: "base64-\u043A\u043E\u0434\u0438\u0440\u0430\u043D \u043D\u0438\u0437",
        base64url: "base64url-\u043A\u043E\u0434\u0438\u0440\u0430\u043D \u043D\u0438\u0437",
        json_string: "JSON \u043D\u0438\u0437",
        e164: "E.164 \u043D\u043E\u043C\u0435\u0440",
        jwt: "JWT",
        template_literal: "\u0432\u0445\u043E\u0434"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "\u0447\u0438\u0441\u043B\u043E",
        array: "\u043C\u0430\u0441\u0438\u0432"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434: \u043E\u0447\u0430\u043A\u0432\u0430\u043D instanceof ${issue2.expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D ${received}`;
            }
            return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434: \u043E\u0447\u0430\u043A\u0432\u0430\u043D ${expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434: \u043E\u0447\u0430\u043A\u0432\u0430\u043D ${stringifyPrimitive(issue2.values[0])}`;
            return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430 \u043E\u043F\u0446\u0438\u044F: \u043E\u0447\u0430\u043A\u0432\u0430\u043D\u043E \u0435\u0434\u043D\u043E \u043E\u0442 ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `\u0422\u0432\u044A\u0440\u0434\u0435 \u0433\u043E\u043B\u044F\u043C\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${issue2.origin ?? "\u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442"} \u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0430"}`;
            return `\u0422\u0432\u044A\u0440\u0434\u0435 \u0433\u043E\u043B\u044F\u043C\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${issue2.origin ?? "\u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442"} \u0434\u0430 \u0431\u044A\u0434\u0435 ${adj}${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `\u0422\u0432\u044A\u0440\u0434\u0435 \u043C\u0430\u043B\u043A\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${issue2.origin} \u0434\u0430 \u0441\u044A\u0434\u044A\u0440\u0436\u0430 ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
            }
            return `\u0422\u0432\u044A\u0440\u0434\u0435 \u043C\u0430\u043B\u043A\u043E: \u043E\u0447\u0430\u043A\u0432\u0430 \u0441\u0435 ${issue2.origin} \u0434\u0430 \u0431\u044A\u0434\u0435 ${adj}${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with") {
              return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0437\u0430\u043F\u043E\u0447\u0432\u0430 \u0441 "${_issue.prefix}"`;
            }
            if (_issue.format === "ends_with")
              return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0437\u0430\u0432\u044A\u0440\u0448\u0432\u0430 \u0441 "${_issue.suffix}"`;
            if (_issue.format === "includes")
              return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0432\u043A\u043B\u044E\u0447\u0432\u0430 "${_issue.includes}"`;
            if (_issue.format === "regex")
              return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043D\u0438\u0437: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0441\u044A\u0432\u043F\u0430\u0434\u0430 \u0441 ${_issue.pattern}`;
            let invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D";
            if (_issue.format === "emoji")
              invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E";
            if (_issue.format === "datetime")
              invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E";
            if (_issue.format === "date")
              invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430";
            if (_issue.format === "time")
              invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E";
            if (_issue.format === "duration")
              invalid_adj = "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430";
            return `${invalid_adj} ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E \u0447\u0438\u0441\u043B\u043E: \u0442\u0440\u044F\u0431\u0432\u0430 \u0434\u0430 \u0431\u044A\u0434\u0435 \u043A\u0440\u0430\u0442\u043D\u043E \u043D\u0430 ${issue2.divisor}`;
          case "unrecognized_keys":
            return `\u041D\u0435\u0440\u0430\u0437\u043F\u043E\u0437\u043D\u0430\u0442${issue2.keys.length > 1 ? "\u0438" : ""} \u043A\u043B\u044E\u0447${issue2.keys.length > 1 ? "\u043E\u0432\u0435" : ""}: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u043A\u043B\u044E\u0447 \u0432 ${issue2.origin}`;
          case "invalid_union":
            return "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434";
          case "invalid_element":
            return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u0430 \u0441\u0442\u043E\u0439\u043D\u043E\u0441\u0442 \u0432 ${issue2.origin}`;
          default:
            return `\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u0435\u043D \u0432\u0445\u043E\u0434`;
        }
      };
    }, "error");
    __name(bg_default, "default");
  }
});

// ../node_modules/zod/v4/locales/ca.js
function ca_default() {
  return {
    localeError: error7()
  };
}
var error7;
var init_ca = __esm({
  "../node_modules/zod/v4/locales/ca.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error7 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "car\xE0cters", verb: "contenir" },
        file: { unit: "bytes", verb: "contenir" },
        array: { unit: "elements", verb: "contenir" },
        set: { unit: "elements", verb: "contenir" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "entrada",
        email: "adre\xE7a electr\xF2nica",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "data i hora ISO",
        date: "data ISO",
        time: "hora ISO",
        duration: "durada ISO",
        ipv4: "adre\xE7a IPv4",
        ipv6: "adre\xE7a IPv6",
        cidrv4: "rang IPv4",
        cidrv6: "rang IPv6",
        base64: "cadena codificada en base64",
        base64url: "cadena codificada en base64url",
        json_string: "cadena JSON",
        e164: "n\xFAmero E.164",
        jwt: "JWT",
        template_literal: "entrada"
      };
      const TypeDictionary = {
        nan: "NaN"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `Tipus inv\xE0lid: s'esperava instanceof ${issue2.expected}, s'ha rebut ${received}`;
            }
            return `Tipus inv\xE0lid: s'esperava ${expected}, s'ha rebut ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `Valor inv\xE0lid: s'esperava ${stringifyPrimitive(issue2.values[0])}`;
            return `Opci\xF3 inv\xE0lida: s'esperava una de ${joinValues(issue2.values, " o ")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "com a m\xE0xim" : "menys de";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `Massa gran: s'esperava que ${issue2.origin ?? "el valor"} contingu\xE9s ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "elements"}`;
            return `Massa gran: s'esperava que ${issue2.origin ?? "el valor"} fos ${adj} ${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? "com a m\xEDnim" : "m\xE9s de";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `Massa petit: s'esperava que ${issue2.origin} contingu\xE9s ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
            }
            return `Massa petit: s'esperava que ${issue2.origin} fos ${adj} ${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with") {
              return `Format inv\xE0lid: ha de comen\xE7ar amb "${_issue.prefix}"`;
            }
            if (_issue.format === "ends_with")
              return `Format inv\xE0lid: ha d'acabar amb "${_issue.suffix}"`;
            if (_issue.format === "includes")
              return `Format inv\xE0lid: ha d'incloure "${_issue.includes}"`;
            if (_issue.format === "regex")
              return `Format inv\xE0lid: ha de coincidir amb el patr\xF3 ${_issue.pattern}`;
            return `Format inv\xE0lid per a ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `N\xFAmero inv\xE0lid: ha de ser m\xFAltiple de ${issue2.divisor}`;
          case "unrecognized_keys":
            return `Clau${issue2.keys.length > 1 ? "s" : ""} no reconeguda${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `Clau inv\xE0lida a ${issue2.origin}`;
          case "invalid_union":
            return "Entrada inv\xE0lida";
          case "invalid_element":
            return `Element inv\xE0lid a ${issue2.origin}`;
          default:
            return `Entrada inv\xE0lida`;
        }
      };
    }, "error");
    __name(ca_default, "default");
  }
});

// ../node_modules/zod/v4/locales/cs.js
function cs_default() {
  return {
    localeError: error8()
  };
}
var error8;
var init_cs = __esm({
  "../node_modules/zod/v4/locales/cs.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error8 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "znak\u016F", verb: "m\xEDt" },
        file: { unit: "bajt\u016F", verb: "m\xEDt" },
        array: { unit: "prvk\u016F", verb: "m\xEDt" },
        set: { unit: "prvk\u016F", verb: "m\xEDt" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "regul\xE1rn\xED v\xFDraz",
        email: "e-mailov\xE1 adresa",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "datum a \u010Das ve form\xE1tu ISO",
        date: "datum ve form\xE1tu ISO",
        time: "\u010Das ve form\xE1tu ISO",
        duration: "doba trv\xE1n\xED ISO",
        ipv4: "IPv4 adresa",
        ipv6: "IPv6 adresa",
        cidrv4: "rozsah IPv4",
        cidrv6: "rozsah IPv6",
        base64: "\u0159et\u011Bzec zak\xF3dovan\xFD ve form\xE1tu base64",
        base64url: "\u0159et\u011Bzec zak\xF3dovan\xFD ve form\xE1tu base64url",
        json_string: "\u0159et\u011Bzec ve form\xE1tu JSON",
        e164: "\u010D\xEDslo E.164",
        jwt: "JWT",
        template_literal: "vstup"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "\u010D\xEDslo",
        string: "\u0159et\u011Bzec",
        function: "funkce",
        array: "pole"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no instanceof ${issue2.expected}, obdr\u017Eeno ${received}`;
            }
            return `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no ${expected}, obdr\u017Eeno ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `Neplatn\xFD vstup: o\u010Dek\xE1v\xE1no ${stringifyPrimitive(issue2.values[0])}`;
            return `Neplatn\xE1 mo\u017Enost: o\u010Dek\xE1v\xE1na jedna z hodnot ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `Hodnota je p\u0159\xEDli\u0161 velk\xE1: ${issue2.origin ?? "hodnota"} mus\xED m\xEDt ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "prvk\u016F"}`;
            }
            return `Hodnota je p\u0159\xEDli\u0161 velk\xE1: ${issue2.origin ?? "hodnota"} mus\xED b\xFDt ${adj}${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `Hodnota je p\u0159\xEDli\u0161 mal\xE1: ${issue2.origin ?? "hodnota"} mus\xED m\xEDt ${adj}${issue2.minimum.toString()} ${sizing.unit ?? "prvk\u016F"}`;
            }
            return `Hodnota je p\u0159\xEDli\u0161 mal\xE1: ${issue2.origin ?? "hodnota"} mus\xED b\xFDt ${adj}${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with")
              return `Neplatn\xFD \u0159et\u011Bzec: mus\xED za\u010D\xEDnat na "${_issue.prefix}"`;
            if (_issue.format === "ends_with")
              return `Neplatn\xFD \u0159et\u011Bzec: mus\xED kon\u010Dit na "${_issue.suffix}"`;
            if (_issue.format === "includes")
              return `Neplatn\xFD \u0159et\u011Bzec: mus\xED obsahovat "${_issue.includes}"`;
            if (_issue.format === "regex")
              return `Neplatn\xFD \u0159et\u011Bzec: mus\xED odpov\xEDdat vzoru ${_issue.pattern}`;
            return `Neplatn\xFD form\xE1t ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `Neplatn\xE9 \u010D\xEDslo: mus\xED b\xFDt n\xE1sobkem ${issue2.divisor}`;
          case "unrecognized_keys":
            return `Nezn\xE1m\xE9 kl\xED\u010De: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `Neplatn\xFD kl\xED\u010D v ${issue2.origin}`;
          case "invalid_union":
            return "Neplatn\xFD vstup";
          case "invalid_element":
            return `Neplatn\xE1 hodnota v ${issue2.origin}`;
          default:
            return `Neplatn\xFD vstup`;
        }
      };
    }, "error");
    __name(cs_default, "default");
  }
});

// ../node_modules/zod/v4/locales/da.js
function da_default() {
  return {
    localeError: error9()
  };
}
var error9;
var init_da = __esm({
  "../node_modules/zod/v4/locales/da.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error9 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "tegn", verb: "havde" },
        file: { unit: "bytes", verb: "havde" },
        array: { unit: "elementer", verb: "indeholdt" },
        set: { unit: "elementer", verb: "indeholdt" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "input",
        email: "e-mailadresse",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO dato- og klokkesl\xE6t",
        date: "ISO-dato",
        time: "ISO-klokkesl\xE6t",
        duration: "ISO-varighed",
        ipv4: "IPv4-omr\xE5de",
        ipv6: "IPv6-omr\xE5de",
        cidrv4: "IPv4-spektrum",
        cidrv6: "IPv6-spektrum",
        base64: "base64-kodet streng",
        base64url: "base64url-kodet streng",
        json_string: "JSON-streng",
        e164: "E.164-nummer",
        jwt: "JWT",
        template_literal: "input"
      };
      const TypeDictionary = {
        nan: "NaN",
        string: "streng",
        number: "tal",
        boolean: "boolean",
        array: "liste",
        object: "objekt",
        set: "s\xE6t",
        file: "fil"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `Ugyldigt input: forventede instanceof ${issue2.expected}, fik ${received}`;
            }
            return `Ugyldigt input: forventede ${expected}, fik ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `Ugyldig v\xE6rdi: forventede ${stringifyPrimitive(issue2.values[0])}`;
            return `Ugyldigt valg: forventede en af f\xF8lgende ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
            if (sizing)
              return `For stor: forventede ${origin ?? "value"} ${sizing.verb} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "elementer"}`;
            return `For stor: forventede ${origin ?? "value"} havde ${adj} ${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
            if (sizing) {
              return `For lille: forventede ${origin} ${sizing.verb} ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
            }
            return `For lille: forventede ${origin} havde ${adj} ${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with")
              return `Ugyldig streng: skal starte med "${_issue.prefix}"`;
            if (_issue.format === "ends_with")
              return `Ugyldig streng: skal ende med "${_issue.suffix}"`;
            if (_issue.format === "includes")
              return `Ugyldig streng: skal indeholde "${_issue.includes}"`;
            if (_issue.format === "regex")
              return `Ugyldig streng: skal matche m\xF8nsteret ${_issue.pattern}`;
            return `Ugyldig ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `Ugyldigt tal: skal v\xE6re deleligt med ${issue2.divisor}`;
          case "unrecognized_keys":
            return `${issue2.keys.length > 1 ? "Ukendte n\xF8gler" : "Ukendt n\xF8gle"}: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `Ugyldig n\xF8gle i ${issue2.origin}`;
          case "invalid_union":
            return "Ugyldigt input: matcher ingen af de tilladte typer";
          case "invalid_element":
            return `Ugyldig v\xE6rdi i ${issue2.origin}`;
          default:
            return `Ugyldigt input`;
        }
      };
    }, "error");
    __name(da_default, "default");
  }
});

// ../node_modules/zod/v4/locales/de.js
function de_default() {
  return {
    localeError: error10()
  };
}
var error10;
var init_de = __esm({
  "../node_modules/zod/v4/locales/de.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error10 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "Zeichen", verb: "zu haben" },
        file: { unit: "Bytes", verb: "zu haben" },
        array: { unit: "Elemente", verb: "zu haben" },
        set: { unit: "Elemente", verb: "zu haben" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "Eingabe",
        email: "E-Mail-Adresse",
        url: "URL",
        emoji: "Emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO-Datum und -Uhrzeit",
        date: "ISO-Datum",
        time: "ISO-Uhrzeit",
        duration: "ISO-Dauer",
        ipv4: "IPv4-Adresse",
        ipv6: "IPv6-Adresse",
        cidrv4: "IPv4-Bereich",
        cidrv6: "IPv6-Bereich",
        base64: "Base64-codierter String",
        base64url: "Base64-URL-codierter String",
        json_string: "JSON-String",
        e164: "E.164-Nummer",
        jwt: "JWT",
        template_literal: "Eingabe"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "Zahl",
        array: "Array"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `Ung\xFCltige Eingabe: erwartet instanceof ${issue2.expected}, erhalten ${received}`;
            }
            return `Ung\xFCltige Eingabe: erwartet ${expected}, erhalten ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `Ung\xFCltige Eingabe: erwartet ${stringifyPrimitive(issue2.values[0])}`;
            return `Ung\xFCltige Option: erwartet eine von ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `Zu gro\xDF: erwartet, dass ${issue2.origin ?? "Wert"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "Elemente"} hat`;
            return `Zu gro\xDF: erwartet, dass ${issue2.origin ?? "Wert"} ${adj}${issue2.maximum.toString()} ist`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `Zu klein: erwartet, dass ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} hat`;
            }
            return `Zu klein: erwartet, dass ${issue2.origin} ${adj}${issue2.minimum.toString()} ist`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with")
              return `Ung\xFCltiger String: muss mit "${_issue.prefix}" beginnen`;
            if (_issue.format === "ends_with")
              return `Ung\xFCltiger String: muss mit "${_issue.suffix}" enden`;
            if (_issue.format === "includes")
              return `Ung\xFCltiger String: muss "${_issue.includes}" enthalten`;
            if (_issue.format === "regex")
              return `Ung\xFCltiger String: muss dem Muster ${_issue.pattern} entsprechen`;
            return `Ung\xFCltig: ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `Ung\xFCltige Zahl: muss ein Vielfaches von ${issue2.divisor} sein`;
          case "unrecognized_keys":
            return `${issue2.keys.length > 1 ? "Unbekannte Schl\xFCssel" : "Unbekannter Schl\xFCssel"}: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `Ung\xFCltiger Schl\xFCssel in ${issue2.origin}`;
          case "invalid_union":
            return "Ung\xFCltige Eingabe";
          case "invalid_element":
            return `Ung\xFCltiger Wert in ${issue2.origin}`;
          default:
            return `Ung\xFCltige Eingabe`;
        }
      };
    }, "error");
    __name(de_default, "default");
  }
});

// ../node_modules/zod/v4/locales/en.js
function en_default() {
  return {
    localeError: error11()
  };
}
var error11;
var init_en = __esm({
  "../node_modules/zod/v4/locales/en.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error11 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "characters", verb: "to have" },
        file: { unit: "bytes", verb: "to have" },
        array: { unit: "items", verb: "to have" },
        set: { unit: "items", verb: "to have" },
        map: { unit: "entries", verb: "to have" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "input",
        email: "email address",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO datetime",
        date: "ISO date",
        time: "ISO time",
        duration: "ISO duration",
        ipv4: "IPv4 address",
        ipv6: "IPv6 address",
        mac: "MAC address",
        cidrv4: "IPv4 range",
        cidrv6: "IPv6 range",
        base64: "base64-encoded string",
        base64url: "base64url-encoded string",
        json_string: "JSON string",
        e164: "E.164 number",
        jwt: "JWT",
        template_literal: "input"
      };
      const TypeDictionary = {
        // Compatibility: "nan" -> "NaN" for display
        nan: "NaN"
        // All other type names omitted - they fall back to raw values via ?? operator
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            return `Invalid input: expected ${expected}, received ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `Invalid input: expected ${stringifyPrimitive(issue2.values[0])}`;
            return `Invalid option: expected one of ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `Too big: expected ${issue2.origin ?? "value"} to have ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elements"}`;
            return `Too big: expected ${issue2.origin ?? "value"} to be ${adj}${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `Too small: expected ${issue2.origin} to have ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
            }
            return `Too small: expected ${issue2.origin} to be ${adj}${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with") {
              return `Invalid string: must start with "${_issue.prefix}"`;
            }
            if (_issue.format === "ends_with")
              return `Invalid string: must end with "${_issue.suffix}"`;
            if (_issue.format === "includes")
              return `Invalid string: must include "${_issue.includes}"`;
            if (_issue.format === "regex")
              return `Invalid string: must match pattern ${_issue.pattern}`;
            return `Invalid ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `Invalid number: must be a multiple of ${issue2.divisor}`;
          case "unrecognized_keys":
            return `Unrecognized key${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `Invalid key in ${issue2.origin}`;
          case "invalid_union":
            return "Invalid input";
          case "invalid_element":
            return `Invalid value in ${issue2.origin}`;
          default:
            return `Invalid input`;
        }
      };
    }, "error");
    __name(en_default, "default");
  }
});

// ../node_modules/zod/v4/locales/eo.js
function eo_default() {
  return {
    localeError: error12()
  };
}
var error12;
var init_eo = __esm({
  "../node_modules/zod/v4/locales/eo.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error12 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "karaktrojn", verb: "havi" },
        file: { unit: "bajtojn", verb: "havi" },
        array: { unit: "elementojn", verb: "havi" },
        set: { unit: "elementojn", verb: "havi" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "enigo",
        email: "retadreso",
        url: "URL",
        emoji: "emo\u011Dio",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO-datotempo",
        date: "ISO-dato",
        time: "ISO-tempo",
        duration: "ISO-da\u016Dro",
        ipv4: "IPv4-adreso",
        ipv6: "IPv6-adreso",
        cidrv4: "IPv4-rango",
        cidrv6: "IPv6-rango",
        base64: "64-ume kodita karaktraro",
        base64url: "URL-64-ume kodita karaktraro",
        json_string: "JSON-karaktraro",
        e164: "E.164-nombro",
        jwt: "JWT",
        template_literal: "enigo"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "nombro",
        array: "tabelo",
        null: "senvalora"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `Nevalida enigo: atendi\u011Dis instanceof ${issue2.expected}, ricevi\u011Dis ${received}`;
            }
            return `Nevalida enigo: atendi\u011Dis ${expected}, ricevi\u011Dis ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `Nevalida enigo: atendi\u011Dis ${stringifyPrimitive(issue2.values[0])}`;
            return `Nevalida opcio: atendi\u011Dis unu el ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `Tro granda: atendi\u011Dis ke ${issue2.origin ?? "valoro"} havu ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementojn"}`;
            return `Tro granda: atendi\u011Dis ke ${issue2.origin ?? "valoro"} havu ${adj}${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `Tro malgranda: atendi\u011Dis ke ${issue2.origin} havu ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
            }
            return `Tro malgranda: atendi\u011Dis ke ${issue2.origin} estu ${adj}${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with")
              return `Nevalida karaktraro: devas komenci\u011Di per "${_issue.prefix}"`;
            if (_issue.format === "ends_with")
              return `Nevalida karaktraro: devas fini\u011Di per "${_issue.suffix}"`;
            if (_issue.format === "includes")
              return `Nevalida karaktraro: devas inkluzivi "${_issue.includes}"`;
            if (_issue.format === "regex")
              return `Nevalida karaktraro: devas kongrui kun la modelo ${_issue.pattern}`;
            return `Nevalida ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `Nevalida nombro: devas esti oblo de ${issue2.divisor}`;
          case "unrecognized_keys":
            return `Nekonata${issue2.keys.length > 1 ? "j" : ""} \u015Dlosilo${issue2.keys.length > 1 ? "j" : ""}: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `Nevalida \u015Dlosilo en ${issue2.origin}`;
          case "invalid_union":
            return "Nevalida enigo";
          case "invalid_element":
            return `Nevalida valoro en ${issue2.origin}`;
          default:
            return `Nevalida enigo`;
        }
      };
    }, "error");
    __name(eo_default, "default");
  }
});

// ../node_modules/zod/v4/locales/es.js
function es_default() {
  return {
    localeError: error13()
  };
}
var error13;
var init_es = __esm({
  "../node_modules/zod/v4/locales/es.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error13 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "caracteres", verb: "tener" },
        file: { unit: "bytes", verb: "tener" },
        array: { unit: "elementos", verb: "tener" },
        set: { unit: "elementos", verb: "tener" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "entrada",
        email: "direcci\xF3n de correo electr\xF3nico",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "fecha y hora ISO",
        date: "fecha ISO",
        time: "hora ISO",
        duration: "duraci\xF3n ISO",
        ipv4: "direcci\xF3n IPv4",
        ipv6: "direcci\xF3n IPv6",
        cidrv4: "rango IPv4",
        cidrv6: "rango IPv6",
        base64: "cadena codificada en base64",
        base64url: "URL codificada en base64",
        json_string: "cadena JSON",
        e164: "n\xFAmero E.164",
        jwt: "JWT",
        template_literal: "entrada"
      };
      const TypeDictionary = {
        nan: "NaN",
        string: "texto",
        number: "n\xFAmero",
        boolean: "booleano",
        array: "arreglo",
        object: "objeto",
        set: "conjunto",
        file: "archivo",
        date: "fecha",
        bigint: "n\xFAmero grande",
        symbol: "s\xEDmbolo",
        undefined: "indefinido",
        null: "nulo",
        function: "funci\xF3n",
        map: "mapa",
        record: "registro",
        tuple: "tupla",
        enum: "enumeraci\xF3n",
        union: "uni\xF3n",
        literal: "literal",
        promise: "promesa",
        void: "vac\xEDo",
        never: "nunca",
        unknown: "desconocido",
        any: "cualquiera"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `Entrada inv\xE1lida: se esperaba instanceof ${issue2.expected}, recibido ${received}`;
            }
            return `Entrada inv\xE1lida: se esperaba ${expected}, recibido ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `Entrada inv\xE1lida: se esperaba ${stringifyPrimitive(issue2.values[0])}`;
            return `Opci\xF3n inv\xE1lida: se esperaba una de ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
            if (sizing)
              return `Demasiado grande: se esperaba que ${origin ?? "valor"} tuviera ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementos"}`;
            return `Demasiado grande: se esperaba que ${origin ?? "valor"} fuera ${adj}${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
            if (sizing) {
              return `Demasiado peque\xF1o: se esperaba que ${origin} tuviera ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
            }
            return `Demasiado peque\xF1o: se esperaba que ${origin} fuera ${adj}${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with")
              return `Cadena inv\xE1lida: debe comenzar con "${_issue.prefix}"`;
            if (_issue.format === "ends_with")
              return `Cadena inv\xE1lida: debe terminar en "${_issue.suffix}"`;
            if (_issue.format === "includes")
              return `Cadena inv\xE1lida: debe incluir "${_issue.includes}"`;
            if (_issue.format === "regex")
              return `Cadena inv\xE1lida: debe coincidir con el patr\xF3n ${_issue.pattern}`;
            return `Inv\xE1lido ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `N\xFAmero inv\xE1lido: debe ser m\xFAltiplo de ${issue2.divisor}`;
          case "unrecognized_keys":
            return `Llave${issue2.keys.length > 1 ? "s" : ""} desconocida${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `Llave inv\xE1lida en ${TypeDictionary[issue2.origin] ?? issue2.origin}`;
          case "invalid_union":
            return "Entrada inv\xE1lida";
          case "invalid_element":
            return `Valor inv\xE1lido en ${TypeDictionary[issue2.origin] ?? issue2.origin}`;
          default:
            return `Entrada inv\xE1lida`;
        }
      };
    }, "error");
    __name(es_default, "default");
  }
});

// ../node_modules/zod/v4/locales/fa.js
function fa_default() {
  return {
    localeError: error14()
  };
}
var error14;
var init_fa = __esm({
  "../node_modules/zod/v4/locales/fa.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error14 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "\u06A9\u0627\u0631\u0627\u06A9\u062A\u0631", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" },
        file: { unit: "\u0628\u0627\u06CC\u062A", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" },
        array: { unit: "\u0622\u06CC\u062A\u0645", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" },
        set: { unit: "\u0622\u06CC\u062A\u0645", verb: "\u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "\u0648\u0631\u0648\u062F\u06CC",
        email: "\u0622\u062F\u0631\u0633 \u0627\u06CC\u0645\u06CC\u0644",
        url: "URL",
        emoji: "\u0627\u06CC\u0645\u0648\u062C\u06CC",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "\u062A\u0627\u0631\u06CC\u062E \u0648 \u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648",
        date: "\u062A\u0627\u0631\u06CC\u062E \u0627\u06CC\u0632\u0648",
        time: "\u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648",
        duration: "\u0645\u062F\u062A \u0632\u0645\u0627\u0646 \u0627\u06CC\u0632\u0648",
        ipv4: "IPv4 \u0622\u062F\u0631\u0633",
        ipv6: "IPv6 \u0622\u062F\u0631\u0633",
        cidrv4: "IPv4 \u062F\u0627\u0645\u0646\u0647",
        cidrv6: "IPv6 \u062F\u0627\u0645\u0646\u0647",
        base64: "base64-encoded \u0631\u0634\u062A\u0647",
        base64url: "base64url-encoded \u0631\u0634\u062A\u0647",
        json_string: "JSON \u0631\u0634\u062A\u0647",
        e164: "E.164 \u0639\u062F\u062F",
        jwt: "JWT",
        template_literal: "\u0648\u0631\u0648\u062F\u06CC"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "\u0639\u062F\u062F",
        array: "\u0622\u0631\u0627\u06CC\u0647"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A instanceof ${issue2.expected} \u0645\u06CC\u200C\u0628\u0648\u062F\u060C ${received} \u062F\u0631\u06CC\u0627\u0641\u062A \u0634\u062F`;
            }
            return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A ${expected} \u0645\u06CC\u200C\u0628\u0648\u062F\u060C ${received} \u062F\u0631\u06CC\u0627\u0641\u062A \u0634\u062F`;
          }
          case "invalid_value":
            if (issue2.values.length === 1) {
              return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A ${stringifyPrimitive(issue2.values[0])} \u0645\u06CC\u200C\u0628\u0648\u062F`;
            }
            return `\u06AF\u0632\u06CC\u0646\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0645\u06CC\u200C\u0628\u0627\u06CC\u0633\u062A \u06CC\u06A9\u06CC \u0627\u0632 ${joinValues(issue2.values, "|")} \u0645\u06CC\u200C\u0628\u0648\u062F`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `\u062E\u06CC\u0644\u06CC \u0628\u0632\u0631\u06AF: ${issue2.origin ?? "\u0645\u0642\u062F\u0627\u0631"} \u0628\u0627\u06CC\u062F ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0639\u0646\u0635\u0631"} \u0628\u0627\u0634\u062F`;
            }
            return `\u062E\u06CC\u0644\u06CC \u0628\u0632\u0631\u06AF: ${issue2.origin ?? "\u0645\u0642\u062F\u0627\u0631"} \u0628\u0627\u06CC\u062F ${adj}${issue2.maximum.toString()} \u0628\u0627\u0634\u062F`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `\u062E\u06CC\u0644\u06CC \u06A9\u0648\u0686\u06A9: ${issue2.origin} \u0628\u0627\u06CC\u062F ${adj}${issue2.minimum.toString()} ${sizing.unit} \u0628\u0627\u0634\u062F`;
            }
            return `\u062E\u06CC\u0644\u06CC \u06A9\u0648\u0686\u06A9: ${issue2.origin} \u0628\u0627\u06CC\u062F ${adj}${issue2.minimum.toString()} \u0628\u0627\u0634\u062F`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with") {
              return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 "${_issue.prefix}" \u0634\u0631\u0648\u0639 \u0634\u0648\u062F`;
            }
            if (_issue.format === "ends_with") {
              return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 "${_issue.suffix}" \u062A\u0645\u0627\u0645 \u0634\u0648\u062F`;
            }
            if (_issue.format === "includes") {
              return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0634\u0627\u0645\u0644 "${_issue.includes}" \u0628\u0627\u0634\u062F`;
            }
            if (_issue.format === "regex") {
              return `\u0631\u0634\u062A\u0647 \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0628\u0627 \u0627\u0644\u06AF\u0648\u06CC ${_issue.pattern} \u0645\u0637\u0627\u0628\u0642\u062A \u062F\u0627\u0634\u062A\u0647 \u0628\u0627\u0634\u062F`;
            }
            return `${FormatDictionary[_issue.format] ?? issue2.format} \u0646\u0627\u0645\u0639\u062A\u0628\u0631`;
          }
          case "not_multiple_of":
            return `\u0639\u062F\u062F \u0646\u0627\u0645\u0639\u062A\u0628\u0631: \u0628\u0627\u06CC\u062F \u0645\u0636\u0631\u0628 ${issue2.divisor} \u0628\u0627\u0634\u062F`;
          case "unrecognized_keys":
            return `\u06A9\u0644\u06CC\u062F${issue2.keys.length > 1 ? "\u0647\u0627\u06CC" : ""} \u0646\u0627\u0634\u0646\u0627\u0633: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `\u06A9\u0644\u06CC\u062F \u0646\u0627\u0634\u0646\u0627\u0633 \u062F\u0631 ${issue2.origin}`;
          case "invalid_union":
            return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631`;
          case "invalid_element":
            return `\u0645\u0642\u062F\u0627\u0631 \u0646\u0627\u0645\u0639\u062A\u0628\u0631 \u062F\u0631 ${issue2.origin}`;
          default:
            return `\u0648\u0631\u0648\u062F\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631`;
        }
      };
    }, "error");
    __name(fa_default, "default");
  }
});

// ../node_modules/zod/v4/locales/fi.js
function fi_default() {
  return {
    localeError: error15()
  };
}
var error15;
var init_fi = __esm({
  "../node_modules/zod/v4/locales/fi.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error15 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "merkki\xE4", subject: "merkkijonon" },
        file: { unit: "tavua", subject: "tiedoston" },
        array: { unit: "alkiota", subject: "listan" },
        set: { unit: "alkiota", subject: "joukon" },
        number: { unit: "", subject: "luvun" },
        bigint: { unit: "", subject: "suuren kokonaisluvun" },
        int: { unit: "", subject: "kokonaisluvun" },
        date: { unit: "", subject: "p\xE4iv\xE4m\xE4\xE4r\xE4n" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "s\xE4\xE4nn\xF6llinen lauseke",
        email: "s\xE4hk\xF6postiosoite",
        url: "URL-osoite",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO-aikaleima",
        date: "ISO-p\xE4iv\xE4m\xE4\xE4r\xE4",
        time: "ISO-aika",
        duration: "ISO-kesto",
        ipv4: "IPv4-osoite",
        ipv6: "IPv6-osoite",
        cidrv4: "IPv4-alue",
        cidrv6: "IPv6-alue",
        base64: "base64-koodattu merkkijono",
        base64url: "base64url-koodattu merkkijono",
        json_string: "JSON-merkkijono",
        e164: "E.164-luku",
        jwt: "JWT",
        template_literal: "templaattimerkkijono"
      };
      const TypeDictionary = {
        nan: "NaN"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `Virheellinen tyyppi: odotettiin instanceof ${issue2.expected}, oli ${received}`;
            }
            return `Virheellinen tyyppi: odotettiin ${expected}, oli ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `Virheellinen sy\xF6te: t\xE4ytyy olla ${stringifyPrimitive(issue2.values[0])}`;
            return `Virheellinen valinta: t\xE4ytyy olla yksi seuraavista: ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `Liian suuri: ${sizing.subject} t\xE4ytyy olla ${adj}${issue2.maximum.toString()} ${sizing.unit}`.trim();
            }
            return `Liian suuri: arvon t\xE4ytyy olla ${adj}${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `Liian pieni: ${sizing.subject} t\xE4ytyy olla ${adj}${issue2.minimum.toString()} ${sizing.unit}`.trim();
            }
            return `Liian pieni: arvon t\xE4ytyy olla ${adj}${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with")
              return `Virheellinen sy\xF6te: t\xE4ytyy alkaa "${_issue.prefix}"`;
            if (_issue.format === "ends_with")
              return `Virheellinen sy\xF6te: t\xE4ytyy loppua "${_issue.suffix}"`;
            if (_issue.format === "includes")
              return `Virheellinen sy\xF6te: t\xE4ytyy sis\xE4lt\xE4\xE4 "${_issue.includes}"`;
            if (_issue.format === "regex") {
              return `Virheellinen sy\xF6te: t\xE4ytyy vastata s\xE4\xE4nn\xF6llist\xE4 lauseketta ${_issue.pattern}`;
            }
            return `Virheellinen ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `Virheellinen luku: t\xE4ytyy olla luvun ${issue2.divisor} monikerta`;
          case "unrecognized_keys":
            return `${issue2.keys.length > 1 ? "Tuntemattomat avaimet" : "Tuntematon avain"}: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return "Virheellinen avain tietueessa";
          case "invalid_union":
            return "Virheellinen unioni";
          case "invalid_element":
            return "Virheellinen arvo joukossa";
          default:
            return `Virheellinen sy\xF6te`;
        }
      };
    }, "error");
    __name(fi_default, "default");
  }
});

// ../node_modules/zod/v4/locales/fr.js
function fr_default() {
  return {
    localeError: error16()
  };
}
var error16;
var init_fr = __esm({
  "../node_modules/zod/v4/locales/fr.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error16 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "caract\xE8res", verb: "avoir" },
        file: { unit: "octets", verb: "avoir" },
        array: { unit: "\xE9l\xE9ments", verb: "avoir" },
        set: { unit: "\xE9l\xE9ments", verb: "avoir" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "entr\xE9e",
        email: "adresse e-mail",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "date et heure ISO",
        date: "date ISO",
        time: "heure ISO",
        duration: "dur\xE9e ISO",
        ipv4: "adresse IPv4",
        ipv6: "adresse IPv6",
        cidrv4: "plage IPv4",
        cidrv6: "plage IPv6",
        base64: "cha\xEEne encod\xE9e en base64",
        base64url: "cha\xEEne encod\xE9e en base64url",
        json_string: "cha\xEEne JSON",
        e164: "num\xE9ro E.164",
        jwt: "JWT",
        template_literal: "entr\xE9e"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "nombre",
        array: "tableau"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `Entr\xE9e invalide : instanceof ${issue2.expected} attendu, ${received} re\xE7u`;
            }
            return `Entr\xE9e invalide : ${expected} attendu, ${received} re\xE7u`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `Entr\xE9e invalide : ${stringifyPrimitive(issue2.values[0])} attendu`;
            return `Option invalide : une valeur parmi ${joinValues(issue2.values, "|")} attendue`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `Trop grand : ${issue2.origin ?? "valeur"} doit ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\xE9l\xE9ment(s)"}`;
            return `Trop grand : ${issue2.origin ?? "valeur"} doit \xEAtre ${adj}${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `Trop petit : ${issue2.origin} doit ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
            }
            return `Trop petit : ${issue2.origin} doit \xEAtre ${adj}${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with")
              return `Cha\xEEne invalide : doit commencer par "${_issue.prefix}"`;
            if (_issue.format === "ends_with")
              return `Cha\xEEne invalide : doit se terminer par "${_issue.suffix}"`;
            if (_issue.format === "includes")
              return `Cha\xEEne invalide : doit inclure "${_issue.includes}"`;
            if (_issue.format === "regex")
              return `Cha\xEEne invalide : doit correspondre au mod\xE8le ${_issue.pattern}`;
            return `${FormatDictionary[_issue.format] ?? issue2.format} invalide`;
          }
          case "not_multiple_of":
            return `Nombre invalide : doit \xEAtre un multiple de ${issue2.divisor}`;
          case "unrecognized_keys":
            return `Cl\xE9${issue2.keys.length > 1 ? "s" : ""} non reconnue${issue2.keys.length > 1 ? "s" : ""} : ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `Cl\xE9 invalide dans ${issue2.origin}`;
          case "invalid_union":
            return "Entr\xE9e invalide";
          case "invalid_element":
            return `Valeur invalide dans ${issue2.origin}`;
          default:
            return `Entr\xE9e invalide`;
        }
      };
    }, "error");
    __name(fr_default, "default");
  }
});

// ../node_modules/zod/v4/locales/fr-CA.js
function fr_CA_default() {
  return {
    localeError: error17()
  };
}
var error17;
var init_fr_CA = __esm({
  "../node_modules/zod/v4/locales/fr-CA.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error17 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "caract\xE8res", verb: "avoir" },
        file: { unit: "octets", verb: "avoir" },
        array: { unit: "\xE9l\xE9ments", verb: "avoir" },
        set: { unit: "\xE9l\xE9ments", verb: "avoir" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "entr\xE9e",
        email: "adresse courriel",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "date-heure ISO",
        date: "date ISO",
        time: "heure ISO",
        duration: "dur\xE9e ISO",
        ipv4: "adresse IPv4",
        ipv6: "adresse IPv6",
        cidrv4: "plage IPv4",
        cidrv6: "plage IPv6",
        base64: "cha\xEEne encod\xE9e en base64",
        base64url: "cha\xEEne encod\xE9e en base64url",
        json_string: "cha\xEEne JSON",
        e164: "num\xE9ro E.164",
        jwt: "JWT",
        template_literal: "entr\xE9e"
      };
      const TypeDictionary = {
        nan: "NaN"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `Entr\xE9e invalide : attendu instanceof ${issue2.expected}, re\xE7u ${received}`;
            }
            return `Entr\xE9e invalide : attendu ${expected}, re\xE7u ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `Entr\xE9e invalide : attendu ${stringifyPrimitive(issue2.values[0])}`;
            return `Option invalide : attendu l'une des valeurs suivantes ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "\u2264" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `Trop grand : attendu que ${issue2.origin ?? "la valeur"} ait ${adj}${issue2.maximum.toString()} ${sizing.unit}`;
            return `Trop grand : attendu que ${issue2.origin ?? "la valeur"} soit ${adj}${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? "\u2265" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `Trop petit : attendu que ${issue2.origin} ait ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
            }
            return `Trop petit : attendu que ${issue2.origin} soit ${adj}${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with") {
              return `Cha\xEEne invalide : doit commencer par "${_issue.prefix}"`;
            }
            if (_issue.format === "ends_with")
              return `Cha\xEEne invalide : doit se terminer par "${_issue.suffix}"`;
            if (_issue.format === "includes")
              return `Cha\xEEne invalide : doit inclure "${_issue.includes}"`;
            if (_issue.format === "regex")
              return `Cha\xEEne invalide : doit correspondre au motif ${_issue.pattern}`;
            return `${FormatDictionary[_issue.format] ?? issue2.format} invalide`;
          }
          case "not_multiple_of":
            return `Nombre invalide : doit \xEAtre un multiple de ${issue2.divisor}`;
          case "unrecognized_keys":
            return `Cl\xE9${issue2.keys.length > 1 ? "s" : ""} non reconnue${issue2.keys.length > 1 ? "s" : ""} : ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `Cl\xE9 invalide dans ${issue2.origin}`;
          case "invalid_union":
            return "Entr\xE9e invalide";
          case "invalid_element":
            return `Valeur invalide dans ${issue2.origin}`;
          default:
            return `Entr\xE9e invalide`;
        }
      };
    }, "error");
    __name(fr_CA_default, "default");
  }
});

// ../node_modules/zod/v4/locales/he.js
function he_default() {
  return {
    localeError: error18()
  };
}
var error18;
var init_he = __esm({
  "../node_modules/zod/v4/locales/he.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error18 = /* @__PURE__ */ __name(() => {
      const TypeNames = {
        string: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA", gender: "f" },
        number: { label: "\u05DE\u05E1\u05E4\u05E8", gender: "m" },
        boolean: { label: "\u05E2\u05E8\u05DA \u05D1\u05D5\u05DC\u05D9\u05D0\u05E0\u05D9", gender: "m" },
        bigint: { label: "BigInt", gender: "m" },
        date: { label: "\u05EA\u05D0\u05E8\u05D9\u05DA", gender: "m" },
        array: { label: "\u05DE\u05E2\u05E8\u05DA", gender: "m" },
        object: { label: "\u05D0\u05D5\u05D1\u05D9\u05D9\u05E7\u05D8", gender: "m" },
        null: { label: "\u05E2\u05E8\u05DA \u05E8\u05D9\u05E7 (null)", gender: "m" },
        undefined: { label: "\u05E2\u05E8\u05DA \u05DC\u05D0 \u05DE\u05D5\u05D2\u05D3\u05E8 (undefined)", gender: "m" },
        symbol: { label: "\u05E1\u05D9\u05DE\u05D1\u05D5\u05DC (Symbol)", gender: "m" },
        function: { label: "\u05E4\u05D5\u05E0\u05E7\u05E6\u05D9\u05D4", gender: "f" },
        map: { label: "\u05DE\u05E4\u05D4 (Map)", gender: "f" },
        set: { label: "\u05E7\u05D1\u05D5\u05E6\u05D4 (Set)", gender: "f" },
        file: { label: "\u05E7\u05D5\u05D1\u05E5", gender: "m" },
        promise: { label: "Promise", gender: "m" },
        NaN: { label: "NaN", gender: "m" },
        unknown: { label: "\u05E2\u05E8\u05DA \u05DC\u05D0 \u05D9\u05D3\u05D5\u05E2", gender: "m" },
        value: { label: "\u05E2\u05E8\u05DA", gender: "m" }
      };
      const Sizable = {
        string: { unit: "\u05EA\u05D5\u05D5\u05D9\u05DD", shortLabel: "\u05E7\u05E6\u05E8", longLabel: "\u05D0\u05E8\u05D5\u05DA" },
        file: { unit: "\u05D1\u05D9\u05D9\u05D8\u05D9\u05DD", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" },
        array: { unit: "\u05E4\u05E8\u05D9\u05D8\u05D9\u05DD", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" },
        set: { unit: "\u05E4\u05E8\u05D9\u05D8\u05D9\u05DD", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" },
        number: { unit: "", shortLabel: "\u05E7\u05D8\u05DF", longLabel: "\u05D2\u05D3\u05D5\u05DC" }
        // no unit
      };
      const typeEntry = /* @__PURE__ */ __name((t) => t ? TypeNames[t] : void 0, "typeEntry");
      const typeLabel = /* @__PURE__ */ __name((t) => {
        const e = typeEntry(t);
        if (e)
          return e.label;
        return t ?? TypeNames.unknown.label;
      }, "typeLabel");
      const withDefinite = /* @__PURE__ */ __name((t) => `\u05D4${typeLabel(t)}`, "withDefinite");
      const verbFor = /* @__PURE__ */ __name((t) => {
        const e = typeEntry(t);
        const gender = e?.gender ?? "m";
        return gender === "f" ? "\u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05D9\u05D5\u05EA" : "\u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA";
      }, "verbFor");
      const getSizing = /* @__PURE__ */ __name((origin) => {
        if (!origin)
          return null;
        return Sizable[origin] ?? null;
      }, "getSizing");
      const FormatDictionary = {
        regex: { label: "\u05E7\u05DC\u05D8", gender: "m" },
        email: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA \u05D0\u05D9\u05DE\u05D9\u05D9\u05DC", gender: "f" },
        url: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA \u05E8\u05E9\u05EA", gender: "f" },
        emoji: { label: "\u05D0\u05D9\u05DE\u05D5\u05D2'\u05D9", gender: "m" },
        uuid: { label: "UUID", gender: "m" },
        nanoid: { label: "nanoid", gender: "m" },
        guid: { label: "GUID", gender: "m" },
        cuid: { label: "cuid", gender: "m" },
        cuid2: { label: "cuid2", gender: "m" },
        ulid: { label: "ULID", gender: "m" },
        xid: { label: "XID", gender: "m" },
        ksuid: { label: "KSUID", gender: "m" },
        datetime: { label: "\u05EA\u05D0\u05E8\u05D9\u05DA \u05D5\u05D6\u05DE\u05DF ISO", gender: "m" },
        date: { label: "\u05EA\u05D0\u05E8\u05D9\u05DA ISO", gender: "m" },
        time: { label: "\u05D6\u05DE\u05DF ISO", gender: "m" },
        duration: { label: "\u05DE\u05E9\u05DA \u05D6\u05DE\u05DF ISO", gender: "m" },
        ipv4: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA IPv4", gender: "f" },
        ipv6: { label: "\u05DB\u05EA\u05D5\u05D1\u05EA IPv6", gender: "f" },
        cidrv4: { label: "\u05D8\u05D5\u05D5\u05D7 IPv4", gender: "m" },
        cidrv6: { label: "\u05D8\u05D5\u05D5\u05D7 IPv6", gender: "m" },
        base64: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D1\u05D1\u05E1\u05D9\u05E1 64", gender: "f" },
        base64url: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D1\u05D1\u05E1\u05D9\u05E1 64 \u05DC\u05DB\u05EA\u05D5\u05D1\u05D5\u05EA \u05E8\u05E9\u05EA", gender: "f" },
        json_string: { label: "\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA JSON", gender: "f" },
        e164: { label: "\u05DE\u05E1\u05E4\u05E8 E.164", gender: "m" },
        jwt: { label: "JWT", gender: "m" },
        ends_with: { label: "\u05E7\u05DC\u05D8", gender: "m" },
        includes: { label: "\u05E7\u05DC\u05D8", gender: "m" },
        lowercase: { label: "\u05E7\u05DC\u05D8", gender: "m" },
        starts_with: { label: "\u05E7\u05DC\u05D8", gender: "m" },
        uppercase: { label: "\u05E7\u05DC\u05D8", gender: "m" }
      };
      const TypeDictionary = {
        nan: "NaN"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expectedKey = issue2.expected;
            const expected = TypeDictionary[expectedKey ?? ""] ?? typeLabel(expectedKey);
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? TypeNames[receivedType]?.label ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA instanceof ${issue2.expected}, \u05D4\u05EA\u05E7\u05D1\u05DC ${received}`;
            }
            return `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${expected}, \u05D4\u05EA\u05E7\u05D1\u05DC ${received}`;
          }
          case "invalid_value": {
            if (issue2.values.length === 1) {
              return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05E2\u05E8\u05DA \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05D9\u05D5\u05EA ${stringifyPrimitive(issue2.values[0])}`;
            }
            const stringified = issue2.values.map((v) => stringifyPrimitive(v));
            if (issue2.values.length === 2) {
              return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA \u05D4\u05DE\u05EA\u05D0\u05D9\u05DE\u05D5\u05EA \u05D4\u05DF ${stringified[0]} \u05D0\u05D5 ${stringified[1]}`;
            }
            const lastValue = stringified[stringified.length - 1];
            const restValues = stringified.slice(0, -1).join(", ");
            return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D4\u05D0\u05E4\u05E9\u05E8\u05D5\u05D9\u05D5\u05EA \u05D4\u05DE\u05EA\u05D0\u05D9\u05DE\u05D5\u05EA \u05D4\u05DF ${restValues} \u05D0\u05D5 ${lastValue}`;
          }
          case "too_big": {
            const sizing = getSizing(issue2.origin);
            const subject = withDefinite(issue2.origin ?? "value");
            if (issue2.origin === "string") {
              return `${sizing?.longLabel ?? "\u05D0\u05E8\u05D5\u05DA"} \u05DE\u05D3\u05D9: ${subject} \u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05DB\u05D9\u05DC ${issue2.maximum.toString()} ${sizing?.unit ?? ""} ${issue2.inclusive ? "\u05D0\u05D5 \u05E4\u05D7\u05D5\u05EA" : "\u05DC\u05DB\u05DC \u05D4\u05D9\u05D5\u05EA\u05E8"}`.trim();
            }
            if (issue2.origin === "number") {
              const comparison = issue2.inclusive ? `\u05E7\u05D8\u05DF \u05D0\u05D5 \u05E9\u05D5\u05D5\u05D4 \u05DC-${issue2.maximum}` : `\u05E7\u05D8\u05DF \u05DE-${issue2.maximum}`;
              return `\u05D2\u05D3\u05D5\u05DC \u05DE\u05D3\u05D9: ${subject} \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${comparison}`;
            }
            if (issue2.origin === "array" || issue2.origin === "set") {
              const verb = issue2.origin === "set" ? "\u05E6\u05E8\u05D9\u05DB\u05D4" : "\u05E6\u05E8\u05D9\u05DA";
              const comparison = issue2.inclusive ? `${issue2.maximum} ${sizing?.unit ?? ""} \u05D0\u05D5 \u05E4\u05D7\u05D5\u05EA` : `\u05E4\u05D7\u05D5\u05EA \u05DE-${issue2.maximum} ${sizing?.unit ?? ""}`;
              return `\u05D2\u05D3\u05D5\u05DC \u05DE\u05D3\u05D9: ${subject} ${verb} \u05DC\u05D4\u05DB\u05D9\u05DC ${comparison}`.trim();
            }
            const adj = issue2.inclusive ? "<=" : "<";
            const be = verbFor(issue2.origin ?? "value");
            if (sizing?.unit) {
              return `${sizing.longLabel} \u05DE\u05D3\u05D9: ${subject} ${be} ${adj}${issue2.maximum.toString()} ${sizing.unit}`;
            }
            return `${sizing?.longLabel ?? "\u05D2\u05D3\u05D5\u05DC"} \u05DE\u05D3\u05D9: ${subject} ${be} ${adj}${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const sizing = getSizing(issue2.origin);
            const subject = withDefinite(issue2.origin ?? "value");
            if (issue2.origin === "string") {
              return `${sizing?.shortLabel ?? "\u05E7\u05E6\u05E8"} \u05DE\u05D3\u05D9: ${subject} \u05E6\u05E8\u05D9\u05DB\u05D4 \u05DC\u05D4\u05DB\u05D9\u05DC ${issue2.minimum.toString()} ${sizing?.unit ?? ""} ${issue2.inclusive ? "\u05D0\u05D5 \u05D9\u05D5\u05EA\u05E8" : "\u05DC\u05E4\u05D7\u05D5\u05EA"}`.trim();
            }
            if (issue2.origin === "number") {
              const comparison = issue2.inclusive ? `\u05D2\u05D3\u05D5\u05DC \u05D0\u05D5 \u05E9\u05D5\u05D5\u05D4 \u05DC-${issue2.minimum}` : `\u05D2\u05D3\u05D5\u05DC \u05DE-${issue2.minimum}`;
              return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${subject} \u05E6\u05E8\u05D9\u05DA \u05DC\u05D4\u05D9\u05D5\u05EA ${comparison}`;
            }
            if (issue2.origin === "array" || issue2.origin === "set") {
              const verb = issue2.origin === "set" ? "\u05E6\u05E8\u05D9\u05DB\u05D4" : "\u05E6\u05E8\u05D9\u05DA";
              if (issue2.minimum === 1 && issue2.inclusive) {
                const singularPhrase = issue2.origin === "set" ? "\u05DC\u05E4\u05D7\u05D5\u05EA \u05E4\u05E8\u05D9\u05D8 \u05D0\u05D7\u05D3" : "\u05DC\u05E4\u05D7\u05D5\u05EA \u05E4\u05E8\u05D9\u05D8 \u05D0\u05D7\u05D3";
                return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${subject} ${verb} \u05DC\u05D4\u05DB\u05D9\u05DC ${singularPhrase}`;
              }
              const comparison = issue2.inclusive ? `${issue2.minimum} ${sizing?.unit ?? ""} \u05D0\u05D5 \u05D9\u05D5\u05EA\u05E8` : `\u05D9\u05D5\u05EA\u05E8 \u05DE-${issue2.minimum} ${sizing?.unit ?? ""}`;
              return `\u05E7\u05D8\u05DF \u05DE\u05D3\u05D9: ${subject} ${verb} \u05DC\u05D4\u05DB\u05D9\u05DC ${comparison}`.trim();
            }
            const adj = issue2.inclusive ? ">=" : ">";
            const be = verbFor(issue2.origin ?? "value");
            if (sizing?.unit) {
              return `${sizing.shortLabel} \u05DE\u05D3\u05D9: ${subject} ${be} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
            }
            return `${sizing?.shortLabel ?? "\u05E7\u05D8\u05DF"} \u05DE\u05D3\u05D9: ${subject} ${be} ${adj}${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with")
              return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05EA\u05D7\u05D9\u05DC \u05D1 "${_issue.prefix}"`;
            if (_issue.format === "ends_with")
              return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05E1\u05EA\u05D9\u05D9\u05DD \u05D1 "${_issue.suffix}"`;
            if (_issue.format === "includes")
              return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05DB\u05DC\u05D5\u05DC "${_issue.includes}"`;
            if (_issue.format === "regex")
              return `\u05D4\u05DE\u05D7\u05E8\u05D5\u05D6\u05EA \u05D7\u05D9\u05D9\u05D1\u05EA \u05DC\u05D4\u05EA\u05D0\u05D9\u05DD \u05DC\u05EA\u05D1\u05E0\u05D9\u05EA ${_issue.pattern}`;
            const nounEntry = FormatDictionary[_issue.format];
            const noun = nounEntry?.label ?? _issue.format;
            const gender = nounEntry?.gender ?? "m";
            const adjective = gender === "f" ? "\u05EA\u05E7\u05D9\u05E0\u05D4" : "\u05EA\u05E7\u05D9\u05DF";
            return `${noun} \u05DC\u05D0 ${adjective}`;
          }
          case "not_multiple_of":
            return `\u05DE\u05E1\u05E4\u05E8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF: \u05D7\u05D9\u05D9\u05D1 \u05DC\u05D4\u05D9\u05D5\u05EA \u05DE\u05DB\u05E4\u05DC\u05D4 \u05E9\u05DC ${issue2.divisor}`;
          case "unrecognized_keys":
            return `\u05DE\u05E4\u05EA\u05D7${issue2.keys.length > 1 ? "\u05D5\u05EA" : ""} \u05DC\u05D0 \u05DE\u05D6\u05D5\u05D4${issue2.keys.length > 1 ? "\u05D9\u05DD" : "\u05D4"}: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key": {
            return `\u05E9\u05D3\u05D4 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF \u05D1\u05D0\u05D5\u05D1\u05D9\u05D9\u05E7\u05D8`;
          }
          case "invalid_union":
            return "\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF";
          case "invalid_element": {
            const place = withDefinite(issue2.origin ?? "array");
            return `\u05E2\u05E8\u05DA \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF \u05D1${place}`;
          }
          default:
            return `\u05E7\u05DC\u05D8 \u05DC\u05D0 \u05EA\u05E7\u05D9\u05DF`;
        }
      };
    }, "error");
    __name(he_default, "default");
  }
});

// ../node_modules/zod/v4/locales/hu.js
function hu_default() {
  return {
    localeError: error19()
  };
}
var error19;
var init_hu = __esm({
  "../node_modules/zod/v4/locales/hu.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error19 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "karakter", verb: "legyen" },
        file: { unit: "byte", verb: "legyen" },
        array: { unit: "elem", verb: "legyen" },
        set: { unit: "elem", verb: "legyen" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "bemenet",
        email: "email c\xEDm",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO id\u0151b\xE9lyeg",
        date: "ISO d\xE1tum",
        time: "ISO id\u0151",
        duration: "ISO id\u0151intervallum",
        ipv4: "IPv4 c\xEDm",
        ipv6: "IPv6 c\xEDm",
        cidrv4: "IPv4 tartom\xE1ny",
        cidrv6: "IPv6 tartom\xE1ny",
        base64: "base64-k\xF3dolt string",
        base64url: "base64url-k\xF3dolt string",
        json_string: "JSON string",
        e164: "E.164 sz\xE1m",
        jwt: "JWT",
        template_literal: "bemenet"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "sz\xE1m",
        array: "t\xF6mb"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k instanceof ${issue2.expected}, a kapott \xE9rt\xE9k ${received}`;
            }
            return `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k ${expected}, a kapott \xE9rt\xE9k ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `\xC9rv\xE9nytelen bemenet: a v\xE1rt \xE9rt\xE9k ${stringifyPrimitive(issue2.values[0])}`;
            return `\xC9rv\xE9nytelen opci\xF3: valamelyik \xE9rt\xE9k v\xE1rt ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `T\xFAl nagy: ${issue2.origin ?? "\xE9rt\xE9k"} m\xE9rete t\xFAl nagy ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elem"}`;
            return `T\xFAl nagy: a bemeneti \xE9rt\xE9k ${issue2.origin ?? "\xE9rt\xE9k"} t\xFAl nagy: ${adj}${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `T\xFAl kicsi: a bemeneti \xE9rt\xE9k ${issue2.origin} m\xE9rete t\xFAl kicsi ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
            }
            return `T\xFAl kicsi: a bemeneti \xE9rt\xE9k ${issue2.origin} t\xFAl kicsi ${adj}${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with")
              return `\xC9rv\xE9nytelen string: "${_issue.prefix}" \xE9rt\xE9kkel kell kezd\u0151dnie`;
            if (_issue.format === "ends_with")
              return `\xC9rv\xE9nytelen string: "${_issue.suffix}" \xE9rt\xE9kkel kell v\xE9gz\u0151dnie`;
            if (_issue.format === "includes")
              return `\xC9rv\xE9nytelen string: "${_issue.includes}" \xE9rt\xE9ket kell tartalmaznia`;
            if (_issue.format === "regex")
              return `\xC9rv\xE9nytelen string: ${_issue.pattern} mint\xE1nak kell megfelelnie`;
            return `\xC9rv\xE9nytelen ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `\xC9rv\xE9nytelen sz\xE1m: ${issue2.divisor} t\xF6bbsz\xF6r\xF6s\xE9nek kell lennie`;
          case "unrecognized_keys":
            return `Ismeretlen kulcs${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `\xC9rv\xE9nytelen kulcs ${issue2.origin}`;
          case "invalid_union":
            return "\xC9rv\xE9nytelen bemenet";
          case "invalid_element":
            return `\xC9rv\xE9nytelen \xE9rt\xE9k: ${issue2.origin}`;
          default:
            return `\xC9rv\xE9nytelen bemenet`;
        }
      };
    }, "error");
    __name(hu_default, "default");
  }
});

// ../node_modules/zod/v4/locales/hy.js
function getArmenianPlural(count3, one, many) {
  return Math.abs(count3) === 1 ? one : many;
}
function withDefiniteArticle(word) {
  if (!word)
    return "";
  const vowels = ["\u0561", "\u0565", "\u0568", "\u056B", "\u0578", "\u0578\u0582", "\u0585"];
  const lastChar = word[word.length - 1];
  return word + (vowels.includes(lastChar) ? "\u0576" : "\u0568");
}
function hy_default() {
  return {
    localeError: error20()
  };
}
var error20;
var init_hy = __esm({
  "../node_modules/zod/v4/locales/hy.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    __name(getArmenianPlural, "getArmenianPlural");
    __name(withDefiniteArticle, "withDefiniteArticle");
    error20 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: {
          unit: {
            one: "\u0576\u0577\u0561\u0576",
            many: "\u0576\u0577\u0561\u0576\u0576\u0565\u0580"
          },
          verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
        },
        file: {
          unit: {
            one: "\u0562\u0561\u0575\u0569",
            many: "\u0562\u0561\u0575\u0569\u0565\u0580"
          },
          verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
        },
        array: {
          unit: {
            one: "\u057F\u0561\u0580\u0580",
            many: "\u057F\u0561\u0580\u0580\u0565\u0580"
          },
          verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
        },
        set: {
          unit: {
            one: "\u057F\u0561\u0580\u0580",
            many: "\u057F\u0561\u0580\u0580\u0565\u0580"
          },
          verb: "\u0578\u0582\u0576\u0565\u0576\u0561\u056C"
        }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "\u0574\u0578\u0582\u057F\u0584",
        email: "\u0567\u056C. \u0570\u0561\u057D\u0581\u0565",
        url: "URL",
        emoji: "\u0567\u0574\u0578\u057B\u056B",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO \u0561\u0574\u057D\u0561\u0569\u056B\u057E \u0587 \u056A\u0561\u0574",
        date: "ISO \u0561\u0574\u057D\u0561\u0569\u056B\u057E",
        time: "ISO \u056A\u0561\u0574",
        duration: "ISO \u057F\u0587\u0578\u0572\u0578\u0582\u0569\u0575\u0578\u0582\u0576",
        ipv4: "IPv4 \u0570\u0561\u057D\u0581\u0565",
        ipv6: "IPv6 \u0570\u0561\u057D\u0581\u0565",
        cidrv4: "IPv4 \u0574\u056B\u057B\u0561\u056F\u0561\u0575\u0584",
        cidrv6: "IPv6 \u0574\u056B\u057B\u0561\u056F\u0561\u0575\u0584",
        base64: "base64 \u0571\u0587\u0561\u0579\u0561\u0583\u0578\u057E \u057F\u0578\u0572",
        base64url: "base64url \u0571\u0587\u0561\u0579\u0561\u0583\u0578\u057E \u057F\u0578\u0572",
        json_string: "JSON \u057F\u0578\u0572",
        e164: "E.164 \u0570\u0561\u0574\u0561\u0580",
        jwt: "JWT",
        template_literal: "\u0574\u0578\u0582\u057F\u0584"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "\u0569\u056B\u057E",
        array: "\u0566\u0561\u0576\u0563\u057E\u0561\u056E"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 instanceof ${issue2.expected}, \u057D\u057F\u0561\u0581\u057E\u0565\u056C \u0567 ${received}`;
            }
            return `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 ${expected}, \u057D\u057F\u0561\u0581\u057E\u0565\u056C \u0567 ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 ${stringifyPrimitive(issue2.values[1])}`;
            return `\u054D\u056D\u0561\u056C \u057F\u0561\u0580\u0562\u0565\u0580\u0561\u056F\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567\u0580 \u0570\u0565\u057F\u0587\u0575\u0561\u056C\u0576\u0565\u0580\u056B\u0581 \u0574\u0565\u056F\u0568\u055D ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              const maxValue = Number(issue2.maximum);
              const unit = getArmenianPlural(maxValue, sizing.unit.one, sizing.unit.many);
              return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0574\u0565\u056E \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${withDefiniteArticle(issue2.origin ?? "\u0561\u0580\u056A\u0565\u0584")} \u056F\u0578\u0582\u0576\u0565\u0576\u0561 ${adj}${issue2.maximum.toString()} ${unit}`;
            }
            return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0574\u0565\u056E \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${withDefiniteArticle(issue2.origin ?? "\u0561\u0580\u056A\u0565\u0584")} \u056C\u056B\u0576\u056B ${adj}${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              const minValue = Number(issue2.minimum);
              const unit = getArmenianPlural(minValue, sizing.unit.one, sizing.unit.many);
              return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0583\u0578\u0584\u0580 \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${withDefiniteArticle(issue2.origin)} \u056F\u0578\u0582\u0576\u0565\u0576\u0561 ${adj}${issue2.minimum.toString()} ${unit}`;
            }
            return `\u0549\u0561\u0583\u0561\u0566\u0561\u0576\u0581 \u0583\u0578\u0584\u0580 \u0561\u0580\u056A\u0565\u0584\u2024 \u057D\u057A\u0561\u057D\u057E\u0578\u0582\u0574 \u0567, \u0578\u0580 ${withDefiniteArticle(issue2.origin)} \u056C\u056B\u0576\u056B ${adj}${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with")
              return `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u057D\u056F\u057D\u057E\u056B "${_issue.prefix}"-\u0578\u057E`;
            if (_issue.format === "ends_with")
              return `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0561\u057E\u0561\u0580\u057F\u057E\u056B "${_issue.suffix}"-\u0578\u057E`;
            if (_issue.format === "includes")
              return `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u057A\u0561\u0580\u0578\u0582\u0576\u0561\u056F\u056B "${_issue.includes}"`;
            if (_issue.format === "regex")
              return `\u054D\u056D\u0561\u056C \u057F\u0578\u0572\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0570\u0561\u0574\u0561\u057A\u0561\u057F\u0561\u057D\u056D\u0561\u0576\u056B ${_issue.pattern} \u0571\u0587\u0561\u0579\u0561\u0583\u056B\u0576`;
            return `\u054D\u056D\u0561\u056C ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `\u054D\u056D\u0561\u056C \u0569\u056B\u057E\u2024 \u057A\u0565\u057F\u0584 \u0567 \u0562\u0561\u0566\u0574\u0561\u057A\u0561\u057F\u056B\u056F \u056C\u056B\u0576\u056B ${issue2.divisor}-\u056B`;
          case "unrecognized_keys":
            return `\u0549\u0573\u0561\u0576\u0561\u0579\u057E\u0561\u056E \u0562\u0561\u0576\u0561\u056C\u056B${issue2.keys.length > 1 ? "\u0576\u0565\u0580" : ""}. ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `\u054D\u056D\u0561\u056C \u0562\u0561\u0576\u0561\u056C\u056B ${withDefiniteArticle(issue2.origin)}-\u0578\u0582\u0574`;
          case "invalid_union":
            return "\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574";
          case "invalid_element":
            return `\u054D\u056D\u0561\u056C \u0561\u0580\u056A\u0565\u0584 ${withDefiniteArticle(issue2.origin)}-\u0578\u0582\u0574`;
          default:
            return `\u054D\u056D\u0561\u056C \u0574\u0578\u0582\u057F\u0584\u0561\u0563\u0580\u0578\u0582\u0574`;
        }
      };
    }, "error");
    __name(hy_default, "default");
  }
});

// ../node_modules/zod/v4/locales/id.js
function id_default() {
  return {
    localeError: error21()
  };
}
var error21;
var init_id = __esm({
  "../node_modules/zod/v4/locales/id.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error21 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "karakter", verb: "memiliki" },
        file: { unit: "byte", verb: "memiliki" },
        array: { unit: "item", verb: "memiliki" },
        set: { unit: "item", verb: "memiliki" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "input",
        email: "alamat email",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "tanggal dan waktu format ISO",
        date: "tanggal format ISO",
        time: "jam format ISO",
        duration: "durasi format ISO",
        ipv4: "alamat IPv4",
        ipv6: "alamat IPv6",
        cidrv4: "rentang alamat IPv4",
        cidrv6: "rentang alamat IPv6",
        base64: "string dengan enkode base64",
        base64url: "string dengan enkode base64url",
        json_string: "string JSON",
        e164: "angka E.164",
        jwt: "JWT",
        template_literal: "input"
      };
      const TypeDictionary = {
        nan: "NaN"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `Input tidak valid: diharapkan instanceof ${issue2.expected}, diterima ${received}`;
            }
            return `Input tidak valid: diharapkan ${expected}, diterima ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `Input tidak valid: diharapkan ${stringifyPrimitive(issue2.values[0])}`;
            return `Pilihan tidak valid: diharapkan salah satu dari ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `Terlalu besar: diharapkan ${issue2.origin ?? "value"} memiliki ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemen"}`;
            return `Terlalu besar: diharapkan ${issue2.origin ?? "value"} menjadi ${adj}${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `Terlalu kecil: diharapkan ${issue2.origin} memiliki ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
            }
            return `Terlalu kecil: diharapkan ${issue2.origin} menjadi ${adj}${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with")
              return `String tidak valid: harus dimulai dengan "${_issue.prefix}"`;
            if (_issue.format === "ends_with")
              return `String tidak valid: harus berakhir dengan "${_issue.suffix}"`;
            if (_issue.format === "includes")
              return `String tidak valid: harus menyertakan "${_issue.includes}"`;
            if (_issue.format === "regex")
              return `String tidak valid: harus sesuai pola ${_issue.pattern}`;
            return `${FormatDictionary[_issue.format] ?? issue2.format} tidak valid`;
          }
          case "not_multiple_of":
            return `Angka tidak valid: harus kelipatan dari ${issue2.divisor}`;
          case "unrecognized_keys":
            return `Kunci tidak dikenali ${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `Kunci tidak valid di ${issue2.origin}`;
          case "invalid_union":
            return "Input tidak valid";
          case "invalid_element":
            return `Nilai tidak valid di ${issue2.origin}`;
          default:
            return `Input tidak valid`;
        }
      };
    }, "error");
    __name(id_default, "default");
  }
});

// ../node_modules/zod/v4/locales/is.js
function is_default() {
  return {
    localeError: error22()
  };
}
var error22;
var init_is = __esm({
  "../node_modules/zod/v4/locales/is.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error22 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "stafi", verb: "a\xF0 hafa" },
        file: { unit: "b\xE6ti", verb: "a\xF0 hafa" },
        array: { unit: "hluti", verb: "a\xF0 hafa" },
        set: { unit: "hluti", verb: "a\xF0 hafa" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "gildi",
        email: "netfang",
        url: "vefsl\xF3\xF0",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO dagsetning og t\xEDmi",
        date: "ISO dagsetning",
        time: "ISO t\xEDmi",
        duration: "ISO t\xEDmalengd",
        ipv4: "IPv4 address",
        ipv6: "IPv6 address",
        cidrv4: "IPv4 range",
        cidrv6: "IPv6 range",
        base64: "base64-encoded strengur",
        base64url: "base64url-encoded strengur",
        json_string: "JSON strengur",
        e164: "E.164 t\xF6lugildi",
        jwt: "JWT",
        template_literal: "gildi"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "n\xFAmer",
        array: "fylki"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `Rangt gildi: \xDE\xFA sl\xF3st inn ${received} \xFEar sem \xE1 a\xF0 vera instanceof ${issue2.expected}`;
            }
            return `Rangt gildi: \xDE\xFA sl\xF3st inn ${received} \xFEar sem \xE1 a\xF0 vera ${expected}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `Rangt gildi: gert r\xE1\xF0 fyrir ${stringifyPrimitive(issue2.values[0])}`;
            return `\xD3gilt val: m\xE1 vera eitt af eftirfarandi ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `Of st\xF3rt: gert er r\xE1\xF0 fyrir a\xF0 ${issue2.origin ?? "gildi"} hafi ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "hluti"}`;
            return `Of st\xF3rt: gert er r\xE1\xF0 fyrir a\xF0 ${issue2.origin ?? "gildi"} s\xE9 ${adj}${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `Of l\xEDti\xF0: gert er r\xE1\xF0 fyrir a\xF0 ${issue2.origin} hafi ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
            }
            return `Of l\xEDti\xF0: gert er r\xE1\xF0 fyrir a\xF0 ${issue2.origin} s\xE9 ${adj}${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with") {
              return `\xD3gildur strengur: ver\xF0ur a\xF0 byrja \xE1 "${_issue.prefix}"`;
            }
            if (_issue.format === "ends_with")
              return `\xD3gildur strengur: ver\xF0ur a\xF0 enda \xE1 "${_issue.suffix}"`;
            if (_issue.format === "includes")
              return `\xD3gildur strengur: ver\xF0ur a\xF0 innihalda "${_issue.includes}"`;
            if (_issue.format === "regex")
              return `\xD3gildur strengur: ver\xF0ur a\xF0 fylgja mynstri ${_issue.pattern}`;
            return `Rangt ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `R\xF6ng tala: ver\xF0ur a\xF0 vera margfeldi af ${issue2.divisor}`;
          case "unrecognized_keys":
            return `\xD3\xFEekkt ${issue2.keys.length > 1 ? "ir lyklar" : "ur lykill"}: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `Rangur lykill \xED ${issue2.origin}`;
          case "invalid_union":
            return "Rangt gildi";
          case "invalid_element":
            return `Rangt gildi \xED ${issue2.origin}`;
          default:
            return `Rangt gildi`;
        }
      };
    }, "error");
    __name(is_default, "default");
  }
});

// ../node_modules/zod/v4/locales/it.js
function it_default() {
  return {
    localeError: error23()
  };
}
var error23;
var init_it = __esm({
  "../node_modules/zod/v4/locales/it.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error23 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "caratteri", verb: "avere" },
        file: { unit: "byte", verb: "avere" },
        array: { unit: "elementi", verb: "avere" },
        set: { unit: "elementi", verb: "avere" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "input",
        email: "indirizzo email",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "data e ora ISO",
        date: "data ISO",
        time: "ora ISO",
        duration: "durata ISO",
        ipv4: "indirizzo IPv4",
        ipv6: "indirizzo IPv6",
        cidrv4: "intervallo IPv4",
        cidrv6: "intervallo IPv6",
        base64: "stringa codificata in base64",
        base64url: "URL codificata in base64",
        json_string: "stringa JSON",
        e164: "numero E.164",
        jwt: "JWT",
        template_literal: "input"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "numero",
        array: "vettore"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `Input non valido: atteso instanceof ${issue2.expected}, ricevuto ${received}`;
            }
            return `Input non valido: atteso ${expected}, ricevuto ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `Input non valido: atteso ${stringifyPrimitive(issue2.values[0])}`;
            return `Opzione non valida: atteso uno tra ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `Troppo grande: ${issue2.origin ?? "valore"} deve avere ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementi"}`;
            return `Troppo grande: ${issue2.origin ?? "valore"} deve essere ${adj}${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `Troppo piccolo: ${issue2.origin} deve avere ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
            }
            return `Troppo piccolo: ${issue2.origin} deve essere ${adj}${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with")
              return `Stringa non valida: deve iniziare con "${_issue.prefix}"`;
            if (_issue.format === "ends_with")
              return `Stringa non valida: deve terminare con "${_issue.suffix}"`;
            if (_issue.format === "includes")
              return `Stringa non valida: deve includere "${_issue.includes}"`;
            if (_issue.format === "regex")
              return `Stringa non valida: deve corrispondere al pattern ${_issue.pattern}`;
            return `Invalid ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `Numero non valido: deve essere un multiplo di ${issue2.divisor}`;
          case "unrecognized_keys":
            return `Chiav${issue2.keys.length > 1 ? "i" : "e"} non riconosciut${issue2.keys.length > 1 ? "e" : "a"}: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `Chiave non valida in ${issue2.origin}`;
          case "invalid_union":
            return "Input non valido";
          case "invalid_element":
            return `Valore non valido in ${issue2.origin}`;
          default:
            return `Input non valido`;
        }
      };
    }, "error");
    __name(it_default, "default");
  }
});

// ../node_modules/zod/v4/locales/ja.js
function ja_default() {
  return {
    localeError: error24()
  };
}
var error24;
var init_ja = __esm({
  "../node_modules/zod/v4/locales/ja.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error24 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "\u6587\u5B57", verb: "\u3067\u3042\u308B" },
        file: { unit: "\u30D0\u30A4\u30C8", verb: "\u3067\u3042\u308B" },
        array: { unit: "\u8981\u7D20", verb: "\u3067\u3042\u308B" },
        set: { unit: "\u8981\u7D20", verb: "\u3067\u3042\u308B" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "\u5165\u529B\u5024",
        email: "\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9",
        url: "URL",
        emoji: "\u7D75\u6587\u5B57",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO\u65E5\u6642",
        date: "ISO\u65E5\u4ED8",
        time: "ISO\u6642\u523B",
        duration: "ISO\u671F\u9593",
        ipv4: "IPv4\u30A2\u30C9\u30EC\u30B9",
        ipv6: "IPv6\u30A2\u30C9\u30EC\u30B9",
        cidrv4: "IPv4\u7BC4\u56F2",
        cidrv6: "IPv6\u7BC4\u56F2",
        base64: "base64\u30A8\u30F3\u30B3\u30FC\u30C9\u6587\u5B57\u5217",
        base64url: "base64url\u30A8\u30F3\u30B3\u30FC\u30C9\u6587\u5B57\u5217",
        json_string: "JSON\u6587\u5B57\u5217",
        e164: "E.164\u756A\u53F7",
        jwt: "JWT",
        template_literal: "\u5165\u529B\u5024"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "\u6570\u5024",
        array: "\u914D\u5217"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `\u7121\u52B9\u306A\u5165\u529B: instanceof ${issue2.expected}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F\u304C\u3001${received}\u304C\u5165\u529B\u3055\u308C\u307E\u3057\u305F`;
            }
            return `\u7121\u52B9\u306A\u5165\u529B: ${expected}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F\u304C\u3001${received}\u304C\u5165\u529B\u3055\u308C\u307E\u3057\u305F`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `\u7121\u52B9\u306A\u5165\u529B: ${stringifyPrimitive(issue2.values[0])}\u304C\u671F\u5F85\u3055\u308C\u307E\u3057\u305F`;
            return `\u7121\u52B9\u306A\u9078\u629E: ${joinValues(issue2.values, "\u3001")}\u306E\u3044\u305A\u308C\u304B\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
          case "too_big": {
            const adj = issue2.inclusive ? "\u4EE5\u4E0B\u3067\u3042\u308B" : "\u3088\u308A\u5C0F\u3055\u3044";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `\u5927\u304D\u3059\u304E\u308B\u5024: ${issue2.origin ?? "\u5024"}\u306F${issue2.maximum.toString()}${sizing.unit ?? "\u8981\u7D20"}${adj}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
            return `\u5927\u304D\u3059\u304E\u308B\u5024: ${issue2.origin ?? "\u5024"}\u306F${issue2.maximum.toString()}${adj}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? "\u4EE5\u4E0A\u3067\u3042\u308B" : "\u3088\u308A\u5927\u304D\u3044";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `\u5C0F\u3055\u3059\u304E\u308B\u5024: ${issue2.origin}\u306F${issue2.minimum.toString()}${sizing.unit}${adj}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
            return `\u5C0F\u3055\u3059\u304E\u308B\u5024: ${issue2.origin}\u306F${issue2.minimum.toString()}${adj}\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with")
              return `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${_issue.prefix}"\u3067\u59CB\u307E\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
            if (_issue.format === "ends_with")
              return `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${_issue.suffix}"\u3067\u7D42\u308F\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
            if (_issue.format === "includes")
              return `\u7121\u52B9\u306A\u6587\u5B57\u5217: "${_issue.includes}"\u3092\u542B\u3080\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
            if (_issue.format === "regex")
              return `\u7121\u52B9\u306A\u6587\u5B57\u5217: \u30D1\u30BF\u30FC\u30F3${_issue.pattern}\u306B\u4E00\u81F4\u3059\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
            return `\u7121\u52B9\u306A${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `\u7121\u52B9\u306A\u6570\u5024: ${issue2.divisor}\u306E\u500D\u6570\u3067\u3042\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3059`;
          case "unrecognized_keys":
            return `\u8A8D\u8B58\u3055\u308C\u3066\u3044\u306A\u3044\u30AD\u30FC${issue2.keys.length > 1 ? "\u7FA4" : ""}: ${joinValues(issue2.keys, "\u3001")}`;
          case "invalid_key":
            return `${issue2.origin}\u5185\u306E\u7121\u52B9\u306A\u30AD\u30FC`;
          case "invalid_union":
            return "\u7121\u52B9\u306A\u5165\u529B";
          case "invalid_element":
            return `${issue2.origin}\u5185\u306E\u7121\u52B9\u306A\u5024`;
          default:
            return `\u7121\u52B9\u306A\u5165\u529B`;
        }
      };
    }, "error");
    __name(ja_default, "default");
  }
});

// ../node_modules/zod/v4/locales/ka.js
function ka_default() {
  return {
    localeError: error25()
  };
}
var error25;
var init_ka = __esm({
  "../node_modules/zod/v4/locales/ka.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error25 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "\u10E1\u10D8\u10DB\u10D1\u10DD\u10DA\u10DD", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" },
        file: { unit: "\u10D1\u10D0\u10D8\u10E2\u10D8", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" },
        array: { unit: "\u10D4\u10DA\u10D4\u10DB\u10D4\u10DC\u10E2\u10D8", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" },
        set: { unit: "\u10D4\u10DA\u10D4\u10DB\u10D4\u10DC\u10E2\u10D8", verb: "\u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "\u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0",
        email: "\u10D4\u10DA-\u10E4\u10DD\u10E1\u10E2\u10D8\u10E1 \u10DB\u10D8\u10E1\u10D0\u10DB\u10D0\u10E0\u10D7\u10D8",
        url: "URL",
        emoji: "\u10D4\u10DB\u10DD\u10EF\u10D8",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "\u10D7\u10D0\u10E0\u10D8\u10E6\u10D8-\u10D3\u10E0\u10DD",
        date: "\u10D7\u10D0\u10E0\u10D8\u10E6\u10D8",
        time: "\u10D3\u10E0\u10DD",
        duration: "\u10EE\u10D0\u10DC\u10D2\u10E0\u10EB\u10DA\u10D8\u10D5\u10DD\u10D1\u10D0",
        ipv4: "IPv4 \u10DB\u10D8\u10E1\u10D0\u10DB\u10D0\u10E0\u10D7\u10D8",
        ipv6: "IPv6 \u10DB\u10D8\u10E1\u10D0\u10DB\u10D0\u10E0\u10D7\u10D8",
        cidrv4: "IPv4 \u10D3\u10D8\u10D0\u10DE\u10D0\u10D6\u10DD\u10DC\u10D8",
        cidrv6: "IPv6 \u10D3\u10D8\u10D0\u10DE\u10D0\u10D6\u10DD\u10DC\u10D8",
        base64: "base64-\u10D9\u10DD\u10D3\u10D8\u10E0\u10D4\u10D1\u10E3\u10DA\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8",
        base64url: "base64url-\u10D9\u10DD\u10D3\u10D8\u10E0\u10D4\u10D1\u10E3\u10DA\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8",
        json_string: "JSON \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8",
        e164: "E.164 \u10DC\u10DD\u10DB\u10D4\u10E0\u10D8",
        jwt: "JWT",
        template_literal: "\u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "\u10E0\u10D8\u10EA\u10EE\u10D5\u10D8",
        string: "\u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8",
        boolean: "\u10D1\u10E3\u10DA\u10D4\u10D0\u10DC\u10D8",
        function: "\u10E4\u10E3\u10DC\u10E5\u10EA\u10D8\u10D0",
        array: "\u10DB\u10D0\u10E1\u10D8\u10D5\u10D8"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 instanceof ${issue2.expected}, \u10DB\u10D8\u10E6\u10D4\u10D1\u10E3\u10DA\u10D8 ${received}`;
            }
            return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${expected}, \u10DB\u10D8\u10E6\u10D4\u10D1\u10E3\u10DA\u10D8 ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${stringifyPrimitive(issue2.values[0])}`;
            return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10D5\u10D0\u10E0\u10D8\u10D0\u10DC\u10E2\u10D8: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8\u10D0 \u10D4\u10E0\u10D7-\u10D4\u10E0\u10D7\u10D8 ${joinValues(issue2.values, "|")}-\u10D3\u10D0\u10DC`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10D3\u10D8\u10D3\u10D8: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${issue2.origin ?? "\u10DB\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10DA\u10DD\u10D1\u10D0"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit}`;
            return `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10D3\u10D8\u10D3\u10D8: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${issue2.origin ?? "\u10DB\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10DA\u10DD\u10D1\u10D0"} \u10D8\u10E7\u10DD\u10E1 ${adj}${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10DE\u10D0\u10E2\u10D0\u10E0\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
            }
            return `\u10D6\u10D4\u10D3\u10DB\u10D4\u10E2\u10D0\u10D3 \u10DE\u10D0\u10E2\u10D0\u10E0\u10D0: \u10DB\u10DD\u10E1\u10D0\u10DA\u10DD\u10D3\u10DC\u10D4\u10DA\u10D8 ${issue2.origin} \u10D8\u10E7\u10DD\u10E1 ${adj}${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with") {
              return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10D8\u10EC\u10E7\u10D4\u10D1\u10DD\u10D3\u10D4\u10E1 "${_issue.prefix}"-\u10D8\u10D7`;
            }
            if (_issue.format === "ends_with")
              return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10DB\u10D7\u10D0\u10D5\u10E0\u10D3\u10D4\u10D1\u10DD\u10D3\u10D4\u10E1 "${_issue.suffix}"-\u10D8\u10D7`;
            if (_issue.format === "includes")
              return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D8\u10EA\u10D0\u10D5\u10D3\u10D4\u10E1 "${_issue.includes}"-\u10E1`;
            if (_issue.format === "regex")
              return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E1\u10E2\u10E0\u10D8\u10DC\u10D2\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10E8\u10D4\u10D4\u10E1\u10D0\u10D1\u10D0\u10DB\u10D4\u10D1\u10DD\u10D3\u10D4\u10E1 \u10E8\u10D0\u10D1\u10DA\u10DD\u10DC\u10E1 ${_issue.pattern}`;
            return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E0\u10D8\u10EA\u10EE\u10D5\u10D8: \u10E3\u10DC\u10D3\u10D0 \u10D8\u10E7\u10DD\u10E1 ${issue2.divisor}-\u10D8\u10E1 \u10EF\u10D4\u10E0\u10D0\u10D3\u10D8`;
          case "unrecognized_keys":
            return `\u10E3\u10EA\u10DC\u10DD\u10D1\u10D8 \u10D2\u10D0\u10E1\u10D0\u10E6\u10D4\u10D1${issue2.keys.length > 1 ? "\u10D4\u10D1\u10D8" : "\u10D8"}: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10D2\u10D0\u10E1\u10D0\u10E6\u10D4\u10D1\u10D8 ${issue2.origin}-\u10E8\u10D8`;
          case "invalid_union":
            return "\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0";
          case "invalid_element":
            return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10DB\u10DC\u10D8\u10E8\u10D5\u10DC\u10D4\u10DA\u10DD\u10D1\u10D0 ${issue2.origin}-\u10E8\u10D8`;
          default:
            return `\u10D0\u10E0\u10D0\u10E1\u10EC\u10DD\u10E0\u10D8 \u10E8\u10D4\u10E7\u10D5\u10D0\u10DC\u10D0`;
        }
      };
    }, "error");
    __name(ka_default, "default");
  }
});

// ../node_modules/zod/v4/locales/km.js
function km_default() {
  return {
    localeError: error26()
  };
}
var error26;
var init_km = __esm({
  "../node_modules/zod/v4/locales/km.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error26 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "\u178F\u17BD\u17A2\u1780\u17D2\u179F\u179A", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" },
        file: { unit: "\u1794\u17C3", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" },
        array: { unit: "\u1792\u17B6\u178F\u17BB", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" },
        set: { unit: "\u1792\u17B6\u178F\u17BB", verb: "\u1782\u17BD\u179A\u1798\u17B6\u1793" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B",
        email: "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793\u17A2\u17CA\u17B8\u1798\u17C2\u179B",
        url: "URL",
        emoji: "\u179F\u1789\u17D2\u1789\u17B6\u17A2\u17B6\u179A\u1798\u17D2\u1798\u178E\u17CD",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "\u1780\u17B6\u179B\u1794\u179A\u17B7\u1785\u17D2\u1786\u17C1\u1791 \u1793\u17B7\u1784\u1798\u17C9\u17C4\u1784 ISO",
        date: "\u1780\u17B6\u179B\u1794\u179A\u17B7\u1785\u17D2\u1786\u17C1\u1791 ISO",
        time: "\u1798\u17C9\u17C4\u1784 ISO",
        duration: "\u179A\u1799\u17C8\u1796\u17C1\u179B ISO",
        ipv4: "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv4",
        ipv6: "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv6",
        cidrv4: "\u178A\u17C2\u1793\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv4",
        cidrv6: "\u178A\u17C2\u1793\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793 IPv6",
        base64: "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u17A2\u17CA\u17B7\u1780\u17BC\u178A base64",
        base64url: "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u17A2\u17CA\u17B7\u1780\u17BC\u178A base64url",
        json_string: "\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A JSON",
        e164: "\u179B\u17C1\u1781 E.164",
        jwt: "JWT",
        template_literal: "\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "\u179B\u17C1\u1781",
        array: "\u17A2\u17B6\u179A\u17C1 (Array)",
        null: "\u1782\u17D2\u1798\u17B6\u1793\u178F\u1798\u17D2\u179B\u17C3 (null)"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A instanceof ${issue2.expected} \u1794\u17C9\u17BB\u1793\u17D2\u178F\u17C2\u1791\u1791\u17BD\u179B\u1794\u17B6\u1793 ${received}`;
            }
            return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${expected} \u1794\u17C9\u17BB\u1793\u17D2\u178F\u17C2\u1791\u1791\u17BD\u179B\u1794\u17B6\u1793 ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1794\u1789\u17D2\u1785\u17BC\u179B\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${stringifyPrimitive(issue2.values[0])}`;
            return `\u1787\u1798\u17D2\u179A\u17BE\u179F\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1787\u17B6\u1798\u17BD\u1799\u1780\u17D2\u1793\u17BB\u1784\u1785\u17C6\u178E\u17C4\u1798 ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `\u1792\u17C6\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${issue2.origin ?? "\u178F\u1798\u17D2\u179B\u17C3"} ${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "\u1792\u17B6\u178F\u17BB"}`;
            return `\u1792\u17C6\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${issue2.origin ?? "\u178F\u1798\u17D2\u179B\u17C3"} ${adj} ${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `\u178F\u17BC\u1785\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${issue2.origin} ${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
            }
            return `\u178F\u17BC\u1785\u1796\u17C1\u1780\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1780\u17B6\u179A ${issue2.origin} ${adj} ${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with") {
              return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1785\u17B6\u1794\u17CB\u1795\u17D2\u178F\u17BE\u1798\u178A\u17C4\u1799 "${_issue.prefix}"`;
            }
            if (_issue.format === "ends_with")
              return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1794\u1789\u17D2\u1785\u1794\u17CB\u178A\u17C4\u1799 "${_issue.suffix}"`;
            if (_issue.format === "includes")
              return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u1798\u17B6\u1793 "${_issue.includes}"`;
            if (_issue.format === "regex")
              return `\u1781\u17D2\u179F\u17C2\u17A2\u1780\u17D2\u179F\u179A\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u178F\u17C2\u1795\u17D2\u1782\u17BC\u1795\u17D2\u1782\u1784\u1793\u17B9\u1784\u1791\u1798\u17D2\u179A\u1784\u17CB\u178A\u17C2\u179B\u1794\u17B6\u1793\u1780\u17C6\u178E\u178F\u17CB ${_issue.pattern}`;
            return `\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `\u179B\u17C1\u1781\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u17D6 \u178F\u17D2\u179A\u17BC\u179C\u178F\u17C2\u1787\u17B6\u1796\u17A0\u17BB\u1782\u17BB\u178E\u1793\u17C3 ${issue2.divisor}`;
          case "unrecognized_keys":
            return `\u179A\u1780\u1783\u17BE\u1789\u179F\u17C4\u1798\u17B7\u1793\u179F\u17D2\u1782\u17B6\u179B\u17CB\u17D6 ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `\u179F\u17C4\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u1793\u17C5\u1780\u17D2\u1793\u17BB\u1784 ${issue2.origin}`;
          case "invalid_union":
            return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C`;
          case "invalid_element":
            return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C\u1793\u17C5\u1780\u17D2\u1793\u17BB\u1784 ${issue2.origin}`;
          default:
            return `\u1791\u17B7\u1793\u17D2\u1793\u1793\u17D0\u1799\u1798\u17B7\u1793\u178F\u17D2\u179A\u17B9\u1798\u178F\u17D2\u179A\u17BC\u179C`;
        }
      };
    }, "error");
    __name(km_default, "default");
  }
});

// ../node_modules/zod/v4/locales/kh.js
function kh_default() {
  return km_default();
}
var init_kh = __esm({
  "../node_modules/zod/v4/locales/kh.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_km();
    __name(kh_default, "default");
  }
});

// ../node_modules/zod/v4/locales/ko.js
function ko_default() {
  return {
    localeError: error27()
  };
}
var error27;
var init_ko = __esm({
  "../node_modules/zod/v4/locales/ko.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error27 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "\uBB38\uC790", verb: "to have" },
        file: { unit: "\uBC14\uC774\uD2B8", verb: "to have" },
        array: { unit: "\uAC1C", verb: "to have" },
        set: { unit: "\uAC1C", verb: "to have" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "\uC785\uB825",
        email: "\uC774\uBA54\uC77C \uC8FC\uC18C",
        url: "URL",
        emoji: "\uC774\uBAA8\uC9C0",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO \uB0A0\uC9DC\uC2DC\uAC04",
        date: "ISO \uB0A0\uC9DC",
        time: "ISO \uC2DC\uAC04",
        duration: "ISO \uAE30\uAC04",
        ipv4: "IPv4 \uC8FC\uC18C",
        ipv6: "IPv6 \uC8FC\uC18C",
        cidrv4: "IPv4 \uBC94\uC704",
        cidrv6: "IPv6 \uBC94\uC704",
        base64: "base64 \uC778\uCF54\uB529 \uBB38\uC790\uC5F4",
        base64url: "base64url \uC778\uCF54\uB529 \uBB38\uC790\uC5F4",
        json_string: "JSON \uBB38\uC790\uC5F4",
        e164: "E.164 \uBC88\uD638",
        jwt: "JWT",
        template_literal: "\uC785\uB825"
      };
      const TypeDictionary = {
        nan: "NaN"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `\uC798\uBABB\uB41C \uC785\uB825: \uC608\uC0C1 \uD0C0\uC785\uC740 instanceof ${issue2.expected}, \uBC1B\uC740 \uD0C0\uC785\uC740 ${received}\uC785\uB2C8\uB2E4`;
            }
            return `\uC798\uBABB\uB41C \uC785\uB825: \uC608\uC0C1 \uD0C0\uC785\uC740 ${expected}, \uBC1B\uC740 \uD0C0\uC785\uC740 ${received}\uC785\uB2C8\uB2E4`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `\uC798\uBABB\uB41C \uC785\uB825: \uAC12\uC740 ${stringifyPrimitive(issue2.values[0])} \uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4`;
            return `\uC798\uBABB\uB41C \uC635\uC158: ${joinValues(issue2.values, "\uB610\uB294 ")} \uC911 \uD558\uB098\uC5EC\uC57C \uD569\uB2C8\uB2E4`;
          case "too_big": {
            const adj = issue2.inclusive ? "\uC774\uD558" : "\uBBF8\uB9CC";
            const suffix = adj === "\uBBF8\uB9CC" ? "\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4" : "\uC5EC\uC57C \uD569\uB2C8\uB2E4";
            const sizing = getSizing(issue2.origin);
            const unit = sizing?.unit ?? "\uC694\uC18C";
            if (sizing)
              return `${issue2.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4: ${issue2.maximum.toString()}${unit} ${adj}${suffix}`;
            return `${issue2.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uD07D\uB2C8\uB2E4: ${issue2.maximum.toString()} ${adj}${suffix}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? "\uC774\uC0C1" : "\uCD08\uACFC";
            const suffix = adj === "\uC774\uC0C1" ? "\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4" : "\uC5EC\uC57C \uD569\uB2C8\uB2E4";
            const sizing = getSizing(issue2.origin);
            const unit = sizing?.unit ?? "\uC694\uC18C";
            if (sizing) {
              return `${issue2.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uC791\uC2B5\uB2C8\uB2E4: ${issue2.minimum.toString()}${unit} ${adj}${suffix}`;
            }
            return `${issue2.origin ?? "\uAC12"}\uC774 \uB108\uBB34 \uC791\uC2B5\uB2C8\uB2E4: ${issue2.minimum.toString()} ${adj}${suffix}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with") {
              return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${_issue.prefix}"(\uC73C)\uB85C \uC2DC\uC791\uD574\uC57C \uD569\uB2C8\uB2E4`;
            }
            if (_issue.format === "ends_with")
              return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${_issue.suffix}"(\uC73C)\uB85C \uB05D\uB098\uC57C \uD569\uB2C8\uB2E4`;
            if (_issue.format === "includes")
              return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: "${_issue.includes}"\uC744(\uB97C) \uD3EC\uD568\uD574\uC57C \uD569\uB2C8\uB2E4`;
            if (_issue.format === "regex")
              return `\uC798\uBABB\uB41C \uBB38\uC790\uC5F4: \uC815\uADDC\uC2DD ${_issue.pattern} \uD328\uD134\uACFC \uC77C\uCE58\uD574\uC57C \uD569\uB2C8\uB2E4`;
            return `\uC798\uBABB\uB41C ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `\uC798\uBABB\uB41C \uC22B\uC790: ${issue2.divisor}\uC758 \uBC30\uC218\uC5EC\uC57C \uD569\uB2C8\uB2E4`;
          case "unrecognized_keys":
            return `\uC778\uC2DD\uD560 \uC218 \uC5C6\uB294 \uD0A4: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `\uC798\uBABB\uB41C \uD0A4: ${issue2.origin}`;
          case "invalid_union":
            return `\uC798\uBABB\uB41C \uC785\uB825`;
          case "invalid_element":
            return `\uC798\uBABB\uB41C \uAC12: ${issue2.origin}`;
          default:
            return `\uC798\uBABB\uB41C \uC785\uB825`;
        }
      };
    }, "error");
    __name(ko_default, "default");
  }
});

// ../node_modules/zod/v4/locales/lt.js
function getUnitTypeFromNumber(number4) {
  const abs = Math.abs(number4);
  const last = abs % 10;
  const last2 = abs % 100;
  if (last2 >= 11 && last2 <= 19 || last === 0)
    return "many";
  if (last === 1)
    return "one";
  return "few";
}
function lt_default() {
  return {
    localeError: error28()
  };
}
var capitalizeFirstCharacter, error28;
var init_lt = __esm({
  "../node_modules/zod/v4/locales/lt.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    capitalizeFirstCharacter = /* @__PURE__ */ __name((text) => {
      return text.charAt(0).toUpperCase() + text.slice(1);
    }, "capitalizeFirstCharacter");
    __name(getUnitTypeFromNumber, "getUnitTypeFromNumber");
    error28 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: {
          unit: {
            one: "simbolis",
            few: "simboliai",
            many: "simboli\u0173"
          },
          verb: {
            smaller: {
              inclusive: "turi b\u016Bti ne ilgesn\u0117 kaip",
              notInclusive: "turi b\u016Bti trumpesn\u0117 kaip"
            },
            bigger: {
              inclusive: "turi b\u016Bti ne trumpesn\u0117 kaip",
              notInclusive: "turi b\u016Bti ilgesn\u0117 kaip"
            }
          }
        },
        file: {
          unit: {
            one: "baitas",
            few: "baitai",
            many: "bait\u0173"
          },
          verb: {
            smaller: {
              inclusive: "turi b\u016Bti ne didesnis kaip",
              notInclusive: "turi b\u016Bti ma\u017Eesnis kaip"
            },
            bigger: {
              inclusive: "turi b\u016Bti ne ma\u017Eesnis kaip",
              notInclusive: "turi b\u016Bti didesnis kaip"
            }
          }
        },
        array: {
          unit: {
            one: "element\u0105",
            few: "elementus",
            many: "element\u0173"
          },
          verb: {
            smaller: {
              inclusive: "turi tur\u0117ti ne daugiau kaip",
              notInclusive: "turi tur\u0117ti ma\u017Eiau kaip"
            },
            bigger: {
              inclusive: "turi tur\u0117ti ne ma\u017Eiau kaip",
              notInclusive: "turi tur\u0117ti daugiau kaip"
            }
          }
        },
        set: {
          unit: {
            one: "element\u0105",
            few: "elementus",
            many: "element\u0173"
          },
          verb: {
            smaller: {
              inclusive: "turi tur\u0117ti ne daugiau kaip",
              notInclusive: "turi tur\u0117ti ma\u017Eiau kaip"
            },
            bigger: {
              inclusive: "turi tur\u0117ti ne ma\u017Eiau kaip",
              notInclusive: "turi tur\u0117ti daugiau kaip"
            }
          }
        }
      };
      function getSizing(origin, unitType, inclusive, targetShouldBe) {
        const result = Sizable[origin] ?? null;
        if (result === null)
          return result;
        return {
          unit: result.unit[unitType],
          verb: result.verb[targetShouldBe][inclusive ? "inclusive" : "notInclusive"]
        };
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "\u012Fvestis",
        email: "el. pa\u0161to adresas",
        url: "URL",
        emoji: "jaustukas",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO data ir laikas",
        date: "ISO data",
        time: "ISO laikas",
        duration: "ISO trukm\u0117",
        ipv4: "IPv4 adresas",
        ipv6: "IPv6 adresas",
        cidrv4: "IPv4 tinklo prefiksas (CIDR)",
        cidrv6: "IPv6 tinklo prefiksas (CIDR)",
        base64: "base64 u\u017Ekoduota eilut\u0117",
        base64url: "base64url u\u017Ekoduota eilut\u0117",
        json_string: "JSON eilut\u0117",
        e164: "E.164 numeris",
        jwt: "JWT",
        template_literal: "\u012Fvestis"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "skai\u010Dius",
        bigint: "sveikasis skai\u010Dius",
        string: "eilut\u0117",
        boolean: "login\u0117 reik\u0161m\u0117",
        undefined: "neapibr\u0117\u017Eta reik\u0161m\u0117",
        function: "funkcija",
        symbol: "simbolis",
        array: "masyvas",
        object: "objektas",
        null: "nulin\u0117 reik\u0161m\u0117"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `Gautas tipas ${received}, o tik\u0117tasi - instanceof ${issue2.expected}`;
            }
            return `Gautas tipas ${received}, o tik\u0117tasi - ${expected}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `Privalo b\u016Bti ${stringifyPrimitive(issue2.values[0])}`;
            return `Privalo b\u016Bti vienas i\u0161 ${joinValues(issue2.values, "|")} pasirinkim\u0173`;
          case "too_big": {
            const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
            const sizing = getSizing(issue2.origin, getUnitTypeFromNumber(Number(issue2.maximum)), issue2.inclusive ?? false, "smaller");
            if (sizing?.verb)
              return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reik\u0161m\u0117")} ${sizing.verb} ${issue2.maximum.toString()} ${sizing.unit ?? "element\u0173"}`;
            const adj = issue2.inclusive ? "ne didesnis kaip" : "ma\u017Eesnis kaip";
            return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reik\u0161m\u0117")} turi b\u016Bti ${adj} ${issue2.maximum.toString()} ${sizing?.unit}`;
          }
          case "too_small": {
            const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
            const sizing = getSizing(issue2.origin, getUnitTypeFromNumber(Number(issue2.minimum)), issue2.inclusive ?? false, "bigger");
            if (sizing?.verb)
              return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reik\u0161m\u0117")} ${sizing.verb} ${issue2.minimum.toString()} ${sizing.unit ?? "element\u0173"}`;
            const adj = issue2.inclusive ? "ne ma\u017Eesnis kaip" : "didesnis kaip";
            return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reik\u0161m\u0117")} turi b\u016Bti ${adj} ${issue2.minimum.toString()} ${sizing?.unit}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with") {
              return `Eilut\u0117 privalo prasid\u0117ti "${_issue.prefix}"`;
            }
            if (_issue.format === "ends_with")
              return `Eilut\u0117 privalo pasibaigti "${_issue.suffix}"`;
            if (_issue.format === "includes")
              return `Eilut\u0117 privalo \u012Ftraukti "${_issue.includes}"`;
            if (_issue.format === "regex")
              return `Eilut\u0117 privalo atitikti ${_issue.pattern}`;
            return `Neteisingas ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `Skai\u010Dius privalo b\u016Bti ${issue2.divisor} kartotinis.`;
          case "unrecognized_keys":
            return `Neatpa\u017Eint${issue2.keys.length > 1 ? "i" : "as"} rakt${issue2.keys.length > 1 ? "ai" : "as"}: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return "Rastas klaidingas raktas";
          case "invalid_union":
            return "Klaidinga \u012Fvestis";
          case "invalid_element": {
            const origin = TypeDictionary[issue2.origin] ?? issue2.origin;
            return `${capitalizeFirstCharacter(origin ?? issue2.origin ?? "reik\u0161m\u0117")} turi klaiding\u0105 \u012Fvest\u012F`;
          }
          default:
            return "Klaidinga \u012Fvestis";
        }
      };
    }, "error");
    __name(lt_default, "default");
  }
});

// ../node_modules/zod/v4/locales/mk.js
function mk_default() {
  return {
    localeError: error29()
  };
}
var error29;
var init_mk = __esm({
  "../node_modules/zod/v4/locales/mk.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error29 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "\u0437\u043D\u0430\u0446\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" },
        file: { unit: "\u0431\u0430\u0458\u0442\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" },
        array: { unit: "\u0441\u0442\u0430\u0432\u043A\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" },
        set: { unit: "\u0441\u0442\u0430\u0432\u043A\u0438", verb: "\u0434\u0430 \u0438\u043C\u0430\u0430\u0442" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "\u0432\u043D\u0435\u0441",
        email: "\u0430\u0434\u0440\u0435\u0441\u0430 \u043D\u0430 \u0435-\u043F\u043E\u0448\u0442\u0430",
        url: "URL",
        emoji: "\u0435\u043C\u043E\u045F\u0438",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO \u0434\u0430\u0442\u0443\u043C \u0438 \u0432\u0440\u0435\u043C\u0435",
        date: "ISO \u0434\u0430\u0442\u0443\u043C",
        time: "ISO \u0432\u0440\u0435\u043C\u0435",
        duration: "ISO \u0432\u0440\u0435\u043C\u0435\u0442\u0440\u0430\u0435\u045A\u0435",
        ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441\u0430",
        ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441\u0430",
        cidrv4: "IPv4 \u043E\u043F\u0441\u0435\u0433",
        cidrv6: "IPv6 \u043E\u043F\u0441\u0435\u0433",
        base64: "base64-\u0435\u043D\u043A\u043E\u0434\u0438\u0440\u0430\u043D\u0430 \u043D\u0438\u0437\u0430",
        base64url: "base64url-\u0435\u043D\u043A\u043E\u0434\u0438\u0440\u0430\u043D\u0430 \u043D\u0438\u0437\u0430",
        json_string: "JSON \u043D\u0438\u0437\u0430",
        e164: "E.164 \u0431\u0440\u043E\u0458",
        jwt: "JWT",
        template_literal: "\u0432\u043D\u0435\u0441"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "\u0431\u0440\u043E\u0458",
        array: "\u043D\u0438\u0437\u0430"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 instanceof ${issue2.expected}, \u043F\u0440\u0438\u043C\u0435\u043D\u043E ${received}`;
            }
            return `\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${expected}, \u043F\u0440\u0438\u043C\u0435\u043D\u043E ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `Invalid input: expected ${stringifyPrimitive(issue2.values[0])}`;
            return `\u0413\u0440\u0435\u0448\u0430\u043D\u0430 \u043E\u043F\u0446\u0438\u0458\u0430: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 \u0435\u0434\u043D\u0430 ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u0433\u043E\u043B\u0435\u043C: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${issue2.origin ?? "\u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442\u0430"} \u0434\u0430 \u0438\u043C\u0430 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0438"}`;
            return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u0433\u043E\u043B\u0435\u043C: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${issue2.origin ?? "\u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442\u0430"} \u0434\u0430 \u0431\u0438\u0434\u0435 ${adj}${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u043C\u0430\u043B: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${issue2.origin} \u0434\u0430 \u0438\u043C\u0430 ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
            }
            return `\u041F\u0440\u0435\u043C\u043D\u043E\u0433\u0443 \u043C\u0430\u043B: \u0441\u0435 \u043E\u0447\u0435\u043A\u0443\u0432\u0430 ${issue2.origin} \u0434\u0430 \u0431\u0438\u0434\u0435 ${adj}${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with") {
              return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0437\u0430\u043F\u043E\u0447\u043D\u0443\u0432\u0430 \u0441\u043E "${_issue.prefix}"`;
            }
            if (_issue.format === "ends_with")
              return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0437\u0430\u0432\u0440\u0448\u0443\u0432\u0430 \u0441\u043E "${_issue.suffix}"`;
            if (_issue.format === "includes")
              return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0432\u043A\u043B\u0443\u0447\u0443\u0432\u0430 "${_issue.includes}"`;
            if (_issue.format === "regex")
              return `\u041D\u0435\u0432\u0430\u0436\u0435\u0447\u043A\u0430 \u043D\u0438\u0437\u0430: \u043C\u043E\u0440\u0430 \u0434\u0430 \u043E\u0434\u0433\u043E\u0430\u0440\u0430 \u043D\u0430 \u043F\u0430\u0442\u0435\u0440\u043D\u043E\u0442 ${_issue.pattern}`;
            return `Invalid ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `\u0413\u0440\u0435\u0448\u0435\u043D \u0431\u0440\u043E\u0458: \u043C\u043E\u0440\u0430 \u0434\u0430 \u0431\u0438\u0434\u0435 \u0434\u0435\u043B\u0438\u0432 \u0441\u043E ${issue2.divisor}`;
          case "unrecognized_keys":
            return `${issue2.keys.length > 1 ? "\u041D\u0435\u043F\u0440\u0435\u043F\u043E\u0437\u043D\u0430\u0435\u043D\u0438 \u043A\u043B\u0443\u0447\u0435\u0432\u0438" : "\u041D\u0435\u043F\u0440\u0435\u043F\u043E\u0437\u043D\u0430\u0435\u043D \u043A\u043B\u0443\u0447"}: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `\u0413\u0440\u0435\u0448\u0435\u043D \u043A\u043B\u0443\u0447 \u0432\u043E ${issue2.origin}`;
          case "invalid_union":
            return "\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441";
          case "invalid_element":
            return `\u0413\u0440\u0435\u0448\u043D\u0430 \u0432\u0440\u0435\u0434\u043D\u043E\u0441\u0442 \u0432\u043E ${issue2.origin}`;
          default:
            return `\u0413\u0440\u0435\u0448\u0435\u043D \u0432\u043D\u0435\u0441`;
        }
      };
    }, "error");
    __name(mk_default, "default");
  }
});

// ../node_modules/zod/v4/locales/ms.js
function ms_default() {
  return {
    localeError: error30()
  };
}
var error30;
var init_ms = __esm({
  "../node_modules/zod/v4/locales/ms.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error30 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "aksara", verb: "mempunyai" },
        file: { unit: "bait", verb: "mempunyai" },
        array: { unit: "elemen", verb: "mempunyai" },
        set: { unit: "elemen", verb: "mempunyai" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "input",
        email: "alamat e-mel",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "tarikh masa ISO",
        date: "tarikh ISO",
        time: "masa ISO",
        duration: "tempoh ISO",
        ipv4: "alamat IPv4",
        ipv6: "alamat IPv6",
        cidrv4: "julat IPv4",
        cidrv6: "julat IPv6",
        base64: "string dikodkan base64",
        base64url: "string dikodkan base64url",
        json_string: "string JSON",
        e164: "nombor E.164",
        jwt: "JWT",
        template_literal: "input"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "nombor"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `Input tidak sah: dijangka instanceof ${issue2.expected}, diterima ${received}`;
            }
            return `Input tidak sah: dijangka ${expected}, diterima ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `Input tidak sah: dijangka ${stringifyPrimitive(issue2.values[0])}`;
            return `Pilihan tidak sah: dijangka salah satu daripada ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `Terlalu besar: dijangka ${issue2.origin ?? "nilai"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elemen"}`;
            return `Terlalu besar: dijangka ${issue2.origin ?? "nilai"} adalah ${adj}${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `Terlalu kecil: dijangka ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
            }
            return `Terlalu kecil: dijangka ${issue2.origin} adalah ${adj}${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with")
              return `String tidak sah: mesti bermula dengan "${_issue.prefix}"`;
            if (_issue.format === "ends_with")
              return `String tidak sah: mesti berakhir dengan "${_issue.suffix}"`;
            if (_issue.format === "includes")
              return `String tidak sah: mesti mengandungi "${_issue.includes}"`;
            if (_issue.format === "regex")
              return `String tidak sah: mesti sepadan dengan corak ${_issue.pattern}`;
            return `${FormatDictionary[_issue.format] ?? issue2.format} tidak sah`;
          }
          case "not_multiple_of":
            return `Nombor tidak sah: perlu gandaan ${issue2.divisor}`;
          case "unrecognized_keys":
            return `Kunci tidak dikenali: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `Kunci tidak sah dalam ${issue2.origin}`;
          case "invalid_union":
            return "Input tidak sah";
          case "invalid_element":
            return `Nilai tidak sah dalam ${issue2.origin}`;
          default:
            return `Input tidak sah`;
        }
      };
    }, "error");
    __name(ms_default, "default");
  }
});

// ../node_modules/zod/v4/locales/nl.js
function nl_default() {
  return {
    localeError: error31()
  };
}
var error31;
var init_nl = __esm({
  "../node_modules/zod/v4/locales/nl.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error31 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "tekens", verb: "heeft" },
        file: { unit: "bytes", verb: "heeft" },
        array: { unit: "elementen", verb: "heeft" },
        set: { unit: "elementen", verb: "heeft" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "invoer",
        email: "emailadres",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO datum en tijd",
        date: "ISO datum",
        time: "ISO tijd",
        duration: "ISO duur",
        ipv4: "IPv4-adres",
        ipv6: "IPv6-adres",
        cidrv4: "IPv4-bereik",
        cidrv6: "IPv6-bereik",
        base64: "base64-gecodeerde tekst",
        base64url: "base64 URL-gecodeerde tekst",
        json_string: "JSON string",
        e164: "E.164-nummer",
        jwt: "JWT",
        template_literal: "invoer"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "getal"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `Ongeldige invoer: verwacht instanceof ${issue2.expected}, ontving ${received}`;
            }
            return `Ongeldige invoer: verwacht ${expected}, ontving ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `Ongeldige invoer: verwacht ${stringifyPrimitive(issue2.values[0])}`;
            return `Ongeldige optie: verwacht \xE9\xE9n van ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            const longName = issue2.origin === "date" ? "laat" : issue2.origin === "string" ? "lang" : "groot";
            if (sizing)
              return `Te ${longName}: verwacht dat ${issue2.origin ?? "waarde"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementen"} ${sizing.verb}`;
            return `Te ${longName}: verwacht dat ${issue2.origin ?? "waarde"} ${adj}${issue2.maximum.toString()} is`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            const shortName = issue2.origin === "date" ? "vroeg" : issue2.origin === "string" ? "kort" : "klein";
            if (sizing) {
              return `Te ${shortName}: verwacht dat ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
            }
            return `Te ${shortName}: verwacht dat ${issue2.origin} ${adj}${issue2.minimum.toString()} is`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with") {
              return `Ongeldige tekst: moet met "${_issue.prefix}" beginnen`;
            }
            if (_issue.format === "ends_with")
              return `Ongeldige tekst: moet op "${_issue.suffix}" eindigen`;
            if (_issue.format === "includes")
              return `Ongeldige tekst: moet "${_issue.includes}" bevatten`;
            if (_issue.format === "regex")
              return `Ongeldige tekst: moet overeenkomen met patroon ${_issue.pattern}`;
            return `Ongeldig: ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `Ongeldig getal: moet een veelvoud van ${issue2.divisor} zijn`;
          case "unrecognized_keys":
            return `Onbekende key${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `Ongeldige key in ${issue2.origin}`;
          case "invalid_union":
            return "Ongeldige invoer";
          case "invalid_element":
            return `Ongeldige waarde in ${issue2.origin}`;
          default:
            return `Ongeldige invoer`;
        }
      };
    }, "error");
    __name(nl_default, "default");
  }
});

// ../node_modules/zod/v4/locales/no.js
function no_default() {
  return {
    localeError: error32()
  };
}
var error32;
var init_no = __esm({
  "../node_modules/zod/v4/locales/no.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error32 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "tegn", verb: "\xE5 ha" },
        file: { unit: "bytes", verb: "\xE5 ha" },
        array: { unit: "elementer", verb: "\xE5 inneholde" },
        set: { unit: "elementer", verb: "\xE5 inneholde" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "input",
        email: "e-postadresse",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO dato- og klokkeslett",
        date: "ISO-dato",
        time: "ISO-klokkeslett",
        duration: "ISO-varighet",
        ipv4: "IPv4-omr\xE5de",
        ipv6: "IPv6-omr\xE5de",
        cidrv4: "IPv4-spekter",
        cidrv6: "IPv6-spekter",
        base64: "base64-enkodet streng",
        base64url: "base64url-enkodet streng",
        json_string: "JSON-streng",
        e164: "E.164-nummer",
        jwt: "JWT",
        template_literal: "input"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "tall",
        array: "liste"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `Ugyldig input: forventet instanceof ${issue2.expected}, fikk ${received}`;
            }
            return `Ugyldig input: forventet ${expected}, fikk ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `Ugyldig verdi: forventet ${stringifyPrimitive(issue2.values[0])}`;
            return `Ugyldig valg: forventet en av ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `For stor(t): forventet ${issue2.origin ?? "value"} til \xE5 ha ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementer"}`;
            return `For stor(t): forventet ${issue2.origin ?? "value"} til \xE5 ha ${adj}${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `For lite(n): forventet ${issue2.origin} til \xE5 ha ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
            }
            return `For lite(n): forventet ${issue2.origin} til \xE5 ha ${adj}${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with")
              return `Ugyldig streng: m\xE5 starte med "${_issue.prefix}"`;
            if (_issue.format === "ends_with")
              return `Ugyldig streng: m\xE5 ende med "${_issue.suffix}"`;
            if (_issue.format === "includes")
              return `Ugyldig streng: m\xE5 inneholde "${_issue.includes}"`;
            if (_issue.format === "regex")
              return `Ugyldig streng: m\xE5 matche m\xF8nsteret ${_issue.pattern}`;
            return `Ugyldig ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `Ugyldig tall: m\xE5 v\xE6re et multiplum av ${issue2.divisor}`;
          case "unrecognized_keys":
            return `${issue2.keys.length > 1 ? "Ukjente n\xF8kler" : "Ukjent n\xF8kkel"}: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `Ugyldig n\xF8kkel i ${issue2.origin}`;
          case "invalid_union":
            return "Ugyldig input";
          case "invalid_element":
            return `Ugyldig verdi i ${issue2.origin}`;
          default:
            return `Ugyldig input`;
        }
      };
    }, "error");
    __name(no_default, "default");
  }
});

// ../node_modules/zod/v4/locales/ota.js
function ota_default() {
  return {
    localeError: error33()
  };
}
var error33;
var init_ota = __esm({
  "../node_modules/zod/v4/locales/ota.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error33 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "harf", verb: "olmal\u0131d\u0131r" },
        file: { unit: "bayt", verb: "olmal\u0131d\u0131r" },
        array: { unit: "unsur", verb: "olmal\u0131d\u0131r" },
        set: { unit: "unsur", verb: "olmal\u0131d\u0131r" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "giren",
        email: "epostag\xE2h",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO heng\xE2m\u0131",
        date: "ISO tarihi",
        time: "ISO zaman\u0131",
        duration: "ISO m\xFCddeti",
        ipv4: "IPv4 ni\u015F\xE2n\u0131",
        ipv6: "IPv6 ni\u015F\xE2n\u0131",
        cidrv4: "IPv4 menzili",
        cidrv6: "IPv6 menzili",
        base64: "base64-\u015Fifreli metin",
        base64url: "base64url-\u015Fifreli metin",
        json_string: "JSON metin",
        e164: "E.164 say\u0131s\u0131",
        jwt: "JWT",
        template_literal: "giren"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "numara",
        array: "saf",
        null: "gayb"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `F\xE2sit giren: umulan instanceof ${issue2.expected}, al\u0131nan ${received}`;
            }
            return `F\xE2sit giren: umulan ${expected}, al\u0131nan ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `F\xE2sit giren: umulan ${stringifyPrimitive(issue2.values[0])}`;
            return `F\xE2sit tercih: m\xFBteberler ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `Fazla b\xFCy\xFCk: ${issue2.origin ?? "value"}, ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elements"} sahip olmal\u0131yd\u0131.`;
            return `Fazla b\xFCy\xFCk: ${issue2.origin ?? "value"}, ${adj}${issue2.maximum.toString()} olmal\u0131yd\u0131.`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `Fazla k\xFC\xE7\xFCk: ${issue2.origin}, ${adj}${issue2.minimum.toString()} ${sizing.unit} sahip olmal\u0131yd\u0131.`;
            }
            return `Fazla k\xFC\xE7\xFCk: ${issue2.origin}, ${adj}${issue2.minimum.toString()} olmal\u0131yd\u0131.`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with")
              return `F\xE2sit metin: "${_issue.prefix}" ile ba\u015Flamal\u0131.`;
            if (_issue.format === "ends_with")
              return `F\xE2sit metin: "${_issue.suffix}" ile bitmeli.`;
            if (_issue.format === "includes")
              return `F\xE2sit metin: "${_issue.includes}" ihtiv\xE2 etmeli.`;
            if (_issue.format === "regex")
              return `F\xE2sit metin: ${_issue.pattern} nak\u015F\u0131na uymal\u0131.`;
            return `F\xE2sit ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `F\xE2sit say\u0131: ${issue2.divisor} kat\u0131 olmal\u0131yd\u0131.`;
          case "unrecognized_keys":
            return `Tan\u0131nmayan anahtar ${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `${issue2.origin} i\xE7in tan\u0131nmayan anahtar var.`;
          case "invalid_union":
            return "Giren tan\u0131namad\u0131.";
          case "invalid_element":
            return `${issue2.origin} i\xE7in tan\u0131nmayan k\u0131ymet var.`;
          default:
            return `K\u0131ymet tan\u0131namad\u0131.`;
        }
      };
    }, "error");
    __name(ota_default, "default");
  }
});

// ../node_modules/zod/v4/locales/ps.js
function ps_default() {
  return {
    localeError: error34()
  };
}
var error34;
var init_ps = __esm({
  "../node_modules/zod/v4/locales/ps.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error34 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A" },
        file: { unit: "\u0628\u0627\u06CC\u067C\u0633", verb: "\u0648\u0644\u0631\u064A" },
        array: { unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A" },
        set: { unit: "\u062A\u0648\u06A9\u064A", verb: "\u0648\u0644\u0631\u064A" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "\u0648\u0631\u0648\u062F\u064A",
        email: "\u0628\u0631\u06CC\u069A\u0646\u0627\u0644\u06CC\u06A9",
        url: "\u06CC\u0648 \u0622\u0631 \u0627\u0644",
        emoji: "\u0627\u06CC\u0645\u0648\u062C\u064A",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "\u0646\u06CC\u067C\u0647 \u0627\u0648 \u0648\u062E\u062A",
        date: "\u0646\u06D0\u067C\u0647",
        time: "\u0648\u062E\u062A",
        duration: "\u0645\u0648\u062F\u0647",
        ipv4: "\u062F IPv4 \u067E\u062A\u0647",
        ipv6: "\u062F IPv6 \u067E\u062A\u0647",
        cidrv4: "\u062F IPv4 \u0633\u0627\u062D\u0647",
        cidrv6: "\u062F IPv6 \u0633\u0627\u062D\u0647",
        base64: "base64-encoded \u0645\u062A\u0646",
        base64url: "base64url-encoded \u0645\u062A\u0646",
        json_string: "JSON \u0645\u062A\u0646",
        e164: "\u062F E.164 \u0634\u0645\u06D0\u0631\u0647",
        jwt: "JWT",
        template_literal: "\u0648\u0631\u0648\u062F\u064A"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "\u0639\u062F\u062F",
        array: "\u0627\u0631\u06D0"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F instanceof ${issue2.expected} \u0648\u0627\u06CC, \u0645\u06AB\u0631 ${received} \u062A\u0631\u0644\u0627\u0633\u0647 \u0634\u0648`;
            }
            return `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F ${expected} \u0648\u0627\u06CC, \u0645\u06AB\u0631 ${received} \u062A\u0631\u0644\u0627\u0633\u0647 \u0634\u0648`;
          }
          case "invalid_value":
            if (issue2.values.length === 1) {
              return `\u0646\u0627\u0633\u0645 \u0648\u0631\u0648\u062F\u064A: \u0628\u0627\u06CC\u062F ${stringifyPrimitive(issue2.values[0])} \u0648\u0627\u06CC`;
            }
            return `\u0646\u0627\u0633\u0645 \u0627\u0646\u062A\u062E\u0627\u0628: \u0628\u0627\u06CC\u062F \u06CC\u0648 \u0644\u0647 ${joinValues(issue2.values, "|")} \u0685\u062E\u0647 \u0648\u0627\u06CC`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `\u0689\u06CC\u0631 \u0644\u0648\u06CC: ${issue2.origin ?? "\u0627\u0631\u0632\u069A\u062A"} \u0628\u0627\u06CC\u062F ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0639\u0646\u0635\u0631\u0648\u0646\u0647"} \u0648\u0644\u0631\u064A`;
            }
            return `\u0689\u06CC\u0631 \u0644\u0648\u06CC: ${issue2.origin ?? "\u0627\u0631\u0632\u069A\u062A"} \u0628\u0627\u06CC\u062F ${adj}${issue2.maximum.toString()} \u0648\u064A`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `\u0689\u06CC\u0631 \u06A9\u0648\u0686\u0646\u06CC: ${issue2.origin} \u0628\u0627\u06CC\u062F ${adj}${issue2.minimum.toString()} ${sizing.unit} \u0648\u0644\u0631\u064A`;
            }
            return `\u0689\u06CC\u0631 \u06A9\u0648\u0686\u0646\u06CC: ${issue2.origin} \u0628\u0627\u06CC\u062F ${adj}${issue2.minimum.toString()} \u0648\u064A`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with") {
              return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F "${_issue.prefix}" \u0633\u0631\u0647 \u067E\u06CC\u0644 \u0634\u064A`;
            }
            if (_issue.format === "ends_with") {
              return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F "${_issue.suffix}" \u0633\u0631\u0647 \u067E\u0627\u06CC \u062A\u0647 \u0648\u0631\u0633\u064A\u0696\u064A`;
            }
            if (_issue.format === "includes") {
              return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F "${_issue.includes}" \u0648\u0644\u0631\u064A`;
            }
            if (_issue.format === "regex") {
              return `\u0646\u0627\u0633\u0645 \u0645\u062A\u0646: \u0628\u0627\u06CC\u062F \u062F ${_issue.pattern} \u0633\u0631\u0647 \u0645\u0637\u0627\u0628\u0642\u062A \u0648\u0644\u0631\u064A`;
            }
            return `${FormatDictionary[_issue.format] ?? issue2.format} \u0646\u0627\u0633\u0645 \u062F\u06CC`;
          }
          case "not_multiple_of":
            return `\u0646\u0627\u0633\u0645 \u0639\u062F\u062F: \u0628\u0627\u06CC\u062F \u062F ${issue2.divisor} \u0645\u0636\u0631\u0628 \u0648\u064A`;
          case "unrecognized_keys":
            return `\u0646\u0627\u0633\u0645 ${issue2.keys.length > 1 ? "\u06A9\u0644\u06CC\u0689\u0648\u0646\u0647" : "\u06A9\u0644\u06CC\u0689"}: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `\u0646\u0627\u0633\u0645 \u06A9\u0644\u06CC\u0689 \u067E\u0647 ${issue2.origin} \u06A9\u06D0`;
          case "invalid_union":
            return `\u0646\u0627\u0633\u0645\u0647 \u0648\u0631\u0648\u062F\u064A`;
          case "invalid_element":
            return `\u0646\u0627\u0633\u0645 \u0639\u0646\u0635\u0631 \u067E\u0647 ${issue2.origin} \u06A9\u06D0`;
          default:
            return `\u0646\u0627\u0633\u0645\u0647 \u0648\u0631\u0648\u062F\u064A`;
        }
      };
    }, "error");
    __name(ps_default, "default");
  }
});

// ../node_modules/zod/v4/locales/pl.js
function pl_default() {
  return {
    localeError: error35()
  };
}
var error35;
var init_pl = __esm({
  "../node_modules/zod/v4/locales/pl.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error35 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "znak\xF3w", verb: "mie\u0107" },
        file: { unit: "bajt\xF3w", verb: "mie\u0107" },
        array: { unit: "element\xF3w", verb: "mie\u0107" },
        set: { unit: "element\xF3w", verb: "mie\u0107" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "wyra\u017Cenie",
        email: "adres email",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "data i godzina w formacie ISO",
        date: "data w formacie ISO",
        time: "godzina w formacie ISO",
        duration: "czas trwania ISO",
        ipv4: "adres IPv4",
        ipv6: "adres IPv6",
        cidrv4: "zakres IPv4",
        cidrv6: "zakres IPv6",
        base64: "ci\u0105g znak\xF3w zakodowany w formacie base64",
        base64url: "ci\u0105g znak\xF3w zakodowany w formacie base64url",
        json_string: "ci\u0105g znak\xF3w w formacie JSON",
        e164: "liczba E.164",
        jwt: "JWT",
        template_literal: "wej\u015Bcie"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "liczba",
        array: "tablica"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano instanceof ${issue2.expected}, otrzymano ${received}`;
            }
            return `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano ${expected}, otrzymano ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `Nieprawid\u0142owe dane wej\u015Bciowe: oczekiwano ${stringifyPrimitive(issue2.values[0])}`;
            return `Nieprawid\u0142owa opcja: oczekiwano jednej z warto\u015Bci ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `Za du\u017Ca warto\u015B\u0107: oczekiwano, \u017Ce ${issue2.origin ?? "warto\u015B\u0107"} b\u0119dzie mie\u0107 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "element\xF3w"}`;
            }
            return `Zbyt du\u017C(y/a/e): oczekiwano, \u017Ce ${issue2.origin ?? "warto\u015B\u0107"} b\u0119dzie wynosi\u0107 ${adj}${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `Za ma\u0142a warto\u015B\u0107: oczekiwano, \u017Ce ${issue2.origin ?? "warto\u015B\u0107"} b\u0119dzie mie\u0107 ${adj}${issue2.minimum.toString()} ${sizing.unit ?? "element\xF3w"}`;
            }
            return `Zbyt ma\u0142(y/a/e): oczekiwano, \u017Ce ${issue2.origin ?? "warto\u015B\u0107"} b\u0119dzie wynosi\u0107 ${adj}${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with")
              return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi zaczyna\u0107 si\u0119 od "${_issue.prefix}"`;
            if (_issue.format === "ends_with")
              return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi ko\u0144czy\u0107 si\u0119 na "${_issue.suffix}"`;
            if (_issue.format === "includes")
              return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi zawiera\u0107 "${_issue.includes}"`;
            if (_issue.format === "regex")
              return `Nieprawid\u0142owy ci\u0105g znak\xF3w: musi odpowiada\u0107 wzorcowi ${_issue.pattern}`;
            return `Nieprawid\u0142ow(y/a/e) ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `Nieprawid\u0142owa liczba: musi by\u0107 wielokrotno\u015Bci\u0105 ${issue2.divisor}`;
          case "unrecognized_keys":
            return `Nierozpoznane klucze${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `Nieprawid\u0142owy klucz w ${issue2.origin}`;
          case "invalid_union":
            return "Nieprawid\u0142owe dane wej\u015Bciowe";
          case "invalid_element":
            return `Nieprawid\u0142owa warto\u015B\u0107 w ${issue2.origin}`;
          default:
            return `Nieprawid\u0142owe dane wej\u015Bciowe`;
        }
      };
    }, "error");
    __name(pl_default, "default");
  }
});

// ../node_modules/zod/v4/locales/pt.js
function pt_default() {
  return {
    localeError: error36()
  };
}
var error36;
var init_pt = __esm({
  "../node_modules/zod/v4/locales/pt.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error36 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "caracteres", verb: "ter" },
        file: { unit: "bytes", verb: "ter" },
        array: { unit: "itens", verb: "ter" },
        set: { unit: "itens", verb: "ter" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "padr\xE3o",
        email: "endere\xE7o de e-mail",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "data e hora ISO",
        date: "data ISO",
        time: "hora ISO",
        duration: "dura\xE7\xE3o ISO",
        ipv4: "endere\xE7o IPv4",
        ipv6: "endere\xE7o IPv6",
        cidrv4: "faixa de IPv4",
        cidrv6: "faixa de IPv6",
        base64: "texto codificado em base64",
        base64url: "URL codificada em base64",
        json_string: "texto JSON",
        e164: "n\xFAmero E.164",
        jwt: "JWT",
        template_literal: "entrada"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "n\xFAmero",
        null: "nulo"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `Tipo inv\xE1lido: esperado instanceof ${issue2.expected}, recebido ${received}`;
            }
            return `Tipo inv\xE1lido: esperado ${expected}, recebido ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `Entrada inv\xE1lida: esperado ${stringifyPrimitive(issue2.values[0])}`;
            return `Op\xE7\xE3o inv\xE1lida: esperada uma das ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `Muito grande: esperado que ${issue2.origin ?? "valor"} tivesse ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementos"}`;
            return `Muito grande: esperado que ${issue2.origin ?? "valor"} fosse ${adj}${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `Muito pequeno: esperado que ${issue2.origin} tivesse ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
            }
            return `Muito pequeno: esperado que ${issue2.origin} fosse ${adj}${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with")
              return `Texto inv\xE1lido: deve come\xE7ar com "${_issue.prefix}"`;
            if (_issue.format === "ends_with")
              return `Texto inv\xE1lido: deve terminar com "${_issue.suffix}"`;
            if (_issue.format === "includes")
              return `Texto inv\xE1lido: deve incluir "${_issue.includes}"`;
            if (_issue.format === "regex")
              return `Texto inv\xE1lido: deve corresponder ao padr\xE3o ${_issue.pattern}`;
            return `${FormatDictionary[_issue.format] ?? issue2.format} inv\xE1lido`;
          }
          case "not_multiple_of":
            return `N\xFAmero inv\xE1lido: deve ser m\xFAltiplo de ${issue2.divisor}`;
          case "unrecognized_keys":
            return `Chave${issue2.keys.length > 1 ? "s" : ""} desconhecida${issue2.keys.length > 1 ? "s" : ""}: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `Chave inv\xE1lida em ${issue2.origin}`;
          case "invalid_union":
            return "Entrada inv\xE1lida";
          case "invalid_element":
            return `Valor inv\xE1lido em ${issue2.origin}`;
          default:
            return `Campo inv\xE1lido`;
        }
      };
    }, "error");
    __name(pt_default, "default");
  }
});

// ../node_modules/zod/v4/locales/ru.js
function getRussianPlural(count3, one, few, many) {
  const absCount = Math.abs(count3);
  const lastDigit = absCount % 10;
  const lastTwoDigits = absCount % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return many;
  }
  if (lastDigit === 1) {
    return one;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return few;
  }
  return many;
}
function ru_default() {
  return {
    localeError: error37()
  };
}
var error37;
var init_ru = __esm({
  "../node_modules/zod/v4/locales/ru.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    __name(getRussianPlural, "getRussianPlural");
    error37 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: {
          unit: {
            one: "\u0441\u0438\u043C\u0432\u043E\u043B",
            few: "\u0441\u0438\u043C\u0432\u043E\u043B\u0430",
            many: "\u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432"
          },
          verb: "\u0438\u043C\u0435\u0442\u044C"
        },
        file: {
          unit: {
            one: "\u0431\u0430\u0439\u0442",
            few: "\u0431\u0430\u0439\u0442\u0430",
            many: "\u0431\u0430\u0439\u0442"
          },
          verb: "\u0438\u043C\u0435\u0442\u044C"
        },
        array: {
          unit: {
            one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
            few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430",
            many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432"
          },
          verb: "\u0438\u043C\u0435\u0442\u044C"
        },
        set: {
          unit: {
            one: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442",
            few: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430",
            many: "\u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432"
          },
          verb: "\u0438\u043C\u0435\u0442\u044C"
        }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "\u0432\u0432\u043E\u0434",
        email: "email \u0430\u0434\u0440\u0435\u0441",
        url: "URL",
        emoji: "\u044D\u043C\u043E\u0434\u0437\u0438",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO \u0434\u0430\u0442\u0430 \u0438 \u0432\u0440\u0435\u043C\u044F",
        date: "ISO \u0434\u0430\u0442\u0430",
        time: "ISO \u0432\u0440\u0435\u043C\u044F",
        duration: "ISO \u0434\u043B\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C",
        ipv4: "IPv4 \u0430\u0434\u0440\u0435\u0441",
        ipv6: "IPv6 \u0430\u0434\u0440\u0435\u0441",
        cidrv4: "IPv4 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
        cidrv6: "IPv6 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D",
        base64: "\u0441\u0442\u0440\u043E\u043A\u0430 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 base64",
        base64url: "\u0441\u0442\u0440\u043E\u043A\u0430 \u0432 \u0444\u043E\u0440\u043C\u0430\u0442\u0435 base64url",
        json_string: "JSON \u0441\u0442\u0440\u043E\u043A\u0430",
        e164: "\u043D\u043E\u043C\u0435\u0440 E.164",
        jwt: "JWT",
        template_literal: "\u0432\u0432\u043E\u0434"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "\u0447\u0438\u0441\u043B\u043E",
        array: "\u043C\u0430\u0441\u0441\u0438\u0432"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C instanceof ${issue2.expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E ${received}`;
            }
            return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C ${expected}, \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0432\u043E\u0434: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C ${stringifyPrimitive(issue2.values[0])}`;
            return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C \u043E\u0434\u043D\u043E \u0438\u0437 ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              const maxValue = Number(issue2.maximum);
              const unit = getRussianPlural(maxValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
              return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435"} \u0431\u0443\u0434\u0435\u0442 \u0438\u043C\u0435\u0442\u044C ${adj}${issue2.maximum.toString()} ${unit}`;
            }
            return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0431\u043E\u043B\u044C\u0448\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435"} \u0431\u0443\u0434\u0435\u0442 ${adj}${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              const minValue = Number(issue2.minimum);
              const unit = getRussianPlural(minValue, sizing.unit.one, sizing.unit.few, sizing.unit.many);
              return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${issue2.origin} \u0431\u0443\u0434\u0435\u0442 \u0438\u043C\u0435\u0442\u044C ${adj}${issue2.minimum.toString()} ${unit}`;
            }
            return `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435: \u043E\u0436\u0438\u0434\u0430\u043B\u043E\u0441\u044C, \u0447\u0442\u043E ${issue2.origin} \u0431\u0443\u0434\u0435\u0442 ${adj}${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with")
              return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u043D\u0430\u0447\u0438\u043D\u0430\u0442\u044C\u0441\u044F \u0441 "${_issue.prefix}"`;
            if (_issue.format === "ends_with")
              return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0437\u0430\u043A\u0430\u043D\u0447\u0438\u0432\u0430\u0442\u044C\u0441\u044F \u043D\u0430 "${_issue.suffix}"`;
            if (_issue.format === "includes")
              return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u0442\u044C "${_issue.includes}"`;
            if (_issue.format === "regex")
              return `\u041D\u0435\u0432\u0435\u0440\u043D\u0430\u044F \u0441\u0442\u0440\u043E\u043A\u0430: \u0434\u043E\u043B\u0436\u043D\u0430 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u043E\u0432\u0430\u0442\u044C \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${_issue.pattern}`;
            return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `\u041D\u0435\u0432\u0435\u0440\u043D\u043E\u0435 \u0447\u0438\u0441\u043B\u043E: \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u043A\u0440\u0430\u0442\u043D\u044B\u043C ${issue2.divisor}`;
          case "unrecognized_keys":
            return `\u041D\u0435\u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043D\u043D${issue2.keys.length > 1 ? "\u044B\u0435" : "\u044B\u0439"} \u043A\u043B\u044E\u0447${issue2.keys.length > 1 ? "\u0438" : ""}: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043A\u043B\u044E\u0447 \u0432 ${issue2.origin}`;
          case "invalid_union":
            return "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0432\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435";
          case "invalid_element":
            return `\u041D\u0435\u0432\u0435\u0440\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u0432 ${issue2.origin}`;
          default:
            return `\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0435 \u0432\u0445\u043E\u0434\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435`;
        }
      };
    }, "error");
    __name(ru_default, "default");
  }
});

// ../node_modules/zod/v4/locales/sl.js
function sl_default() {
  return {
    localeError: error38()
  };
}
var error38;
var init_sl = __esm({
  "../node_modules/zod/v4/locales/sl.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error38 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "znakov", verb: "imeti" },
        file: { unit: "bajtov", verb: "imeti" },
        array: { unit: "elementov", verb: "imeti" },
        set: { unit: "elementov", verb: "imeti" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "vnos",
        email: "e-po\u0161tni naslov",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO datum in \u010Das",
        date: "ISO datum",
        time: "ISO \u010Das",
        duration: "ISO trajanje",
        ipv4: "IPv4 naslov",
        ipv6: "IPv6 naslov",
        cidrv4: "obseg IPv4",
        cidrv6: "obseg IPv6",
        base64: "base64 kodiran niz",
        base64url: "base64url kodiran niz",
        json_string: "JSON niz",
        e164: "E.164 \u0161tevilka",
        jwt: "JWT",
        template_literal: "vnos"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "\u0161tevilo",
        array: "tabela"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `Neveljaven vnos: pri\u010Dakovano instanceof ${issue2.expected}, prejeto ${received}`;
            }
            return `Neveljaven vnos: pri\u010Dakovano ${expected}, prejeto ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `Neveljaven vnos: pri\u010Dakovano ${stringifyPrimitive(issue2.values[0])}`;
            return `Neveljavna mo\u017Enost: pri\u010Dakovano eno izmed ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `Preveliko: pri\u010Dakovano, da bo ${issue2.origin ?? "vrednost"} imelo ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "elementov"}`;
            return `Preveliko: pri\u010Dakovano, da bo ${issue2.origin ?? "vrednost"} ${adj}${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `Premajhno: pri\u010Dakovano, da bo ${issue2.origin} imelo ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
            }
            return `Premajhno: pri\u010Dakovano, da bo ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with") {
              return `Neveljaven niz: mora se za\u010Deti z "${_issue.prefix}"`;
            }
            if (_issue.format === "ends_with")
              return `Neveljaven niz: mora se kon\u010Dati z "${_issue.suffix}"`;
            if (_issue.format === "includes")
              return `Neveljaven niz: mora vsebovati "${_issue.includes}"`;
            if (_issue.format === "regex")
              return `Neveljaven niz: mora ustrezati vzorcu ${_issue.pattern}`;
            return `Neveljaven ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `Neveljavno \u0161tevilo: mora biti ve\u010Dkratnik ${issue2.divisor}`;
          case "unrecognized_keys":
            return `Neprepoznan${issue2.keys.length > 1 ? "i klju\u010Di" : " klju\u010D"}: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `Neveljaven klju\u010D v ${issue2.origin}`;
          case "invalid_union":
            return "Neveljaven vnos";
          case "invalid_element":
            return `Neveljavna vrednost v ${issue2.origin}`;
          default:
            return "Neveljaven vnos";
        }
      };
    }, "error");
    __name(sl_default, "default");
  }
});

// ../node_modules/zod/v4/locales/sv.js
function sv_default() {
  return {
    localeError: error39()
  };
}
var error39;
var init_sv = __esm({
  "../node_modules/zod/v4/locales/sv.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error39 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "tecken", verb: "att ha" },
        file: { unit: "bytes", verb: "att ha" },
        array: { unit: "objekt", verb: "att inneh\xE5lla" },
        set: { unit: "objekt", verb: "att inneh\xE5lla" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "regulj\xE4rt uttryck",
        email: "e-postadress",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO-datum och tid",
        date: "ISO-datum",
        time: "ISO-tid",
        duration: "ISO-varaktighet",
        ipv4: "IPv4-intervall",
        ipv6: "IPv6-intervall",
        cidrv4: "IPv4-spektrum",
        cidrv6: "IPv6-spektrum",
        base64: "base64-kodad str\xE4ng",
        base64url: "base64url-kodad str\xE4ng",
        json_string: "JSON-str\xE4ng",
        e164: "E.164-nummer",
        jwt: "JWT",
        template_literal: "mall-literal"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "antal",
        array: "lista"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `Ogiltig inmatning: f\xF6rv\xE4ntat instanceof ${issue2.expected}, fick ${received}`;
            }
            return `Ogiltig inmatning: f\xF6rv\xE4ntat ${expected}, fick ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `Ogiltig inmatning: f\xF6rv\xE4ntat ${stringifyPrimitive(issue2.values[0])}`;
            return `Ogiltigt val: f\xF6rv\xE4ntade en av ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `F\xF6r stor(t): f\xF6rv\xE4ntade ${issue2.origin ?? "v\xE4rdet"} att ha ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "element"}`;
            }
            return `F\xF6r stor(t): f\xF6rv\xE4ntat ${issue2.origin ?? "v\xE4rdet"} att ha ${adj}${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `F\xF6r lite(t): f\xF6rv\xE4ntade ${issue2.origin ?? "v\xE4rdet"} att ha ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
            }
            return `F\xF6r lite(t): f\xF6rv\xE4ntade ${issue2.origin ?? "v\xE4rdet"} att ha ${adj}${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with") {
              return `Ogiltig str\xE4ng: m\xE5ste b\xF6rja med "${_issue.prefix}"`;
            }
            if (_issue.format === "ends_with")
              return `Ogiltig str\xE4ng: m\xE5ste sluta med "${_issue.suffix}"`;
            if (_issue.format === "includes")
              return `Ogiltig str\xE4ng: m\xE5ste inneh\xE5lla "${_issue.includes}"`;
            if (_issue.format === "regex")
              return `Ogiltig str\xE4ng: m\xE5ste matcha m\xF6nstret "${_issue.pattern}"`;
            return `Ogiltig(t) ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `Ogiltigt tal: m\xE5ste vara en multipel av ${issue2.divisor}`;
          case "unrecognized_keys":
            return `${issue2.keys.length > 1 ? "Ok\xE4nda nycklar" : "Ok\xE4nd nyckel"}: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `Ogiltig nyckel i ${issue2.origin ?? "v\xE4rdet"}`;
          case "invalid_union":
            return "Ogiltig input";
          case "invalid_element":
            return `Ogiltigt v\xE4rde i ${issue2.origin ?? "v\xE4rdet"}`;
          default:
            return `Ogiltig input`;
        }
      };
    }, "error");
    __name(sv_default, "default");
  }
});

// ../node_modules/zod/v4/locales/ta.js
function ta_default() {
  return {
    localeError: error40()
  };
}
var error40;
var init_ta = __esm({
  "../node_modules/zod/v4/locales/ta.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error40 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "\u0B8E\u0BB4\u0BC1\u0BA4\u0BCD\u0BA4\u0BC1\u0B95\u0BCD\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" },
        file: { unit: "\u0BAA\u0BC8\u0B9F\u0BCD\u0B9F\u0BC1\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" },
        array: { unit: "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" },
        set: { unit: "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD", verb: "\u0B95\u0BCA\u0BA3\u0BCD\u0B9F\u0BBF\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "\u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1",
        email: "\u0BAE\u0BBF\u0BA9\u0BCD\u0BA9\u0B9E\u0BCD\u0B9A\u0BB2\u0BCD \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO \u0BA4\u0BC7\u0BA4\u0BBF \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD",
        date: "ISO \u0BA4\u0BC7\u0BA4\u0BBF",
        time: "ISO \u0BA8\u0BC7\u0BB0\u0BAE\u0BCD",
        duration: "ISO \u0B95\u0BBE\u0BB2 \u0B85\u0BB3\u0BB5\u0BC1",
        ipv4: "IPv4 \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF",
        ipv6: "IPv6 \u0BAE\u0BC1\u0B95\u0BB5\u0BB0\u0BBF",
        cidrv4: "IPv4 \u0BB5\u0BB0\u0BAE\u0BCD\u0BAA\u0BC1",
        cidrv6: "IPv6 \u0BB5\u0BB0\u0BAE\u0BCD\u0BAA\u0BC1",
        base64: "base64-encoded \u0B9A\u0BB0\u0BAE\u0BCD",
        base64url: "base64url-encoded \u0B9A\u0BB0\u0BAE\u0BCD",
        json_string: "JSON \u0B9A\u0BB0\u0BAE\u0BCD",
        e164: "E.164 \u0B8E\u0BA3\u0BCD",
        jwt: "JWT",
        template_literal: "input"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "\u0B8E\u0BA3\u0BCD",
        array: "\u0B85\u0BA3\u0BBF",
        null: "\u0BB5\u0BC6\u0BB1\u0BC1\u0BAE\u0BC8"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 instanceof ${issue2.expected}, \u0BAA\u0BC6\u0BB1\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${received}`;
            }
            return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${expected}, \u0BAA\u0BC6\u0BB1\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${stringifyPrimitive(issue2.values[0])}`;
            return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BB5\u0BBF\u0BB0\u0BC1\u0BAA\u0BCD\u0BAA\u0BAE\u0BCD: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${joinValues(issue2.values, "|")} \u0B87\u0BB2\u0BCD \u0B92\u0BA9\u0BCD\u0BB1\u0BC1`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `\u0BAE\u0BBF\u0B95 \u0BAA\u0BC6\u0BB0\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${issue2.origin ?? "\u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0B89\u0BB1\u0BC1\u0BAA\u0BCD\u0BAA\u0BC1\u0B95\u0BB3\u0BCD"} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
            }
            return `\u0BAE\u0BBF\u0B95 \u0BAA\u0BC6\u0BB0\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${issue2.origin ?? "\u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1"} ${adj}${issue2.maximum.toString()} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `\u0BAE\u0BBF\u0B95\u0B9A\u0BCD \u0B9A\u0BBF\u0BB1\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
            }
            return `\u0BAE\u0BBF\u0B95\u0B9A\u0BCD \u0B9A\u0BBF\u0BB1\u0BBF\u0BAF\u0BA4\u0BC1: \u0B8E\u0BA4\u0BBF\u0BB0\u0BCD\u0BAA\u0BBE\u0BB0\u0BCD\u0B95\u0BCD\u0B95\u0BAA\u0BCD\u0BAA\u0B9F\u0BCD\u0B9F\u0BA4\u0BC1 ${issue2.origin} ${adj}${issue2.minimum.toString()} \u0B86\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with")
              return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${_issue.prefix}" \u0B87\u0BB2\u0BCD \u0BA4\u0BCA\u0B9F\u0B99\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
            if (_issue.format === "ends_with")
              return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${_issue.suffix}" \u0B87\u0BB2\u0BCD \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0B9F\u0BC8\u0BAF \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
            if (_issue.format === "includes")
              return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: "${_issue.includes}" \u0B90 \u0B89\u0BB3\u0BCD\u0BB3\u0B9F\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
            if (_issue.format === "regex")
              return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B9A\u0BB0\u0BAE\u0BCD: ${_issue.pattern} \u0BAE\u0BC1\u0BB1\u0BC8\u0BAA\u0BBE\u0B9F\u0BCD\u0B9F\u0BC1\u0B9F\u0BA9\u0BCD \u0BAA\u0BCA\u0BB0\u0BC1\u0BA8\u0BCD\u0BA4 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
            return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B8E\u0BA3\u0BCD: ${issue2.divisor} \u0B87\u0BA9\u0BCD \u0BAA\u0BB2\u0BAE\u0BBE\u0B95 \u0B87\u0BB0\u0BC1\u0B95\u0BCD\u0B95 \u0BB5\u0BC7\u0BA3\u0BCD\u0B9F\u0BC1\u0BAE\u0BCD`;
          case "unrecognized_keys":
            return `\u0B85\u0B9F\u0BC8\u0BAF\u0BBE\u0BB3\u0BAE\u0BCD \u0BA4\u0BC6\u0BB0\u0BBF\u0BAF\u0BBE\u0BA4 \u0BB5\u0BBF\u0B9A\u0BC8${issue2.keys.length > 1 ? "\u0B95\u0BB3\u0BCD" : ""}: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `${issue2.origin} \u0B87\u0BB2\u0BCD \u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BB5\u0BBF\u0B9A\u0BC8`;
          case "invalid_union":
            return "\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1";
          case "invalid_element":
            return `${issue2.origin} \u0B87\u0BB2\u0BCD \u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0BAE\u0BA4\u0BBF\u0BAA\u0BCD\u0BAA\u0BC1`;
          default:
            return `\u0BA4\u0BB5\u0BB1\u0BBE\u0BA9 \u0B89\u0BB3\u0BCD\u0BB3\u0BC0\u0B9F\u0BC1`;
        }
      };
    }, "error");
    __name(ta_default, "default");
  }
});

// ../node_modules/zod/v4/locales/th.js
function th_default() {
  return {
    localeError: error41()
  };
}
var error41;
var init_th = __esm({
  "../node_modules/zod/v4/locales/th.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error41 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "\u0E15\u0E31\u0E27\u0E2D\u0E31\u0E01\u0E29\u0E23", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" },
        file: { unit: "\u0E44\u0E1A\u0E15\u0E4C", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" },
        array: { unit: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" },
        set: { unit: "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23", verb: "\u0E04\u0E27\u0E23\u0E21\u0E35" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E1B\u0E49\u0E2D\u0E19",
        email: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48\u0E2D\u0E35\u0E40\u0E21\u0E25",
        url: "URL",
        emoji: "\u0E2D\u0E34\u0E42\u0E21\u0E08\u0E34",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO",
        date: "\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E41\u0E1A\u0E1A ISO",
        time: "\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO",
        duration: "\u0E0A\u0E48\u0E27\u0E07\u0E40\u0E27\u0E25\u0E32\u0E41\u0E1A\u0E1A ISO",
        ipv4: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48 IPv4",
        ipv6: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48 IPv6",
        cidrv4: "\u0E0A\u0E48\u0E27\u0E07 IP \u0E41\u0E1A\u0E1A IPv4",
        cidrv6: "\u0E0A\u0E48\u0E27\u0E07 IP \u0E41\u0E1A\u0E1A IPv6",
        base64: "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A Base64",
        base64url: "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A Base64 \u0E2A\u0E33\u0E2B\u0E23\u0E31\u0E1A URL",
        json_string: "\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E41\u0E1A\u0E1A JSON",
        e164: "\u0E40\u0E1A\u0E2D\u0E23\u0E4C\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C\u0E23\u0E30\u0E2B\u0E27\u0E48\u0E32\u0E07\u0E1B\u0E23\u0E30\u0E40\u0E17\u0E28 (E.164)",
        jwt: "\u0E42\u0E17\u0E40\u0E04\u0E19 JWT",
        template_literal: "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E17\u0E35\u0E48\u0E1B\u0E49\u0E2D\u0E19"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02",
        array: "\u0E2D\u0E32\u0E23\u0E4C\u0E40\u0E23\u0E22\u0E4C (Array)",
        null: "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E48\u0E32 (null)"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 instanceof ${issue2.expected} \u0E41\u0E15\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A ${received}`;
            }
            return `\u0E1B\u0E23\u0E30\u0E40\u0E20\u0E17\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 ${expected} \u0E41\u0E15\u0E48\u0E44\u0E14\u0E49\u0E23\u0E31\u0E1A ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `\u0E04\u0E48\u0E32\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19 ${stringifyPrimitive(issue2.values[0])}`;
            return `\u0E15\u0E31\u0E27\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E04\u0E27\u0E23\u0E40\u0E1B\u0E47\u0E19\u0E2B\u0E19\u0E36\u0E48\u0E07\u0E43\u0E19 ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "\u0E44\u0E21\u0E48\u0E40\u0E01\u0E34\u0E19" : "\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `\u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14: ${issue2.origin ?? "\u0E04\u0E48\u0E32"} \u0E04\u0E27\u0E23\u0E21\u0E35${adj} ${issue2.maximum.toString()} ${sizing.unit ?? "\u0E23\u0E32\u0E22\u0E01\u0E32\u0E23"}`;
            return `\u0E40\u0E01\u0E34\u0E19\u0E01\u0E33\u0E2B\u0E19\u0E14: ${issue2.origin ?? "\u0E04\u0E48\u0E32"} \u0E04\u0E27\u0E23\u0E21\u0E35${adj} ${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? "\u0E2D\u0E22\u0E48\u0E32\u0E07\u0E19\u0E49\u0E2D\u0E22" : "\u0E21\u0E32\u0E01\u0E01\u0E27\u0E48\u0E32";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32\u0E01\u0E33\u0E2B\u0E19\u0E14: ${issue2.origin} \u0E04\u0E27\u0E23\u0E21\u0E35${adj} ${issue2.minimum.toString()} ${sizing.unit}`;
            }
            return `\u0E19\u0E49\u0E2D\u0E22\u0E01\u0E27\u0E48\u0E32\u0E01\u0E33\u0E2B\u0E19\u0E14: ${issue2.origin} \u0E04\u0E27\u0E23\u0E21\u0E35${adj} ${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with") {
              return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E02\u0E36\u0E49\u0E19\u0E15\u0E49\u0E19\u0E14\u0E49\u0E27\u0E22 "${_issue.prefix}"`;
            }
            if (_issue.format === "ends_with")
              return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E25\u0E07\u0E17\u0E49\u0E32\u0E22\u0E14\u0E49\u0E27\u0E22 "${_issue.suffix}"`;
            if (_issue.format === "includes")
              return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21\u0E15\u0E49\u0E2D\u0E07\u0E21\u0E35 "${_issue.includes}" \u0E2D\u0E22\u0E39\u0E48\u0E43\u0E19\u0E02\u0E49\u0E2D\u0E04\u0E27\u0E32\u0E21`;
            if (_issue.format === "regex")
              return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E15\u0E49\u0E2D\u0E07\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E17\u0E35\u0E48\u0E01\u0E33\u0E2B\u0E19\u0E14 ${_issue.pattern}`;
            return `\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `\u0E15\u0E31\u0E27\u0E40\u0E25\u0E02\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E15\u0E49\u0E2D\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E08\u0E33\u0E19\u0E27\u0E19\u0E17\u0E35\u0E48\u0E2B\u0E32\u0E23\u0E14\u0E49\u0E27\u0E22 ${issue2.divisor} \u0E44\u0E14\u0E49\u0E25\u0E07\u0E15\u0E31\u0E27`;
          case "unrecognized_keys":
            return `\u0E1E\u0E1A\u0E04\u0E35\u0E22\u0E4C\u0E17\u0E35\u0E48\u0E44\u0E21\u0E48\u0E23\u0E39\u0E49\u0E08\u0E31\u0E01: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `\u0E04\u0E35\u0E22\u0E4C\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E43\u0E19 ${issue2.origin}`;
          case "invalid_union":
            return "\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07: \u0E44\u0E21\u0E48\u0E15\u0E23\u0E07\u0E01\u0E31\u0E1A\u0E23\u0E39\u0E1B\u0E41\u0E1A\u0E1A\u0E22\u0E39\u0E40\u0E19\u0E35\u0E22\u0E19\u0E17\u0E35\u0E48\u0E01\u0E33\u0E2B\u0E19\u0E14\u0E44\u0E27\u0E49";
          case "invalid_element":
            return `\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E43\u0E19 ${issue2.origin}`;
          default:
            return `\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E44\u0E21\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07`;
        }
      };
    }, "error");
    __name(th_default, "default");
  }
});

// ../node_modules/zod/v4/locales/tr.js
function tr_default() {
  return {
    localeError: error42()
  };
}
var error42;
var init_tr = __esm({
  "../node_modules/zod/v4/locales/tr.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error42 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "karakter", verb: "olmal\u0131" },
        file: { unit: "bayt", verb: "olmal\u0131" },
        array: { unit: "\xF6\u011Fe", verb: "olmal\u0131" },
        set: { unit: "\xF6\u011Fe", verb: "olmal\u0131" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "girdi",
        email: "e-posta adresi",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO tarih ve saat",
        date: "ISO tarih",
        time: "ISO saat",
        duration: "ISO s\xFCre",
        ipv4: "IPv4 adresi",
        ipv6: "IPv6 adresi",
        cidrv4: "IPv4 aral\u0131\u011F\u0131",
        cidrv6: "IPv6 aral\u0131\u011F\u0131",
        base64: "base64 ile \u015Fifrelenmi\u015F metin",
        base64url: "base64url ile \u015Fifrelenmi\u015F metin",
        json_string: "JSON dizesi",
        e164: "E.164 say\u0131s\u0131",
        jwt: "JWT",
        template_literal: "\u015Eablon dizesi"
      };
      const TypeDictionary = {
        nan: "NaN"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `Ge\xE7ersiz de\u011Fer: beklenen instanceof ${issue2.expected}, al\u0131nan ${received}`;
            }
            return `Ge\xE7ersiz de\u011Fer: beklenen ${expected}, al\u0131nan ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `Ge\xE7ersiz de\u011Fer: beklenen ${stringifyPrimitive(issue2.values[0])}`;
            return `Ge\xE7ersiz se\xE7enek: a\u015Fa\u011F\u0131dakilerden biri olmal\u0131: ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `\xC7ok b\xFCy\xFCk: beklenen ${issue2.origin ?? "de\u011Fer"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\xF6\u011Fe"}`;
            return `\xC7ok b\xFCy\xFCk: beklenen ${issue2.origin ?? "de\u011Fer"} ${adj}${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `\xC7ok k\xFC\xE7\xFCk: beklenen ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
            return `\xC7ok k\xFC\xE7\xFCk: beklenen ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with")
              return `Ge\xE7ersiz metin: "${_issue.prefix}" ile ba\u015Flamal\u0131`;
            if (_issue.format === "ends_with")
              return `Ge\xE7ersiz metin: "${_issue.suffix}" ile bitmeli`;
            if (_issue.format === "includes")
              return `Ge\xE7ersiz metin: "${_issue.includes}" i\xE7ermeli`;
            if (_issue.format === "regex")
              return `Ge\xE7ersiz metin: ${_issue.pattern} desenine uymal\u0131`;
            return `Ge\xE7ersiz ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `Ge\xE7ersiz say\u0131: ${issue2.divisor} ile tam b\xF6l\xFCnebilmeli`;
          case "unrecognized_keys":
            return `Tan\u0131nmayan anahtar${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `${issue2.origin} i\xE7inde ge\xE7ersiz anahtar`;
          case "invalid_union":
            return "Ge\xE7ersiz de\u011Fer";
          case "invalid_element":
            return `${issue2.origin} i\xE7inde ge\xE7ersiz de\u011Fer`;
          default:
            return `Ge\xE7ersiz de\u011Fer`;
        }
      };
    }, "error");
    __name(tr_default, "default");
  }
});

// ../node_modules/zod/v4/locales/uk.js
function uk_default() {
  return {
    localeError: error43()
  };
}
var error43;
var init_uk = __esm({
  "../node_modules/zod/v4/locales/uk.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error43 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "\u0441\u0438\u043C\u0432\u043E\u043B\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" },
        file: { unit: "\u0431\u0430\u0439\u0442\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" },
        array: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" },
        set: { unit: "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432", verb: "\u043C\u0430\u0442\u0438\u043C\u0435" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "\u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456",
        email: "\u0430\u0434\u0440\u0435\u0441\u0430 \u0435\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u043E\u0457 \u043F\u043E\u0448\u0442\u0438",
        url: "URL",
        emoji: "\u0435\u043C\u043E\u0434\u0437\u0456",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "\u0434\u0430\u0442\u0430 \u0442\u0430 \u0447\u0430\u0441 ISO",
        date: "\u0434\u0430\u0442\u0430 ISO",
        time: "\u0447\u0430\u0441 ISO",
        duration: "\u0442\u0440\u0438\u0432\u0430\u043B\u0456\u0441\u0442\u044C ISO",
        ipv4: "\u0430\u0434\u0440\u0435\u0441\u0430 IPv4",
        ipv6: "\u0430\u0434\u0440\u0435\u0441\u0430 IPv6",
        cidrv4: "\u0434\u0456\u0430\u043F\u0430\u0437\u043E\u043D IPv4",
        cidrv6: "\u0434\u0456\u0430\u043F\u0430\u0437\u043E\u043D IPv6",
        base64: "\u0440\u044F\u0434\u043E\u043A \u0443 \u043A\u043E\u0434\u0443\u0432\u0430\u043D\u043D\u0456 base64",
        base64url: "\u0440\u044F\u0434\u043E\u043A \u0443 \u043A\u043E\u0434\u0443\u0432\u0430\u043D\u043D\u0456 base64url",
        json_string: "\u0440\u044F\u0434\u043E\u043A JSON",
        e164: "\u043D\u043E\u043C\u0435\u0440 E.164",
        jwt: "JWT",
        template_literal: "\u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "\u0447\u0438\u0441\u043B\u043E",
        array: "\u043C\u0430\u0441\u0438\u0432"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F instanceof ${issue2.expected}, \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043E ${received}`;
            }
            return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F ${expected}, \u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043E ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F ${stringifyPrimitive(issue2.values[0])}`;
            return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0430 \u043E\u043F\u0446\u0456\u044F: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F \u043E\u0434\u043D\u0435 \u0437 ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0435\u043B\u0435\u043C\u0435\u043D\u0442\u0456\u0432"}`;
            return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u0432\u0435\u043B\u0438\u043A\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${issue2.origin ?? "\u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F"} \u0431\u0443\u0434\u0435 ${adj}${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
            }
            return `\u0417\u0430\u043D\u0430\u0434\u0442\u043E \u043C\u0430\u043B\u0435: \u043E\u0447\u0456\u043A\u0443\u0454\u0442\u044C\u0441\u044F, \u0449\u043E ${issue2.origin} \u0431\u0443\u0434\u0435 ${adj}${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with")
              return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u043F\u043E\u0447\u0438\u043D\u0430\u0442\u0438\u0441\u044F \u0437 "${_issue.prefix}"`;
            if (_issue.format === "ends_with")
              return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u0437\u0430\u043A\u0456\u043D\u0447\u0443\u0432\u0430\u0442\u0438\u0441\u044F \u043D\u0430 "${_issue.suffix}"`;
            if (_issue.format === "includes")
              return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u043C\u0456\u0441\u0442\u0438\u0442\u0438 "${_issue.includes}"`;
            if (_issue.format === "regex")
              return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u0440\u044F\u0434\u043E\u043A: \u043F\u043E\u0432\u0438\u043D\u0435\u043D \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u0442\u0438 \u0448\u0430\u0431\u043B\u043E\u043D\u0443 ${_issue.pattern}`;
            return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0435 \u0447\u0438\u0441\u043B\u043E: \u043F\u043E\u0432\u0438\u043D\u043D\u043E \u0431\u0443\u0442\u0438 \u043A\u0440\u0430\u0442\u043D\u0438\u043C ${issue2.divisor}`;
          case "unrecognized_keys":
            return `\u041D\u0435\u0440\u043E\u0437\u043F\u0456\u0437\u043D\u0430\u043D\u0438\u0439 \u043A\u043B\u044E\u0447${issue2.keys.length > 1 ? "\u0456" : ""}: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0438\u0439 \u043A\u043B\u044E\u0447 \u0443 ${issue2.origin}`;
          case "invalid_union":
            return "\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456";
          case "invalid_element":
            return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u043D\u044F \u0443 ${issue2.origin}`;
          default:
            return `\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u0456 \u0432\u0445\u0456\u0434\u043D\u0456 \u0434\u0430\u043D\u0456`;
        }
      };
    }, "error");
    __name(uk_default, "default");
  }
});

// ../node_modules/zod/v4/locales/ua.js
function ua_default() {
  return uk_default();
}
var init_ua = __esm({
  "../node_modules/zod/v4/locales/ua.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_uk();
    __name(ua_default, "default");
  }
});

// ../node_modules/zod/v4/locales/ur.js
function ur_default() {
  return {
    localeError: error44()
  };
}
var error44;
var init_ur = __esm({
  "../node_modules/zod/v4/locales/ur.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error44 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "\u062D\u0631\u0648\u0641", verb: "\u06C1\u0648\u0646\u0627" },
        file: { unit: "\u0628\u0627\u0626\u0679\u0633", verb: "\u06C1\u0648\u0646\u0627" },
        array: { unit: "\u0622\u0626\u0679\u0645\u0632", verb: "\u06C1\u0648\u0646\u0627" },
        set: { unit: "\u0622\u0626\u0679\u0645\u0632", verb: "\u06C1\u0648\u0646\u0627" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "\u0627\u0646 \u067E\u0679",
        email: "\u0627\u06CC \u0645\u06CC\u0644 \u0627\u06CC\u0688\u0631\u06CC\u0633",
        url: "\u06CC\u0648 \u0622\u0631 \u0627\u06CC\u0644",
        emoji: "\u0627\u06CC\u0645\u0648\u062C\u06CC",
        uuid: "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC",
        uuidv4: "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC \u0648\u06CC 4",
        uuidv6: "\u06CC\u0648 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC \u0648\u06CC 6",
        nanoid: "\u0646\u06CC\u0646\u0648 \u0622\u0626\u06CC \u0688\u06CC",
        guid: "\u062C\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC",
        cuid: "\u0633\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC",
        cuid2: "\u0633\u06CC \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC 2",
        ulid: "\u06CC\u0648 \u0627\u06CC\u0644 \u0622\u0626\u06CC \u0688\u06CC",
        xid: "\u0627\u06CC\u06A9\u0633 \u0622\u0626\u06CC \u0688\u06CC",
        ksuid: "\u06A9\u06D2 \u0627\u06CC\u0633 \u06CC\u0648 \u0622\u0626\u06CC \u0688\u06CC",
        datetime: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0688\u06CC\u0679 \u0679\u0627\u0626\u0645",
        date: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u062A\u0627\u0631\u06CC\u062E",
        time: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0648\u0642\u062A",
        duration: "\u0622\u0626\u06CC \u0627\u06CC\u0633 \u0627\u0648 \u0645\u062F\u062A",
        ipv4: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 4 \u0627\u06CC\u0688\u0631\u06CC\u0633",
        ipv6: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 6 \u0627\u06CC\u0688\u0631\u06CC\u0633",
        cidrv4: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 4 \u0631\u06CC\u0646\u062C",
        cidrv6: "\u0622\u0626\u06CC \u067E\u06CC \u0648\u06CC 6 \u0631\u06CC\u0646\u062C",
        base64: "\u0628\u06CC\u0633 64 \u0627\u0646 \u06A9\u0648\u0688\u0688 \u0633\u0679\u0631\u0646\u06AF",
        base64url: "\u0628\u06CC\u0633 64 \u06CC\u0648 \u0622\u0631 \u0627\u06CC\u0644 \u0627\u0646 \u06A9\u0648\u0688\u0688 \u0633\u0679\u0631\u0646\u06AF",
        json_string: "\u062C\u06D2 \u0627\u06CC\u0633 \u0627\u0648 \u0627\u06CC\u0646 \u0633\u0679\u0631\u0646\u06AF",
        e164: "\u0627\u06CC 164 \u0646\u0645\u0628\u0631",
        jwt: "\u062C\u06D2 \u0688\u0628\u0644\u06CC\u0648 \u0679\u06CC",
        template_literal: "\u0627\u0646 \u067E\u0679"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "\u0646\u0645\u0628\u0631",
        array: "\u0622\u0631\u06D2",
        null: "\u0646\u0644"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: instanceof ${issue2.expected} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627\u060C ${received} \u0645\u0648\u0635\u0648\u0644 \u06C1\u0648\u0627`;
            }
            return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: ${expected} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627\u060C ${received} \u0645\u0648\u0635\u0648\u0644 \u06C1\u0648\u0627`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679: ${stringifyPrimitive(issue2.values[0])} \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
            return `\u063A\u0644\u0637 \u0622\u067E\u0634\u0646: ${joinValues(issue2.values, "|")} \u0645\u06CC\u06BA \u0633\u06D2 \u0627\u06CC\u06A9 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `\u0628\u06C1\u062A \u0628\u0691\u0627: ${issue2.origin ?? "\u0648\u06CC\u0644\u06CC\u0648"} \u06A9\u06D2 ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u0639\u0646\u0627\u0635\u0631"} \u06C1\u0648\u0646\u06D2 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u06D2`;
            return `\u0628\u06C1\u062A \u0628\u0691\u0627: ${issue2.origin ?? "\u0648\u06CC\u0644\u06CC\u0648"} \u06A9\u0627 ${adj}${issue2.maximum.toString()} \u06C1\u0648\u0646\u0627 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `\u0628\u06C1\u062A \u0686\u06BE\u0648\u0679\u0627: ${issue2.origin} \u06A9\u06D2 ${adj}${issue2.minimum.toString()} ${sizing.unit} \u06C1\u0648\u0646\u06D2 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u06D2`;
            }
            return `\u0628\u06C1\u062A \u0686\u06BE\u0648\u0679\u0627: ${issue2.origin} \u06A9\u0627 ${adj}${issue2.minimum.toString()} \u06C1\u0648\u0646\u0627 \u0645\u062A\u0648\u0642\u0639 \u062A\u06BE\u0627`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with") {
              return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${_issue.prefix}" \u0633\u06D2 \u0634\u0631\u0648\u0639 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
            }
            if (_issue.format === "ends_with")
              return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${_issue.suffix}" \u067E\u0631 \u062E\u062A\u0645 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
            if (_issue.format === "includes")
              return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: "${_issue.includes}" \u0634\u0627\u0645\u0644 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
            if (_issue.format === "regex")
              return `\u063A\u0644\u0637 \u0633\u0679\u0631\u0646\u06AF: \u067E\u06CC\u0679\u0631\u0646 ${_issue.pattern} \u0633\u06D2 \u0645\u06CC\u0686 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
            return `\u063A\u0644\u0637 ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `\u063A\u0644\u0637 \u0646\u0645\u0628\u0631: ${issue2.divisor} \u06A9\u0627 \u0645\u0636\u0627\u0639\u0641 \u06C1\u0648\u0646\u0627 \u0686\u0627\u06C1\u06CC\u06D2`;
          case "unrecognized_keys":
            return `\u063A\u06CC\u0631 \u062A\u0633\u0644\u06CC\u0645 \u0634\u062F\u06C1 \u06A9\u06CC${issue2.keys.length > 1 ? "\u0632" : ""}: ${joinValues(issue2.keys, "\u060C ")}`;
          case "invalid_key":
            return `${issue2.origin} \u0645\u06CC\u06BA \u063A\u0644\u0637 \u06A9\u06CC`;
          case "invalid_union":
            return "\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679";
          case "invalid_element":
            return `${issue2.origin} \u0645\u06CC\u06BA \u063A\u0644\u0637 \u0648\u06CC\u0644\u06CC\u0648`;
          default:
            return `\u063A\u0644\u0637 \u0627\u0646 \u067E\u0679`;
        }
      };
    }, "error");
    __name(ur_default, "default");
  }
});

// ../node_modules/zod/v4/locales/uz.js
function uz_default() {
  return {
    localeError: error45()
  };
}
var error45;
var init_uz = __esm({
  "../node_modules/zod/v4/locales/uz.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error45 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "belgi", verb: "bo\u2018lishi kerak" },
        file: { unit: "bayt", verb: "bo\u2018lishi kerak" },
        array: { unit: "element", verb: "bo\u2018lishi kerak" },
        set: { unit: "element", verb: "bo\u2018lishi kerak" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "kirish",
        email: "elektron pochta manzili",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO sana va vaqti",
        date: "ISO sana",
        time: "ISO vaqt",
        duration: "ISO davomiylik",
        ipv4: "IPv4 manzil",
        ipv6: "IPv6 manzil",
        mac: "MAC manzil",
        cidrv4: "IPv4 diapazon",
        cidrv6: "IPv6 diapazon",
        base64: "base64 kodlangan satr",
        base64url: "base64url kodlangan satr",
        json_string: "JSON satr",
        e164: "E.164 raqam",
        jwt: "JWT",
        template_literal: "kirish"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "raqam",
        array: "massiv"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `Noto\u2018g\u2018ri kirish: kutilgan instanceof ${issue2.expected}, qabul qilingan ${received}`;
            }
            return `Noto\u2018g\u2018ri kirish: kutilgan ${expected}, qabul qilingan ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `Noto\u2018g\u2018ri kirish: kutilgan ${stringifyPrimitive(issue2.values[0])}`;
            return `Noto\u2018g\u2018ri variant: quyidagilardan biri kutilgan ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `Juda katta: kutilgan ${issue2.origin ?? "qiymat"} ${adj}${issue2.maximum.toString()} ${sizing.unit} ${sizing.verb}`;
            return `Juda katta: kutilgan ${issue2.origin ?? "qiymat"} ${adj}${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `Juda kichik: kutilgan ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit} ${sizing.verb}`;
            }
            return `Juda kichik: kutilgan ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with")
              return `Noto\u2018g\u2018ri satr: "${_issue.prefix}" bilan boshlanishi kerak`;
            if (_issue.format === "ends_with")
              return `Noto\u2018g\u2018ri satr: "${_issue.suffix}" bilan tugashi kerak`;
            if (_issue.format === "includes")
              return `Noto\u2018g\u2018ri satr: "${_issue.includes}" ni o\u2018z ichiga olishi kerak`;
            if (_issue.format === "regex")
              return `Noto\u2018g\u2018ri satr: ${_issue.pattern} shabloniga mos kelishi kerak`;
            return `Noto\u2018g\u2018ri ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `Noto\u2018g\u2018ri raqam: ${issue2.divisor} ning karralisi bo\u2018lishi kerak`;
          case "unrecognized_keys":
            return `Noma\u2019lum kalit${issue2.keys.length > 1 ? "lar" : ""}: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `${issue2.origin} dagi kalit noto\u2018g\u2018ri`;
          case "invalid_union":
            return "Noto\u2018g\u2018ri kirish";
          case "invalid_element":
            return `${issue2.origin} da noto\u2018g\u2018ri qiymat`;
          default:
            return `Noto\u2018g\u2018ri kirish`;
        }
      };
    }, "error");
    __name(uz_default, "default");
  }
});

// ../node_modules/zod/v4/locales/vi.js
function vi_default() {
  return {
    localeError: error46()
  };
}
var error46;
var init_vi = __esm({
  "../node_modules/zod/v4/locales/vi.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error46 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "k\xFD t\u1EF1", verb: "c\xF3" },
        file: { unit: "byte", verb: "c\xF3" },
        array: { unit: "ph\u1EA7n t\u1EED", verb: "c\xF3" },
        set: { unit: "ph\u1EA7n t\u1EED", verb: "c\xF3" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "\u0111\u1EA7u v\xE0o",
        email: "\u0111\u1ECBa ch\u1EC9 email",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ng\xE0y gi\u1EDD ISO",
        date: "ng\xE0y ISO",
        time: "gi\u1EDD ISO",
        duration: "kho\u1EA3ng th\u1EDDi gian ISO",
        ipv4: "\u0111\u1ECBa ch\u1EC9 IPv4",
        ipv6: "\u0111\u1ECBa ch\u1EC9 IPv6",
        cidrv4: "d\u1EA3i IPv4",
        cidrv6: "d\u1EA3i IPv6",
        base64: "chu\u1ED7i m\xE3 h\xF3a base64",
        base64url: "chu\u1ED7i m\xE3 h\xF3a base64url",
        json_string: "chu\u1ED7i JSON",
        e164: "s\u1ED1 E.164",
        jwt: "JWT",
        template_literal: "\u0111\u1EA7u v\xE0o"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "s\u1ED1",
        array: "m\u1EA3ng"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i instanceof ${issue2.expected}, nh\u1EADn \u0111\u01B0\u1EE3c ${received}`;
            }
            return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i ${expected}, nh\u1EADn \u0111\u01B0\u1EE3c ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i ${stringifyPrimitive(issue2.values[0])}`;
            return `T\xF9y ch\u1ECDn kh\xF4ng h\u1EE3p l\u1EC7: mong \u0111\u1EE3i m\u1ED9t trong c\xE1c gi\xE1 tr\u1ECB ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `Qu\xE1 l\u1EDBn: mong \u0111\u1EE3i ${issue2.origin ?? "gi\xE1 tr\u1ECB"} ${sizing.verb} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "ph\u1EA7n t\u1EED"}`;
            return `Qu\xE1 l\u1EDBn: mong \u0111\u1EE3i ${issue2.origin ?? "gi\xE1 tr\u1ECB"} ${adj}${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `Qu\xE1 nh\u1ECF: mong \u0111\u1EE3i ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
            }
            return `Qu\xE1 nh\u1ECF: mong \u0111\u1EE3i ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with")
              return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i b\u1EAFt \u0111\u1EA7u b\u1EB1ng "${_issue.prefix}"`;
            if (_issue.format === "ends_with")
              return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i k\u1EBFt th\xFAc b\u1EB1ng "${_issue.suffix}"`;
            if (_issue.format === "includes")
              return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i bao g\u1ED3m "${_issue.includes}"`;
            if (_issue.format === "regex")
              return `Chu\u1ED7i kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i kh\u1EDBp v\u1EDBi m\u1EABu ${_issue.pattern}`;
            return `${FormatDictionary[_issue.format] ?? issue2.format} kh\xF4ng h\u1EE3p l\u1EC7`;
          }
          case "not_multiple_of":
            return `S\u1ED1 kh\xF4ng h\u1EE3p l\u1EC7: ph\u1EA3i l\xE0 b\u1ED9i s\u1ED1 c\u1EE7a ${issue2.divisor}`;
          case "unrecognized_keys":
            return `Kh\xF3a kh\xF4ng \u0111\u01B0\u1EE3c nh\u1EADn d\u1EA1ng: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `Kh\xF3a kh\xF4ng h\u1EE3p l\u1EC7 trong ${issue2.origin}`;
          case "invalid_union":
            return "\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7";
          case "invalid_element":
            return `Gi\xE1 tr\u1ECB kh\xF4ng h\u1EE3p l\u1EC7 trong ${issue2.origin}`;
          default:
            return `\u0110\u1EA7u v\xE0o kh\xF4ng h\u1EE3p l\u1EC7`;
        }
      };
    }, "error");
    __name(vi_default, "default");
  }
});

// ../node_modules/zod/v4/locales/zh-CN.js
function zh_CN_default() {
  return {
    localeError: error47()
  };
}
var error47;
var init_zh_CN = __esm({
  "../node_modules/zod/v4/locales/zh-CN.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error47 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "\u5B57\u7B26", verb: "\u5305\u542B" },
        file: { unit: "\u5B57\u8282", verb: "\u5305\u542B" },
        array: { unit: "\u9879", verb: "\u5305\u542B" },
        set: { unit: "\u9879", verb: "\u5305\u542B" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "\u8F93\u5165",
        email: "\u7535\u5B50\u90AE\u4EF6",
        url: "URL",
        emoji: "\u8868\u60C5\u7B26\u53F7",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO\u65E5\u671F\u65F6\u95F4",
        date: "ISO\u65E5\u671F",
        time: "ISO\u65F6\u95F4",
        duration: "ISO\u65F6\u957F",
        ipv4: "IPv4\u5730\u5740",
        ipv6: "IPv6\u5730\u5740",
        cidrv4: "IPv4\u7F51\u6BB5",
        cidrv6: "IPv6\u7F51\u6BB5",
        base64: "base64\u7F16\u7801\u5B57\u7B26\u4E32",
        base64url: "base64url\u7F16\u7801\u5B57\u7B26\u4E32",
        json_string: "JSON\u5B57\u7B26\u4E32",
        e164: "E.164\u53F7\u7801",
        jwt: "JWT",
        template_literal: "\u8F93\u5165"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "\u6570\u5B57",
        array: "\u6570\u7EC4",
        null: "\u7A7A\u503C(null)"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B instanceof ${issue2.expected}\uFF0C\u5B9E\u9645\u63A5\u6536 ${received}`;
            }
            return `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B ${expected}\uFF0C\u5B9E\u9645\u63A5\u6536 ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `\u65E0\u6548\u8F93\u5165\uFF1A\u671F\u671B ${stringifyPrimitive(issue2.values[0])}`;
            return `\u65E0\u6548\u9009\u9879\uFF1A\u671F\u671B\u4EE5\u4E0B\u4E4B\u4E00 ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `\u6570\u503C\u8FC7\u5927\uFF1A\u671F\u671B ${issue2.origin ?? "\u503C"} ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u4E2A\u5143\u7D20"}`;
            return `\u6570\u503C\u8FC7\u5927\uFF1A\u671F\u671B ${issue2.origin ?? "\u503C"} ${adj}${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `\u6570\u503C\u8FC7\u5C0F\uFF1A\u671F\u671B ${issue2.origin} ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
            }
            return `\u6570\u503C\u8FC7\u5C0F\uFF1A\u671F\u671B ${issue2.origin} ${adj}${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with")
              return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u4EE5 "${_issue.prefix}" \u5F00\u5934`;
            if (_issue.format === "ends_with")
              return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u4EE5 "${_issue.suffix}" \u7ED3\u5C3E`;
            if (_issue.format === "includes")
              return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u5305\u542B "${_issue.includes}"`;
            if (_issue.format === "regex")
              return `\u65E0\u6548\u5B57\u7B26\u4E32\uFF1A\u5FC5\u987B\u6EE1\u8DB3\u6B63\u5219\u8868\u8FBE\u5F0F ${_issue.pattern}`;
            return `\u65E0\u6548${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `\u65E0\u6548\u6570\u5B57\uFF1A\u5FC5\u987B\u662F ${issue2.divisor} \u7684\u500D\u6570`;
          case "unrecognized_keys":
            return `\u51FA\u73B0\u672A\u77E5\u7684\u952E(key): ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `${issue2.origin} \u4E2D\u7684\u952E(key)\u65E0\u6548`;
          case "invalid_union":
            return "\u65E0\u6548\u8F93\u5165";
          case "invalid_element":
            return `${issue2.origin} \u4E2D\u5305\u542B\u65E0\u6548\u503C(value)`;
          default:
            return `\u65E0\u6548\u8F93\u5165`;
        }
      };
    }, "error");
    __name(zh_CN_default, "default");
  }
});

// ../node_modules/zod/v4/locales/zh-TW.js
function zh_TW_default() {
  return {
    localeError: error48()
  };
}
var error48;
var init_zh_TW = __esm({
  "../node_modules/zod/v4/locales/zh-TW.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error48 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "\u5B57\u5143", verb: "\u64C1\u6709" },
        file: { unit: "\u4F4D\u5143\u7D44", verb: "\u64C1\u6709" },
        array: { unit: "\u9805\u76EE", verb: "\u64C1\u6709" },
        set: { unit: "\u9805\u76EE", verb: "\u64C1\u6709" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "\u8F38\u5165",
        email: "\u90F5\u4EF6\u5730\u5740",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "ISO \u65E5\u671F\u6642\u9593",
        date: "ISO \u65E5\u671F",
        time: "ISO \u6642\u9593",
        duration: "ISO \u671F\u9593",
        ipv4: "IPv4 \u4F4D\u5740",
        ipv6: "IPv6 \u4F4D\u5740",
        cidrv4: "IPv4 \u7BC4\u570D",
        cidrv6: "IPv6 \u7BC4\u570D",
        base64: "base64 \u7DE8\u78BC\u5B57\u4E32",
        base64url: "base64url \u7DE8\u78BC\u5B57\u4E32",
        json_string: "JSON \u5B57\u4E32",
        e164: "E.164 \u6578\u503C",
        jwt: "JWT",
        template_literal: "\u8F38\u5165"
      };
      const TypeDictionary = {
        nan: "NaN"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA instanceof ${issue2.expected}\uFF0C\u4F46\u6536\u5230 ${received}`;
            }
            return `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA ${expected}\uFF0C\u4F46\u6536\u5230 ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `\u7121\u6548\u7684\u8F38\u5165\u503C\uFF1A\u9810\u671F\u70BA ${stringifyPrimitive(issue2.values[0])}`;
            return `\u7121\u6548\u7684\u9078\u9805\uFF1A\u9810\u671F\u70BA\u4EE5\u4E0B\u5176\u4E2D\u4E4B\u4E00 ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `\u6578\u503C\u904E\u5927\uFF1A\u9810\u671F ${issue2.origin ?? "\u503C"} \u61C9\u70BA ${adj}${issue2.maximum.toString()} ${sizing.unit ?? "\u500B\u5143\u7D20"}`;
            return `\u6578\u503C\u904E\u5927\uFF1A\u9810\u671F ${issue2.origin ?? "\u503C"} \u61C9\u70BA ${adj}${issue2.maximum.toString()}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing) {
              return `\u6578\u503C\u904E\u5C0F\uFF1A\u9810\u671F ${issue2.origin} \u61C9\u70BA ${adj}${issue2.minimum.toString()} ${sizing.unit}`;
            }
            return `\u6578\u503C\u904E\u5C0F\uFF1A\u9810\u671F ${issue2.origin} \u61C9\u70BA ${adj}${issue2.minimum.toString()}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with") {
              return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u4EE5 "${_issue.prefix}" \u958B\u982D`;
            }
            if (_issue.format === "ends_with")
              return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u4EE5 "${_issue.suffix}" \u7D50\u5C3E`;
            if (_issue.format === "includes")
              return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u5305\u542B "${_issue.includes}"`;
            if (_issue.format === "regex")
              return `\u7121\u6548\u7684\u5B57\u4E32\uFF1A\u5FC5\u9808\u7B26\u5408\u683C\u5F0F ${_issue.pattern}`;
            return `\u7121\u6548\u7684 ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `\u7121\u6548\u7684\u6578\u5B57\uFF1A\u5FC5\u9808\u70BA ${issue2.divisor} \u7684\u500D\u6578`;
          case "unrecognized_keys":
            return `\u7121\u6CD5\u8B58\u5225\u7684\u9375\u503C${issue2.keys.length > 1 ? "\u5011" : ""}\uFF1A${joinValues(issue2.keys, "\u3001")}`;
          case "invalid_key":
            return `${issue2.origin} \u4E2D\u6709\u7121\u6548\u7684\u9375\u503C`;
          case "invalid_union":
            return "\u7121\u6548\u7684\u8F38\u5165\u503C";
          case "invalid_element":
            return `${issue2.origin} \u4E2D\u6709\u7121\u6548\u7684\u503C`;
          default:
            return `\u7121\u6548\u7684\u8F38\u5165\u503C`;
        }
      };
    }, "error");
    __name(zh_TW_default, "default");
  }
});

// ../node_modules/zod/v4/locales/yo.js
function yo_default() {
  return {
    localeError: error49()
  };
}
var error49;
var init_yo = __esm({
  "../node_modules/zod/v4/locales/yo.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    error49 = /* @__PURE__ */ __name(() => {
      const Sizable = {
        string: { unit: "\xE0mi", verb: "n\xED" },
        file: { unit: "bytes", verb: "n\xED" },
        array: { unit: "nkan", verb: "n\xED" },
        set: { unit: "nkan", verb: "n\xED" }
      };
      function getSizing(origin) {
        return Sizable[origin] ?? null;
      }
      __name(getSizing, "getSizing");
      const FormatDictionary = {
        regex: "\u1EB9\u0300r\u1ECD \xECb\xE1w\u1ECDl\xE9",
        email: "\xE0d\xEDr\u1EB9\u0301s\xEC \xECm\u1EB9\u0301l\xEC",
        url: "URL",
        emoji: "emoji",
        uuid: "UUID",
        uuidv4: "UUIDv4",
        uuidv6: "UUIDv6",
        nanoid: "nanoid",
        guid: "GUID",
        cuid: "cuid",
        cuid2: "cuid2",
        ulid: "ULID",
        xid: "XID",
        ksuid: "KSUID",
        datetime: "\xE0k\xF3k\xF2 ISO",
        date: "\u1ECDj\u1ECD\u0301 ISO",
        time: "\xE0k\xF3k\xF2 ISO",
        duration: "\xE0k\xF3k\xF2 t\xF3 p\xE9 ISO",
        ipv4: "\xE0d\xEDr\u1EB9\u0301s\xEC IPv4",
        ipv6: "\xE0d\xEDr\u1EB9\u0301s\xEC IPv6",
        cidrv4: "\xE0gb\xE8gb\xE8 IPv4",
        cidrv6: "\xE0gb\xE8gb\xE8 IPv6",
        base64: "\u1ECD\u0300r\u1ECD\u0300 t\xED a k\u1ECD\u0301 n\xED base64",
        base64url: "\u1ECD\u0300r\u1ECD\u0300 base64url",
        json_string: "\u1ECD\u0300r\u1ECD\u0300 JSON",
        e164: "n\u1ECD\u0301mb\xE0 E.164",
        jwt: "JWT",
        template_literal: "\u1EB9\u0300r\u1ECD \xECb\xE1w\u1ECDl\xE9"
      };
      const TypeDictionary = {
        nan: "NaN",
        number: "n\u1ECD\u0301mb\xE0",
        array: "akop\u1ECD"
      };
      return (issue2) => {
        switch (issue2.code) {
          case "invalid_type": {
            const expected = TypeDictionary[issue2.expected] ?? issue2.expected;
            const receivedType = parsedType(issue2.input);
            const received = TypeDictionary[receivedType] ?? receivedType;
            if (/^[A-Z]/.test(issue2.expected)) {
              return `\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e: a n\xED l\xE1ti fi instanceof ${issue2.expected}, \xE0m\u1ECD\u0300 a r\xED ${received}`;
            }
            return `\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e: a n\xED l\xE1ti fi ${expected}, \xE0m\u1ECD\u0300 a r\xED ${received}`;
          }
          case "invalid_value":
            if (issue2.values.length === 1)
              return `\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e: a n\xED l\xE1ti fi ${stringifyPrimitive(issue2.values[0])}`;
            return `\xC0\u1E63\xE0y\xE0n a\u1E63\xEC\u1E63e: yan \u1ECD\u0300kan l\xE1ra ${joinValues(issue2.values, "|")}`;
          case "too_big": {
            const adj = issue2.inclusive ? "<=" : "<";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `T\xF3 p\u1ECD\u0300 j\xF9: a n\xED l\xE1ti j\u1EB9\u0301 p\xE9 ${issue2.origin ?? "iye"} ${sizing.verb} ${adj}${issue2.maximum} ${sizing.unit}`;
            return `T\xF3 p\u1ECD\u0300 j\xF9: a n\xED l\xE1ti j\u1EB9\u0301 ${adj}${issue2.maximum}`;
          }
          case "too_small": {
            const adj = issue2.inclusive ? ">=" : ">";
            const sizing = getSizing(issue2.origin);
            if (sizing)
              return `K\xE9r\xE9 ju: a n\xED l\xE1ti j\u1EB9\u0301 p\xE9 ${issue2.origin} ${sizing.verb} ${adj}${issue2.minimum} ${sizing.unit}`;
            return `K\xE9r\xE9 ju: a n\xED l\xE1ti j\u1EB9\u0301 ${adj}${issue2.minimum}`;
          }
          case "invalid_format": {
            const _issue = issue2;
            if (_issue.format === "starts_with")
              return `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 b\u1EB9\u0300r\u1EB9\u0300 p\u1EB9\u0300l\xFA "${_issue.prefix}"`;
            if (_issue.format === "ends_with")
              return `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 par\xED p\u1EB9\u0300l\xFA "${_issue.suffix}"`;
            if (_issue.format === "includes")
              return `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 n\xED "${_issue.includes}"`;
            if (_issue.format === "regex")
              return `\u1ECC\u0300r\u1ECD\u0300 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 b\xE1 \xE0p\u1EB9\u1EB9r\u1EB9 mu ${_issue.pattern}`;
            return `A\u1E63\xEC\u1E63e: ${FormatDictionary[_issue.format] ?? issue2.format}`;
          }
          case "not_multiple_of":
            return `N\u1ECD\u0301mb\xE0 a\u1E63\xEC\u1E63e: gb\u1ECD\u0301d\u1ECD\u0300 j\u1EB9\u0301 \xE8y\xE0 p\xEDp\xEDn ti ${issue2.divisor}`;
          case "unrecognized_keys":
            return `B\u1ECDt\xECn\xEC \xE0\xECm\u1ECD\u0300: ${joinValues(issue2.keys, ", ")}`;
          case "invalid_key":
            return `B\u1ECDt\xECn\xEC a\u1E63\xEC\u1E63e n\xEDn\xFA ${issue2.origin}`;
          case "invalid_union":
            return "\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e";
          case "invalid_element":
            return `Iye a\u1E63\xEC\u1E63e n\xEDn\xFA ${issue2.origin}`;
          default:
            return "\xCCb\xE1w\u1ECDl\xE9 a\u1E63\xEC\u1E63e";
        }
      };
    }, "error");
    __name(yo_default, "default");
  }
});

// ../node_modules/zod/v4/locales/index.js
var locales_exports = {};
__export(locales_exports, {
  ar: () => ar_default,
  az: () => az_default,
  be: () => be_default,
  bg: () => bg_default,
  ca: () => ca_default,
  cs: () => cs_default,
  da: () => da_default,
  de: () => de_default,
  en: () => en_default,
  eo: () => eo_default,
  es: () => es_default,
  fa: () => fa_default,
  fi: () => fi_default,
  fr: () => fr_default,
  frCA: () => fr_CA_default,
  he: () => he_default,
  hu: () => hu_default,
  hy: () => hy_default,
  id: () => id_default,
  is: () => is_default,
  it: () => it_default,
  ja: () => ja_default,
  ka: () => ka_default,
  kh: () => kh_default,
  km: () => km_default,
  ko: () => ko_default,
  lt: () => lt_default,
  mk: () => mk_default,
  ms: () => ms_default,
  nl: () => nl_default,
  no: () => no_default,
  ota: () => ota_default,
  pl: () => pl_default,
  ps: () => ps_default,
  pt: () => pt_default,
  ru: () => ru_default,
  sl: () => sl_default,
  sv: () => sv_default,
  ta: () => ta_default,
  th: () => th_default,
  tr: () => tr_default,
  ua: () => ua_default,
  uk: () => uk_default,
  ur: () => ur_default,
  uz: () => uz_default,
  vi: () => vi_default,
  yo: () => yo_default,
  zhCN: () => zh_CN_default,
  zhTW: () => zh_TW_default
});
var init_locales = __esm({
  "../node_modules/zod/v4/locales/index.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_ar();
    init_az();
    init_be();
    init_bg();
    init_ca();
    init_cs();
    init_da();
    init_de();
    init_en();
    init_eo();
    init_es();
    init_fa();
    init_fi();
    init_fr();
    init_fr_CA();
    init_he();
    init_hu();
    init_hy();
    init_id();
    init_is();
    init_it();
    init_ja();
    init_ka();
    init_kh();
    init_km();
    init_ko();
    init_lt();
    init_mk();
    init_ms();
    init_nl();
    init_no();
    init_ota();
    init_ps();
    init_pl();
    init_pt();
    init_ru();
    init_sl();
    init_sv();
    init_ta();
    init_th();
    init_tr();
    init_ua();
    init_uk();
    init_ur();
    init_uz();
    init_vi();
    init_zh_CN();
    init_zh_TW();
    init_yo();
  }
});

// ../node_modules/zod/v4/core/registries.js
function registry() {
  return new $ZodRegistry();
}
var _a, $output, $input, $ZodRegistry, globalRegistry;
var init_registries = __esm({
  "../node_modules/zod/v4/core/registries.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    $output = Symbol("ZodOutput");
    $input = Symbol("ZodInput");
    $ZodRegistry = class {
      constructor() {
        this._map = /* @__PURE__ */ new WeakMap();
        this._idmap = /* @__PURE__ */ new Map();
      }
      add(schema, ..._meta) {
        const meta3 = _meta[0];
        this._map.set(schema, meta3);
        if (meta3 && typeof meta3 === "object" && "id" in meta3) {
          this._idmap.set(meta3.id, schema);
        }
        return this;
      }
      clear() {
        this._map = /* @__PURE__ */ new WeakMap();
        this._idmap = /* @__PURE__ */ new Map();
        return this;
      }
      remove(schema) {
        const meta3 = this._map.get(schema);
        if (meta3 && typeof meta3 === "object" && "id" in meta3) {
          this._idmap.delete(meta3.id);
        }
        this._map.delete(schema);
        return this;
      }
      get(schema) {
        const p = schema._zod.parent;
        if (p) {
          const pm = { ...this.get(p) ?? {} };
          delete pm.id;
          const f = { ...pm, ...this._map.get(schema) };
          return Object.keys(f).length ? f : void 0;
        }
        return this._map.get(schema);
      }
      has(schema) {
        return this._map.has(schema);
      }
    };
    __name($ZodRegistry, "$ZodRegistry");
    __name(registry, "registry");
    (_a = globalThis).__zod_globalRegistry ?? (_a.__zod_globalRegistry = registry());
    globalRegistry = globalThis.__zod_globalRegistry;
  }
});

// ../node_modules/zod/v4/core/api.js
function _string(Class2, params) {
  return new Class2({
    type: "string",
    ...normalizeParams(params)
  });
}
function _coercedString(Class2, params) {
  return new Class2({
    type: "string",
    coerce: true,
    ...normalizeParams(params)
  });
}
function _email(Class2, params) {
  return new Class2({
    type: "string",
    format: "email",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _guid(Class2, params) {
  return new Class2({
    type: "string",
    format: "guid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _uuid(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _uuidv4(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v4",
    ...normalizeParams(params)
  });
}
function _uuidv6(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v6",
    ...normalizeParams(params)
  });
}
function _uuidv7(Class2, params) {
  return new Class2({
    type: "string",
    format: "uuid",
    check: "string_format",
    abort: false,
    version: "v7",
    ...normalizeParams(params)
  });
}
function _url(Class2, params) {
  return new Class2({
    type: "string",
    format: "url",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _emoji2(Class2, params) {
  return new Class2({
    type: "string",
    format: "emoji",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _nanoid(Class2, params) {
  return new Class2({
    type: "string",
    format: "nanoid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cuid(Class2, params) {
  return new Class2({
    type: "string",
    format: "cuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cuid2(Class2, params) {
  return new Class2({
    type: "string",
    format: "cuid2",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ulid(Class2, params) {
  return new Class2({
    type: "string",
    format: "ulid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _xid(Class2, params) {
  return new Class2({
    type: "string",
    format: "xid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ksuid(Class2, params) {
  return new Class2({
    type: "string",
    format: "ksuid",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ipv4(Class2, params) {
  return new Class2({
    type: "string",
    format: "ipv4",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _ipv6(Class2, params) {
  return new Class2({
    type: "string",
    format: "ipv6",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _mac(Class2, params) {
  return new Class2({
    type: "string",
    format: "mac",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cidrv4(Class2, params) {
  return new Class2({
    type: "string",
    format: "cidrv4",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _cidrv6(Class2, params) {
  return new Class2({
    type: "string",
    format: "cidrv6",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _base64(Class2, params) {
  return new Class2({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _base64url(Class2, params) {
  return new Class2({
    type: "string",
    format: "base64url",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _e164(Class2, params) {
  return new Class2({
    type: "string",
    format: "e164",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _jwt(Class2, params) {
  return new Class2({
    type: "string",
    format: "jwt",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _isoDateTime(Class2, params) {
  return new Class2({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: false,
    local: false,
    precision: null,
    ...normalizeParams(params)
  });
}
function _isoDate(Class2, params) {
  return new Class2({
    type: "string",
    format: "date",
    check: "string_format",
    ...normalizeParams(params)
  });
}
function _isoTime(Class2, params) {
  return new Class2({
    type: "string",
    format: "time",
    check: "string_format",
    precision: null,
    ...normalizeParams(params)
  });
}
function _isoDuration(Class2, params) {
  return new Class2({
    type: "string",
    format: "duration",
    check: "string_format",
    ...normalizeParams(params)
  });
}
function _number(Class2, params) {
  return new Class2({
    type: "number",
    checks: [],
    ...normalizeParams(params)
  });
}
function _coercedNumber(Class2, params) {
  return new Class2({
    type: "number",
    coerce: true,
    checks: [],
    ...normalizeParams(params)
  });
}
function _int(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "safeint",
    ...normalizeParams(params)
  });
}
function _float32(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "float32",
    ...normalizeParams(params)
  });
}
function _float64(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "float64",
    ...normalizeParams(params)
  });
}
function _int32(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "int32",
    ...normalizeParams(params)
  });
}
function _uint32(Class2, params) {
  return new Class2({
    type: "number",
    check: "number_format",
    abort: false,
    format: "uint32",
    ...normalizeParams(params)
  });
}
function _boolean(Class2, params) {
  return new Class2({
    type: "boolean",
    ...normalizeParams(params)
  });
}
function _coercedBoolean(Class2, params) {
  return new Class2({
    type: "boolean",
    coerce: true,
    ...normalizeParams(params)
  });
}
function _bigint(Class2, params) {
  return new Class2({
    type: "bigint",
    ...normalizeParams(params)
  });
}
function _coercedBigint(Class2, params) {
  return new Class2({
    type: "bigint",
    coerce: true,
    ...normalizeParams(params)
  });
}
function _int64(Class2, params) {
  return new Class2({
    type: "bigint",
    check: "bigint_format",
    abort: false,
    format: "int64",
    ...normalizeParams(params)
  });
}
function _uint64(Class2, params) {
  return new Class2({
    type: "bigint",
    check: "bigint_format",
    abort: false,
    format: "uint64",
    ...normalizeParams(params)
  });
}
function _symbol(Class2, params) {
  return new Class2({
    type: "symbol",
    ...normalizeParams(params)
  });
}
function _undefined2(Class2, params) {
  return new Class2({
    type: "undefined",
    ...normalizeParams(params)
  });
}
function _null2(Class2, params) {
  return new Class2({
    type: "null",
    ...normalizeParams(params)
  });
}
function _any(Class2) {
  return new Class2({
    type: "any"
  });
}
function _unknown(Class2) {
  return new Class2({
    type: "unknown"
  });
}
function _never(Class2, params) {
  return new Class2({
    type: "never",
    ...normalizeParams(params)
  });
}
function _void(Class2, params) {
  return new Class2({
    type: "void",
    ...normalizeParams(params)
  });
}
function _date(Class2, params) {
  return new Class2({
    type: "date",
    ...normalizeParams(params)
  });
}
function _coercedDate(Class2, params) {
  return new Class2({
    type: "date",
    coerce: true,
    ...normalizeParams(params)
  });
}
function _nan(Class2, params) {
  return new Class2({
    type: "nan",
    ...normalizeParams(params)
  });
}
function _lt(value, params) {
  return new $ZodCheckLessThan({
    check: "less_than",
    ...normalizeParams(params),
    value,
    inclusive: false
  });
}
function _lte(value, params) {
  return new $ZodCheckLessThan({
    check: "less_than",
    ...normalizeParams(params),
    value,
    inclusive: true
  });
}
function _gt(value, params) {
  return new $ZodCheckGreaterThan({
    check: "greater_than",
    ...normalizeParams(params),
    value,
    inclusive: false
  });
}
function _gte(value, params) {
  return new $ZodCheckGreaterThan({
    check: "greater_than",
    ...normalizeParams(params),
    value,
    inclusive: true
  });
}
function _positive(params) {
  return _gt(0, params);
}
function _negative(params) {
  return _lt(0, params);
}
function _nonpositive(params) {
  return _lte(0, params);
}
function _nonnegative(params) {
  return _gte(0, params);
}
function _multipleOf(value, params) {
  return new $ZodCheckMultipleOf({
    check: "multiple_of",
    ...normalizeParams(params),
    value
  });
}
function _maxSize(maximum, params) {
  return new $ZodCheckMaxSize({
    check: "max_size",
    ...normalizeParams(params),
    maximum
  });
}
function _minSize(minimum, params) {
  return new $ZodCheckMinSize({
    check: "min_size",
    ...normalizeParams(params),
    minimum
  });
}
function _size(size, params) {
  return new $ZodCheckSizeEquals({
    check: "size_equals",
    ...normalizeParams(params),
    size
  });
}
function _maxLength(maximum, params) {
  const ch = new $ZodCheckMaxLength({
    check: "max_length",
    ...normalizeParams(params),
    maximum
  });
  return ch;
}
function _minLength(minimum, params) {
  return new $ZodCheckMinLength({
    check: "min_length",
    ...normalizeParams(params),
    minimum
  });
}
function _length(length, params) {
  return new $ZodCheckLengthEquals({
    check: "length_equals",
    ...normalizeParams(params),
    length
  });
}
function _regex(pattern, params) {
  return new $ZodCheckRegex({
    check: "string_format",
    format: "regex",
    ...normalizeParams(params),
    pattern
  });
}
function _lowercase(params) {
  return new $ZodCheckLowerCase({
    check: "string_format",
    format: "lowercase",
    ...normalizeParams(params)
  });
}
function _uppercase(params) {
  return new $ZodCheckUpperCase({
    check: "string_format",
    format: "uppercase",
    ...normalizeParams(params)
  });
}
function _includes(includes, params) {
  return new $ZodCheckIncludes({
    check: "string_format",
    format: "includes",
    ...normalizeParams(params),
    includes
  });
}
function _startsWith(prefix, params) {
  return new $ZodCheckStartsWith({
    check: "string_format",
    format: "starts_with",
    ...normalizeParams(params),
    prefix
  });
}
function _endsWith(suffix, params) {
  return new $ZodCheckEndsWith({
    check: "string_format",
    format: "ends_with",
    ...normalizeParams(params),
    suffix
  });
}
function _property(property, schema, params) {
  return new $ZodCheckProperty({
    check: "property",
    property,
    schema,
    ...normalizeParams(params)
  });
}
function _mime(types, params) {
  return new $ZodCheckMimeType({
    check: "mime_type",
    mime: types,
    ...normalizeParams(params)
  });
}
function _overwrite(tx) {
  return new $ZodCheckOverwrite({
    check: "overwrite",
    tx
  });
}
function _normalize(form) {
  return _overwrite((input) => input.normalize(form));
}
function _trim() {
  return _overwrite((input) => input.trim());
}
function _toLowerCase() {
  return _overwrite((input) => input.toLowerCase());
}
function _toUpperCase() {
  return _overwrite((input) => input.toUpperCase());
}
function _slugify() {
  return _overwrite((input) => slugify(input));
}
function _array(Class2, element, params) {
  return new Class2({
    type: "array",
    element,
    // get element() {
    //   return element;
    // },
    ...normalizeParams(params)
  });
}
function _union(Class2, options, params) {
  return new Class2({
    type: "union",
    options,
    ...normalizeParams(params)
  });
}
function _xor(Class2, options, params) {
  return new Class2({
    type: "union",
    options,
    inclusive: false,
    ...normalizeParams(params)
  });
}
function _discriminatedUnion(Class2, discriminator, options, params) {
  return new Class2({
    type: "union",
    options,
    discriminator,
    ...normalizeParams(params)
  });
}
function _intersection(Class2, left, right) {
  return new Class2({
    type: "intersection",
    left,
    right
  });
}
function _tuple(Class2, items, _paramsOrRest, _params) {
  const hasRest = _paramsOrRest instanceof $ZodType;
  const params = hasRest ? _params : _paramsOrRest;
  const rest = hasRest ? _paramsOrRest : null;
  return new Class2({
    type: "tuple",
    items,
    rest,
    ...normalizeParams(params)
  });
}
function _record(Class2, keyType, valueType, params) {
  return new Class2({
    type: "record",
    keyType,
    valueType,
    ...normalizeParams(params)
  });
}
function _map(Class2, keyType, valueType, params) {
  return new Class2({
    type: "map",
    keyType,
    valueType,
    ...normalizeParams(params)
  });
}
function _set(Class2, valueType, params) {
  return new Class2({
    type: "set",
    valueType,
    ...normalizeParams(params)
  });
}
function _enum(Class2, values, params) {
  const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
  return new Class2({
    type: "enum",
    entries,
    ...normalizeParams(params)
  });
}
function _nativeEnum(Class2, entries, params) {
  return new Class2({
    type: "enum",
    entries,
    ...normalizeParams(params)
  });
}
function _literal(Class2, value, params) {
  return new Class2({
    type: "literal",
    values: Array.isArray(value) ? value : [value],
    ...normalizeParams(params)
  });
}
function _file(Class2, params) {
  return new Class2({
    type: "file",
    ...normalizeParams(params)
  });
}
function _transform(Class2, fn) {
  return new Class2({
    type: "transform",
    transform: fn
  });
}
function _optional(Class2, innerType) {
  return new Class2({
    type: "optional",
    innerType
  });
}
function _nullable(Class2, innerType) {
  return new Class2({
    type: "nullable",
    innerType
  });
}
function _default(Class2, innerType, defaultValue) {
  return new Class2({
    type: "default",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
    }
  });
}
function _nonoptional(Class2, innerType, params) {
  return new Class2({
    type: "nonoptional",
    innerType,
    ...normalizeParams(params)
  });
}
function _success(Class2, innerType) {
  return new Class2({
    type: "success",
    innerType
  });
}
function _catch(Class2, innerType, catchValue) {
  return new Class2({
    type: "catch",
    innerType,
    catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
  });
}
function _pipe(Class2, in_, out) {
  return new Class2({
    type: "pipe",
    in: in_,
    out
  });
}
function _readonly(Class2, innerType) {
  return new Class2({
    type: "readonly",
    innerType
  });
}
function _templateLiteral(Class2, parts, params) {
  return new Class2({
    type: "template_literal",
    parts,
    ...normalizeParams(params)
  });
}
function _lazy(Class2, getter) {
  return new Class2({
    type: "lazy",
    getter
  });
}
function _promise(Class2, innerType) {
  return new Class2({
    type: "promise",
    innerType
  });
}
function _custom(Class2, fn, _params) {
  const norm = normalizeParams(_params);
  norm.abort ?? (norm.abort = true);
  const schema = new Class2({
    type: "custom",
    check: "custom",
    fn,
    ...norm
  });
  return schema;
}
function _refine(Class2, fn, _params) {
  const schema = new Class2({
    type: "custom",
    check: "custom",
    fn,
    ...normalizeParams(_params)
  });
  return schema;
}
function _superRefine(fn) {
  const ch = _check((payload) => {
    payload.addIssue = (issue2) => {
      if (typeof issue2 === "string") {
        payload.issues.push(issue(issue2, payload.value, ch._zod.def));
      } else {
        const _issue = issue2;
        if (_issue.fatal)
          _issue.continue = false;
        _issue.code ?? (_issue.code = "custom");
        _issue.input ?? (_issue.input = payload.value);
        _issue.inst ?? (_issue.inst = ch);
        _issue.continue ?? (_issue.continue = !ch._zod.def.abort);
        payload.issues.push(issue(_issue));
      }
    };
    return fn(payload.value, payload);
  });
  return ch;
}
function _check(fn, params) {
  const ch = new $ZodCheck({
    check: "custom",
    ...normalizeParams(params)
  });
  ch._zod.check = fn;
  return ch;
}
function describe(description) {
  const ch = new $ZodCheck({ check: "describe" });
  ch._zod.onattach = [
    (inst) => {
      const existing = globalRegistry.get(inst) ?? {};
      globalRegistry.add(inst, { ...existing, description });
    }
  ];
  ch._zod.check = () => {
  };
  return ch;
}
function meta(metadata) {
  const ch = new $ZodCheck({ check: "meta" });
  ch._zod.onattach = [
    (inst) => {
      const existing = globalRegistry.get(inst) ?? {};
      globalRegistry.add(inst, { ...existing, ...metadata });
    }
  ];
  ch._zod.check = () => {
  };
  return ch;
}
function _stringbool(Classes, _params) {
  const params = normalizeParams(_params);
  let truthyArray = params.truthy ?? ["true", "1", "yes", "on", "y", "enabled"];
  let falsyArray = params.falsy ?? ["false", "0", "no", "off", "n", "disabled"];
  if (params.case !== "sensitive") {
    truthyArray = truthyArray.map((v) => typeof v === "string" ? v.toLowerCase() : v);
    falsyArray = falsyArray.map((v) => typeof v === "string" ? v.toLowerCase() : v);
  }
  const truthySet = new Set(truthyArray);
  const falsySet = new Set(falsyArray);
  const _Codec = Classes.Codec ?? $ZodCodec;
  const _Boolean = Classes.Boolean ?? $ZodBoolean;
  const _String = Classes.String ?? $ZodString;
  const stringSchema = new _String({ type: "string", error: params.error });
  const booleanSchema = new _Boolean({ type: "boolean", error: params.error });
  const codec2 = new _Codec({
    type: "pipe",
    in: stringSchema,
    out: booleanSchema,
    transform: (input, payload) => {
      let data = input;
      if (params.case !== "sensitive")
        data = data.toLowerCase();
      if (truthySet.has(data)) {
        return true;
      } else if (falsySet.has(data)) {
        return false;
      } else {
        payload.issues.push({
          code: "invalid_value",
          expected: "stringbool",
          values: [...truthySet, ...falsySet],
          input: payload.value,
          inst: codec2,
          continue: false
        });
        return {};
      }
    },
    reverseTransform: (input, _payload) => {
      if (input === true) {
        return truthyArray[0] || "true";
      } else {
        return falsyArray[0] || "false";
      }
    },
    error: params.error
  });
  return codec2;
}
function _stringFormat(Class2, format, fnOrRegex, _params = {}) {
  const params = normalizeParams(_params);
  const def = {
    ...normalizeParams(_params),
    check: "string_format",
    type: "string",
    format,
    fn: typeof fnOrRegex === "function" ? fnOrRegex : (val) => fnOrRegex.test(val),
    ...params
  };
  if (fnOrRegex instanceof RegExp) {
    def.pattern = fnOrRegex;
  }
  const inst = new Class2(def);
  return inst;
}
var TimePrecision;
var init_api = __esm({
  "../node_modules/zod/v4/core/api.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_checks();
    init_registries();
    init_schemas();
    init_util();
    __name(_string, "_string");
    __name(_coercedString, "_coercedString");
    __name(_email, "_email");
    __name(_guid, "_guid");
    __name(_uuid, "_uuid");
    __name(_uuidv4, "_uuidv4");
    __name(_uuidv6, "_uuidv6");
    __name(_uuidv7, "_uuidv7");
    __name(_url, "_url");
    __name(_emoji2, "_emoji");
    __name(_nanoid, "_nanoid");
    __name(_cuid, "_cuid");
    __name(_cuid2, "_cuid2");
    __name(_ulid, "_ulid");
    __name(_xid, "_xid");
    __name(_ksuid, "_ksuid");
    __name(_ipv4, "_ipv4");
    __name(_ipv6, "_ipv6");
    __name(_mac, "_mac");
    __name(_cidrv4, "_cidrv4");
    __name(_cidrv6, "_cidrv6");
    __name(_base64, "_base64");
    __name(_base64url, "_base64url");
    __name(_e164, "_e164");
    __name(_jwt, "_jwt");
    TimePrecision = {
      Any: null,
      Minute: -1,
      Second: 0,
      Millisecond: 3,
      Microsecond: 6
    };
    __name(_isoDateTime, "_isoDateTime");
    __name(_isoDate, "_isoDate");
    __name(_isoTime, "_isoTime");
    __name(_isoDuration, "_isoDuration");
    __name(_number, "_number");
    __name(_coercedNumber, "_coercedNumber");
    __name(_int, "_int");
    __name(_float32, "_float32");
    __name(_float64, "_float64");
    __name(_int32, "_int32");
    __name(_uint32, "_uint32");
    __name(_boolean, "_boolean");
    __name(_coercedBoolean, "_coercedBoolean");
    __name(_bigint, "_bigint");
    __name(_coercedBigint, "_coercedBigint");
    __name(_int64, "_int64");
    __name(_uint64, "_uint64");
    __name(_symbol, "_symbol");
    __name(_undefined2, "_undefined");
    __name(_null2, "_null");
    __name(_any, "_any");
    __name(_unknown, "_unknown");
    __name(_never, "_never");
    __name(_void, "_void");
    __name(_date, "_date");
    __name(_coercedDate, "_coercedDate");
    __name(_nan, "_nan");
    __name(_lt, "_lt");
    __name(_lte, "_lte");
    __name(_gt, "_gt");
    __name(_gte, "_gte");
    __name(_positive, "_positive");
    __name(_negative, "_negative");
    __name(_nonpositive, "_nonpositive");
    __name(_nonnegative, "_nonnegative");
    __name(_multipleOf, "_multipleOf");
    __name(_maxSize, "_maxSize");
    __name(_minSize, "_minSize");
    __name(_size, "_size");
    __name(_maxLength, "_maxLength");
    __name(_minLength, "_minLength");
    __name(_length, "_length");
    __name(_regex, "_regex");
    __name(_lowercase, "_lowercase");
    __name(_uppercase, "_uppercase");
    __name(_includes, "_includes");
    __name(_startsWith, "_startsWith");
    __name(_endsWith, "_endsWith");
    __name(_property, "_property");
    __name(_mime, "_mime");
    __name(_overwrite, "_overwrite");
    __name(_normalize, "_normalize");
    __name(_trim, "_trim");
    __name(_toLowerCase, "_toLowerCase");
    __name(_toUpperCase, "_toUpperCase");
    __name(_slugify, "_slugify");
    __name(_array, "_array");
    __name(_union, "_union");
    __name(_xor, "_xor");
    __name(_discriminatedUnion, "_discriminatedUnion");
    __name(_intersection, "_intersection");
    __name(_tuple, "_tuple");
    __name(_record, "_record");
    __name(_map, "_map");
    __name(_set, "_set");
    __name(_enum, "_enum");
    __name(_nativeEnum, "_nativeEnum");
    __name(_literal, "_literal");
    __name(_file, "_file");
    __name(_transform, "_transform");
    __name(_optional, "_optional");
    __name(_nullable, "_nullable");
    __name(_default, "_default");
    __name(_nonoptional, "_nonoptional");
    __name(_success, "_success");
    __name(_catch, "_catch");
    __name(_pipe, "_pipe");
    __name(_readonly, "_readonly");
    __name(_templateLiteral, "_templateLiteral");
    __name(_lazy, "_lazy");
    __name(_promise, "_promise");
    __name(_custom, "_custom");
    __name(_refine, "_refine");
    __name(_superRefine, "_superRefine");
    __name(_check, "_check");
    __name(describe, "describe");
    __name(meta, "meta");
    __name(_stringbool, "_stringbool");
    __name(_stringFormat, "_stringFormat");
  }
});

// ../node_modules/zod/v4/core/to-json-schema.js
function initializeContext(params) {
  let target = params?.target ?? "draft-2020-12";
  if (target === "draft-4")
    target = "draft-04";
  if (target === "draft-7")
    target = "draft-07";
  return {
    processors: params.processors ?? {},
    metadataRegistry: params?.metadata ?? globalRegistry,
    target,
    unrepresentable: params?.unrepresentable ?? "throw",
    override: params?.override ?? (() => {
    }),
    io: params?.io ?? "output",
    counter: 0,
    seen: /* @__PURE__ */ new Map(),
    cycles: params?.cycles ?? "ref",
    reused: params?.reused ?? "inline",
    external: params?.external ?? void 0
  };
}
function process(schema, ctx, _params = { path: [], schemaPath: [] }) {
  var _a2;
  const def = schema._zod.def;
  const seen = ctx.seen.get(schema);
  if (seen) {
    seen.count++;
    const isCycle = _params.schemaPath.includes(schema);
    if (isCycle) {
      seen.cycle = _params.path;
    }
    return seen.schema;
  }
  const result = { schema: {}, count: 1, cycle: void 0, path: _params.path };
  ctx.seen.set(schema, result);
  const overrideSchema = schema._zod.toJSONSchema?.();
  if (overrideSchema) {
    result.schema = overrideSchema;
  } else {
    const params = {
      ..._params,
      schemaPath: [..._params.schemaPath, schema],
      path: _params.path
    };
    if (schema._zod.processJSONSchema) {
      schema._zod.processJSONSchema(ctx, result.schema, params);
    } else {
      const _json = result.schema;
      const processor = ctx.processors[def.type];
      if (!processor) {
        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${def.type}`);
      }
      processor(schema, ctx, _json, params);
    }
    const parent = schema._zod.parent;
    if (parent) {
      if (!result.ref)
        result.ref = parent;
      process(parent, ctx, params);
      ctx.seen.get(parent).isParent = true;
    }
  }
  const meta3 = ctx.metadataRegistry.get(schema);
  if (meta3)
    Object.assign(result.schema, meta3);
  if (ctx.io === "input" && isTransforming(schema)) {
    delete result.schema.examples;
    delete result.schema.default;
  }
  if (ctx.io === "input" && result.schema._prefault)
    (_a2 = result.schema).default ?? (_a2.default = result.schema._prefault);
  delete result.schema._prefault;
  const _result = ctx.seen.get(schema);
  return _result.schema;
}
function extractDefs(ctx, schema) {
  const root = ctx.seen.get(schema);
  if (!root)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const idToSchema = /* @__PURE__ */ new Map();
  for (const entry of ctx.seen.entries()) {
    const id = ctx.metadataRegistry.get(entry[0])?.id;
    if (id) {
      const existing = idToSchema.get(id);
      if (existing && existing !== entry[0]) {
        throw new Error(`Duplicate schema id "${id}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      }
      idToSchema.set(id, entry[0]);
    }
  }
  const makeURI = /* @__PURE__ */ __name((entry) => {
    const defsSegment = ctx.target === "draft-2020-12" ? "$defs" : "definitions";
    if (ctx.external) {
      const externalId = ctx.external.registry.get(entry[0])?.id;
      const uriGenerator = ctx.external.uri ?? ((id2) => id2);
      if (externalId) {
        return { ref: uriGenerator(externalId) };
      }
      const id = entry[1].defId ?? entry[1].schema.id ?? `schema${ctx.counter++}`;
      entry[1].defId = id;
      return { defId: id, ref: `${uriGenerator("__shared")}#/${defsSegment}/${id}` };
    }
    if (entry[1] === root) {
      return { ref: "#" };
    }
    const uriPrefix = `#`;
    const defUriPrefix = `${uriPrefix}/${defsSegment}/`;
    const defId = entry[1].schema.id ?? `__schema${ctx.counter++}`;
    return { defId, ref: defUriPrefix + defId };
  }, "makeURI");
  const extractToDef = /* @__PURE__ */ __name((entry) => {
    if (entry[1].schema.$ref) {
      return;
    }
    const seen = entry[1];
    const { ref, defId } = makeURI(entry);
    seen.def = { ...seen.schema };
    if (defId)
      seen.defId = defId;
    const schema2 = seen.schema;
    for (const key in schema2) {
      delete schema2[key];
    }
    schema2.$ref = ref;
  }, "extractToDef");
  if (ctx.cycles === "throw") {
    for (const entry of ctx.seen.entries()) {
      const seen = entry[1];
      if (seen.cycle) {
        throw new Error(`Cycle detected: #/${seen.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
      }
    }
  }
  for (const entry of ctx.seen.entries()) {
    const seen = entry[1];
    if (schema === entry[0]) {
      extractToDef(entry);
      continue;
    }
    if (ctx.external) {
      const ext = ctx.external.registry.get(entry[0])?.id;
      if (schema !== entry[0] && ext) {
        extractToDef(entry);
        continue;
      }
    }
    const id = ctx.metadataRegistry.get(entry[0])?.id;
    if (id) {
      extractToDef(entry);
      continue;
    }
    if (seen.cycle) {
      extractToDef(entry);
      continue;
    }
    if (seen.count > 1) {
      if (ctx.reused === "ref") {
        extractToDef(entry);
        continue;
      }
    }
  }
}
function finalize(ctx, schema) {
  const root = ctx.seen.get(schema);
  if (!root)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const flattenRef = /* @__PURE__ */ __name((zodSchema) => {
    const seen = ctx.seen.get(zodSchema);
    if (seen.ref === null)
      return;
    const schema2 = seen.def ?? seen.schema;
    const _cached = { ...schema2 };
    const ref = seen.ref;
    seen.ref = null;
    if (ref) {
      flattenRef(ref);
      const refSeen = ctx.seen.get(ref);
      const refSchema = refSeen.schema;
      if (refSchema.$ref && (ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0")) {
        schema2.allOf = schema2.allOf ?? [];
        schema2.allOf.push(refSchema);
      } else {
        Object.assign(schema2, refSchema);
      }
      Object.assign(schema2, _cached);
      const isParentRef = zodSchema._zod.parent === ref;
      if (isParentRef) {
        for (const key in schema2) {
          if (key === "$ref" || key === "allOf")
            continue;
          if (!(key in _cached)) {
            delete schema2[key];
          }
        }
      }
      if (refSchema.$ref && refSeen.def) {
        for (const key in schema2) {
          if (key === "$ref" || key === "allOf")
            continue;
          if (key in refSeen.def && JSON.stringify(schema2[key]) === JSON.stringify(refSeen.def[key])) {
            delete schema2[key];
          }
        }
      }
    }
    const parent = zodSchema._zod.parent;
    if (parent && parent !== ref) {
      flattenRef(parent);
      const parentSeen = ctx.seen.get(parent);
      if (parentSeen?.schema.$ref) {
        schema2.$ref = parentSeen.schema.$ref;
        if (parentSeen.def) {
          for (const key in schema2) {
            if (key === "$ref" || key === "allOf")
              continue;
            if (key in parentSeen.def && JSON.stringify(schema2[key]) === JSON.stringify(parentSeen.def[key])) {
              delete schema2[key];
            }
          }
        }
      }
    }
    ctx.override({
      zodSchema,
      jsonSchema: schema2,
      path: seen.path ?? []
    });
  }, "flattenRef");
  for (const entry of [...ctx.seen.entries()].reverse()) {
    flattenRef(entry[0]);
  }
  const result = {};
  if (ctx.target === "draft-2020-12") {
    result.$schema = "https://json-schema.org/draft/2020-12/schema";
  } else if (ctx.target === "draft-07") {
    result.$schema = "http://json-schema.org/draft-07/schema#";
  } else if (ctx.target === "draft-04") {
    result.$schema = "http://json-schema.org/draft-04/schema#";
  } else if (ctx.target === "openapi-3.0") {
  } else {
  }
  if (ctx.external?.uri) {
    const id = ctx.external.registry.get(schema)?.id;
    if (!id)
      throw new Error("Schema is missing an `id` property");
    result.$id = ctx.external.uri(id);
  }
  Object.assign(result, root.def ?? root.schema);
  const defs = ctx.external?.defs ?? {};
  for (const entry of ctx.seen.entries()) {
    const seen = entry[1];
    if (seen.def && seen.defId) {
      defs[seen.defId] = seen.def;
    }
  }
  if (ctx.external) {
  } else {
    if (Object.keys(defs).length > 0) {
      if (ctx.target === "draft-2020-12") {
        result.$defs = defs;
      } else {
        result.definitions = defs;
      }
    }
  }
  try {
    const finalized = JSON.parse(JSON.stringify(result));
    Object.defineProperty(finalized, "~standard", {
      value: {
        ...schema["~standard"],
        jsonSchema: {
          input: createStandardJSONSchemaMethod(schema, "input", ctx.processors),
          output: createStandardJSONSchemaMethod(schema, "output", ctx.processors)
        }
      },
      enumerable: false,
      writable: false
    });
    return finalized;
  } catch (_err) {
    throw new Error("Error converting schema to JSON.");
  }
}
function isTransforming(_schema, _ctx) {
  const ctx = _ctx ?? { seen: /* @__PURE__ */ new Set() };
  if (ctx.seen.has(_schema))
    return false;
  ctx.seen.add(_schema);
  const def = _schema._zod.def;
  if (def.type === "transform")
    return true;
  if (def.type === "array")
    return isTransforming(def.element, ctx);
  if (def.type === "set")
    return isTransforming(def.valueType, ctx);
  if (def.type === "lazy")
    return isTransforming(def.getter(), ctx);
  if (def.type === "promise" || def.type === "optional" || def.type === "nonoptional" || def.type === "nullable" || def.type === "readonly" || def.type === "default" || def.type === "prefault") {
    return isTransforming(def.innerType, ctx);
  }
  if (def.type === "intersection") {
    return isTransforming(def.left, ctx) || isTransforming(def.right, ctx);
  }
  if (def.type === "record" || def.type === "map") {
    return isTransforming(def.keyType, ctx) || isTransforming(def.valueType, ctx);
  }
  if (def.type === "pipe") {
    return isTransforming(def.in, ctx) || isTransforming(def.out, ctx);
  }
  if (def.type === "object") {
    for (const key in def.shape) {
      if (isTransforming(def.shape[key], ctx))
        return true;
    }
    return false;
  }
  if (def.type === "union") {
    for (const option of def.options) {
      if (isTransforming(option, ctx))
        return true;
    }
    return false;
  }
  if (def.type === "tuple") {
    for (const item of def.items) {
      if (isTransforming(item, ctx))
        return true;
    }
    if (def.rest && isTransforming(def.rest, ctx))
      return true;
    return false;
  }
  return false;
}
var createToJSONSchemaMethod, createStandardJSONSchemaMethod;
var init_to_json_schema = __esm({
  "../node_modules/zod/v4/core/to-json-schema.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_registries();
    __name(initializeContext, "initializeContext");
    __name(process, "process");
    __name(extractDefs, "extractDefs");
    __name(finalize, "finalize");
    __name(isTransforming, "isTransforming");
    createToJSONSchemaMethod = /* @__PURE__ */ __name((schema, processors = {}) => (params) => {
      const ctx = initializeContext({ ...params, processors });
      process(schema, ctx);
      extractDefs(ctx, schema);
      return finalize(ctx, schema);
    }, "createToJSONSchemaMethod");
    createStandardJSONSchemaMethod = /* @__PURE__ */ __name((schema, io, processors = {}) => (params) => {
      const { libraryOptions, target } = params ?? {};
      const ctx = initializeContext({ ...libraryOptions ?? {}, target, io, processors });
      process(schema, ctx);
      extractDefs(ctx, schema);
      return finalize(ctx, schema);
    }, "createStandardJSONSchemaMethod");
  }
});

// ../node_modules/zod/v4/core/json-schema-processors.js
function toJSONSchema(input, params) {
  if ("_idmap" in input) {
    const registry2 = input;
    const ctx2 = initializeContext({ ...params, processors: allProcessors });
    const defs = {};
    for (const entry of registry2._idmap.entries()) {
      const [_, schema] = entry;
      process(schema, ctx2);
    }
    const schemas = {};
    const external = {
      registry: registry2,
      uri: params?.uri,
      defs
    };
    ctx2.external = external;
    for (const entry of registry2._idmap.entries()) {
      const [key, schema] = entry;
      extractDefs(ctx2, schema);
      schemas[key] = finalize(ctx2, schema);
    }
    if (Object.keys(defs).length > 0) {
      const defsSegment = ctx2.target === "draft-2020-12" ? "$defs" : "definitions";
      schemas.__shared = {
        [defsSegment]: defs
      };
    }
    return { schemas };
  }
  const ctx = initializeContext({ ...params, processors: allProcessors });
  process(input, ctx);
  extractDefs(ctx, input);
  return finalize(ctx, input);
}
var formatMap, stringProcessor, numberProcessor, booleanProcessor, bigintProcessor, symbolProcessor, nullProcessor, undefinedProcessor, voidProcessor, neverProcessor, anyProcessor, unknownProcessor, dateProcessor, enumProcessor, literalProcessor, nanProcessor, templateLiteralProcessor, fileProcessor, successProcessor, customProcessor, functionProcessor, transformProcessor, mapProcessor, setProcessor, arrayProcessor, objectProcessor, unionProcessor, intersectionProcessor, tupleProcessor, recordProcessor, nullableProcessor, nonoptionalProcessor, defaultProcessor, prefaultProcessor, catchProcessor, pipeProcessor, readonlyProcessor, promiseProcessor, optionalProcessor, lazyProcessor, allProcessors;
var init_json_schema_processors = __esm({
  "../node_modules/zod/v4/core/json-schema-processors.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_to_json_schema();
    init_util();
    formatMap = {
      guid: "uuid",
      url: "uri",
      datetime: "date-time",
      json_string: "json-string",
      regex: ""
      // do not set
    };
    stringProcessor = /* @__PURE__ */ __name((schema, ctx, _json, _params) => {
      const json3 = _json;
      json3.type = "string";
      const { minimum, maximum, format, patterns, contentEncoding } = schema._zod.bag;
      if (typeof minimum === "number")
        json3.minLength = minimum;
      if (typeof maximum === "number")
        json3.maxLength = maximum;
      if (format) {
        json3.format = formatMap[format] ?? format;
        if (json3.format === "")
          delete json3.format;
        if (format === "time") {
          delete json3.format;
        }
      }
      if (contentEncoding)
        json3.contentEncoding = contentEncoding;
      if (patterns && patterns.size > 0) {
        const regexes = [...patterns];
        if (regexes.length === 1)
          json3.pattern = regexes[0].source;
        else if (regexes.length > 1) {
          json3.allOf = [
            ...regexes.map((regex) => ({
              ...ctx.target === "draft-07" || ctx.target === "draft-04" || ctx.target === "openapi-3.0" ? { type: "string" } : {},
              pattern: regex.source
            }))
          ];
        }
      }
    }, "stringProcessor");
    numberProcessor = /* @__PURE__ */ __name((schema, ctx, _json, _params) => {
      const json3 = _json;
      const { minimum, maximum, format, multipleOf, exclusiveMaximum, exclusiveMinimum } = schema._zod.bag;
      if (typeof format === "string" && format.includes("int"))
        json3.type = "integer";
      else
        json3.type = "number";
      if (typeof exclusiveMinimum === "number") {
        if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
          json3.minimum = exclusiveMinimum;
          json3.exclusiveMinimum = true;
        } else {
          json3.exclusiveMinimum = exclusiveMinimum;
        }
      }
      if (typeof minimum === "number") {
        json3.minimum = minimum;
        if (typeof exclusiveMinimum === "number" && ctx.target !== "draft-04") {
          if (exclusiveMinimum >= minimum)
            delete json3.minimum;
          else
            delete json3.exclusiveMinimum;
        }
      }
      if (typeof exclusiveMaximum === "number") {
        if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
          json3.maximum = exclusiveMaximum;
          json3.exclusiveMaximum = true;
        } else {
          json3.exclusiveMaximum = exclusiveMaximum;
        }
      }
      if (typeof maximum === "number") {
        json3.maximum = maximum;
        if (typeof exclusiveMaximum === "number" && ctx.target !== "draft-04") {
          if (exclusiveMaximum <= maximum)
            delete json3.maximum;
          else
            delete json3.exclusiveMaximum;
        }
      }
      if (typeof multipleOf === "number")
        json3.multipleOf = multipleOf;
    }, "numberProcessor");
    booleanProcessor = /* @__PURE__ */ __name((_schema, _ctx, json3, _params) => {
      json3.type = "boolean";
    }, "booleanProcessor");
    bigintProcessor = /* @__PURE__ */ __name((_schema, ctx, _json, _params) => {
      if (ctx.unrepresentable === "throw") {
        throw new Error("BigInt cannot be represented in JSON Schema");
      }
    }, "bigintProcessor");
    symbolProcessor = /* @__PURE__ */ __name((_schema, ctx, _json, _params) => {
      if (ctx.unrepresentable === "throw") {
        throw new Error("Symbols cannot be represented in JSON Schema");
      }
    }, "symbolProcessor");
    nullProcessor = /* @__PURE__ */ __name((_schema, ctx, json3, _params) => {
      if (ctx.target === "openapi-3.0") {
        json3.type = "string";
        json3.nullable = true;
        json3.enum = [null];
      } else {
        json3.type = "null";
      }
    }, "nullProcessor");
    undefinedProcessor = /* @__PURE__ */ __name((_schema, ctx, _json, _params) => {
      if (ctx.unrepresentable === "throw") {
        throw new Error("Undefined cannot be represented in JSON Schema");
      }
    }, "undefinedProcessor");
    voidProcessor = /* @__PURE__ */ __name((_schema, ctx, _json, _params) => {
      if (ctx.unrepresentable === "throw") {
        throw new Error("Void cannot be represented in JSON Schema");
      }
    }, "voidProcessor");
    neverProcessor = /* @__PURE__ */ __name((_schema, _ctx, json3, _params) => {
      json3.not = {};
    }, "neverProcessor");
    anyProcessor = /* @__PURE__ */ __name((_schema, _ctx, _json, _params) => {
    }, "anyProcessor");
    unknownProcessor = /* @__PURE__ */ __name((_schema, _ctx, _json, _params) => {
    }, "unknownProcessor");
    dateProcessor = /* @__PURE__ */ __name((_schema, ctx, _json, _params) => {
      if (ctx.unrepresentable === "throw") {
        throw new Error("Date cannot be represented in JSON Schema");
      }
    }, "dateProcessor");
    enumProcessor = /* @__PURE__ */ __name((schema, _ctx, json3, _params) => {
      const def = schema._zod.def;
      const values = getEnumValues(def.entries);
      if (values.every((v) => typeof v === "number"))
        json3.type = "number";
      if (values.every((v) => typeof v === "string"))
        json3.type = "string";
      json3.enum = values;
    }, "enumProcessor");
    literalProcessor = /* @__PURE__ */ __name((schema, ctx, json3, _params) => {
      const def = schema._zod.def;
      const vals = [];
      for (const val of def.values) {
        if (val === void 0) {
          if (ctx.unrepresentable === "throw") {
            throw new Error("Literal `undefined` cannot be represented in JSON Schema");
          } else {
          }
        } else if (typeof val === "bigint") {
          if (ctx.unrepresentable === "throw") {
            throw new Error("BigInt literals cannot be represented in JSON Schema");
          } else {
            vals.push(Number(val));
          }
        } else {
          vals.push(val);
        }
      }
      if (vals.length === 0) {
      } else if (vals.length === 1) {
        const val = vals[0];
        json3.type = val === null ? "null" : typeof val;
        if (ctx.target === "draft-04" || ctx.target === "openapi-3.0") {
          json3.enum = [val];
        } else {
          json3.const = val;
        }
      } else {
        if (vals.every((v) => typeof v === "number"))
          json3.type = "number";
        if (vals.every((v) => typeof v === "string"))
          json3.type = "string";
        if (vals.every((v) => typeof v === "boolean"))
          json3.type = "boolean";
        if (vals.every((v) => v === null))
          json3.type = "null";
        json3.enum = vals;
      }
    }, "literalProcessor");
    nanProcessor = /* @__PURE__ */ __name((_schema, ctx, _json, _params) => {
      if (ctx.unrepresentable === "throw") {
        throw new Error("NaN cannot be represented in JSON Schema");
      }
    }, "nanProcessor");
    templateLiteralProcessor = /* @__PURE__ */ __name((schema, _ctx, json3, _params) => {
      const _json = json3;
      const pattern = schema._zod.pattern;
      if (!pattern)
        throw new Error("Pattern not found in template literal");
      _json.type = "string";
      _json.pattern = pattern.source;
    }, "templateLiteralProcessor");
    fileProcessor = /* @__PURE__ */ __name((schema, _ctx, json3, _params) => {
      const _json = json3;
      const file2 = {
        type: "string",
        format: "binary",
        contentEncoding: "binary"
      };
      const { minimum, maximum, mime } = schema._zod.bag;
      if (minimum !== void 0)
        file2.minLength = minimum;
      if (maximum !== void 0)
        file2.maxLength = maximum;
      if (mime) {
        if (mime.length === 1) {
          file2.contentMediaType = mime[0];
          Object.assign(_json, file2);
        } else {
          Object.assign(_json, file2);
          _json.anyOf = mime.map((m) => ({ contentMediaType: m }));
        }
      } else {
        Object.assign(_json, file2);
      }
    }, "fileProcessor");
    successProcessor = /* @__PURE__ */ __name((_schema, _ctx, json3, _params) => {
      json3.type = "boolean";
    }, "successProcessor");
    customProcessor = /* @__PURE__ */ __name((_schema, ctx, _json, _params) => {
      if (ctx.unrepresentable === "throw") {
        throw new Error("Custom types cannot be represented in JSON Schema");
      }
    }, "customProcessor");
    functionProcessor = /* @__PURE__ */ __name((_schema, ctx, _json, _params) => {
      if (ctx.unrepresentable === "throw") {
        throw new Error("Function types cannot be represented in JSON Schema");
      }
    }, "functionProcessor");
    transformProcessor = /* @__PURE__ */ __name((_schema, ctx, _json, _params) => {
      if (ctx.unrepresentable === "throw") {
        throw new Error("Transforms cannot be represented in JSON Schema");
      }
    }, "transformProcessor");
    mapProcessor = /* @__PURE__ */ __name((_schema, ctx, _json, _params) => {
      if (ctx.unrepresentable === "throw") {
        throw new Error("Map cannot be represented in JSON Schema");
      }
    }, "mapProcessor");
    setProcessor = /* @__PURE__ */ __name((_schema, ctx, _json, _params) => {
      if (ctx.unrepresentable === "throw") {
        throw new Error("Set cannot be represented in JSON Schema");
      }
    }, "setProcessor");
    arrayProcessor = /* @__PURE__ */ __name((schema, ctx, _json, params) => {
      const json3 = _json;
      const def = schema._zod.def;
      const { minimum, maximum } = schema._zod.bag;
      if (typeof minimum === "number")
        json3.minItems = minimum;
      if (typeof maximum === "number")
        json3.maxItems = maximum;
      json3.type = "array";
      json3.items = process(def.element, ctx, { ...params, path: [...params.path, "items"] });
    }, "arrayProcessor");
    objectProcessor = /* @__PURE__ */ __name((schema, ctx, _json, params) => {
      const json3 = _json;
      const def = schema._zod.def;
      json3.type = "object";
      json3.properties = {};
      const shape = def.shape;
      for (const key in shape) {
        json3.properties[key] = process(shape[key], ctx, {
          ...params,
          path: [...params.path, "properties", key]
        });
      }
      const allKeys = new Set(Object.keys(shape));
      const requiredKeys = new Set([...allKeys].filter((key) => {
        const v = def.shape[key]._zod;
        if (ctx.io === "input") {
          return v.optin === void 0;
        } else {
          return v.optout === void 0;
        }
      }));
      if (requiredKeys.size > 0) {
        json3.required = Array.from(requiredKeys);
      }
      if (def.catchall?._zod.def.type === "never") {
        json3.additionalProperties = false;
      } else if (!def.catchall) {
        if (ctx.io === "output")
          json3.additionalProperties = false;
      } else if (def.catchall) {
        json3.additionalProperties = process(def.catchall, ctx, {
          ...params,
          path: [...params.path, "additionalProperties"]
        });
      }
    }, "objectProcessor");
    unionProcessor = /* @__PURE__ */ __name((schema, ctx, json3, params) => {
      const def = schema._zod.def;
      const isExclusive = def.inclusive === false;
      const options = def.options.map((x, i) => process(x, ctx, {
        ...params,
        path: [...params.path, isExclusive ? "oneOf" : "anyOf", i]
      }));
      if (isExclusive) {
        json3.oneOf = options;
      } else {
        json3.anyOf = options;
      }
    }, "unionProcessor");
    intersectionProcessor = /* @__PURE__ */ __name((schema, ctx, json3, params) => {
      const def = schema._zod.def;
      const a = process(def.left, ctx, {
        ...params,
        path: [...params.path, "allOf", 0]
      });
      const b = process(def.right, ctx, {
        ...params,
        path: [...params.path, "allOf", 1]
      });
      const isSimpleIntersection = /* @__PURE__ */ __name((val) => "allOf" in val && Object.keys(val).length === 1, "isSimpleIntersection");
      const allOf = [
        ...isSimpleIntersection(a) ? a.allOf : [a],
        ...isSimpleIntersection(b) ? b.allOf : [b]
      ];
      json3.allOf = allOf;
    }, "intersectionProcessor");
    tupleProcessor = /* @__PURE__ */ __name((schema, ctx, _json, params) => {
      const json3 = _json;
      const def = schema._zod.def;
      json3.type = "array";
      const prefixPath = ctx.target === "draft-2020-12" ? "prefixItems" : "items";
      const restPath = ctx.target === "draft-2020-12" ? "items" : ctx.target === "openapi-3.0" ? "items" : "additionalItems";
      const prefixItems = def.items.map((x, i) => process(x, ctx, {
        ...params,
        path: [...params.path, prefixPath, i]
      }));
      const rest = def.rest ? process(def.rest, ctx, {
        ...params,
        path: [...params.path, restPath, ...ctx.target === "openapi-3.0" ? [def.items.length] : []]
      }) : null;
      if (ctx.target === "draft-2020-12") {
        json3.prefixItems = prefixItems;
        if (rest) {
          json3.items = rest;
        }
      } else if (ctx.target === "openapi-3.0") {
        json3.items = {
          anyOf: prefixItems
        };
        if (rest) {
          json3.items.anyOf.push(rest);
        }
        json3.minItems = prefixItems.length;
        if (!rest) {
          json3.maxItems = prefixItems.length;
        }
      } else {
        json3.items = prefixItems;
        if (rest) {
          json3.additionalItems = rest;
        }
      }
      const { minimum, maximum } = schema._zod.bag;
      if (typeof minimum === "number")
        json3.minItems = minimum;
      if (typeof maximum === "number")
        json3.maxItems = maximum;
    }, "tupleProcessor");
    recordProcessor = /* @__PURE__ */ __name((schema, ctx, _json, params) => {
      const json3 = _json;
      const def = schema._zod.def;
      json3.type = "object";
      const keyType = def.keyType;
      const keyBag = keyType._zod.bag;
      const patterns = keyBag?.patterns;
      if (def.mode === "loose" && patterns && patterns.size > 0) {
        const valueSchema = process(def.valueType, ctx, {
          ...params,
          path: [...params.path, "patternProperties", "*"]
        });
        json3.patternProperties = {};
        for (const pattern of patterns) {
          json3.patternProperties[pattern.source] = valueSchema;
        }
      } else {
        if (ctx.target === "draft-07" || ctx.target === "draft-2020-12") {
          json3.propertyNames = process(def.keyType, ctx, {
            ...params,
            path: [...params.path, "propertyNames"]
          });
        }
        json3.additionalProperties = process(def.valueType, ctx, {
          ...params,
          path: [...params.path, "additionalProperties"]
        });
      }
      const keyValues = keyType._zod.values;
      if (keyValues) {
        const validKeyValues = [...keyValues].filter((v) => typeof v === "string" || typeof v === "number");
        if (validKeyValues.length > 0) {
          json3.required = validKeyValues;
        }
      }
    }, "recordProcessor");
    nullableProcessor = /* @__PURE__ */ __name((schema, ctx, json3, params) => {
      const def = schema._zod.def;
      const inner = process(def.innerType, ctx, params);
      const seen = ctx.seen.get(schema);
      if (ctx.target === "openapi-3.0") {
        seen.ref = def.innerType;
        json3.nullable = true;
      } else {
        json3.anyOf = [inner, { type: "null" }];
      }
    }, "nullableProcessor");
    nonoptionalProcessor = /* @__PURE__ */ __name((schema, ctx, _json, params) => {
      const def = schema._zod.def;
      process(def.innerType, ctx, params);
      const seen = ctx.seen.get(schema);
      seen.ref = def.innerType;
    }, "nonoptionalProcessor");
    defaultProcessor = /* @__PURE__ */ __name((schema, ctx, json3, params) => {
      const def = schema._zod.def;
      process(def.innerType, ctx, params);
      const seen = ctx.seen.get(schema);
      seen.ref = def.innerType;
      json3.default = JSON.parse(JSON.stringify(def.defaultValue));
    }, "defaultProcessor");
    prefaultProcessor = /* @__PURE__ */ __name((schema, ctx, json3, params) => {
      const def = schema._zod.def;
      process(def.innerType, ctx, params);
      const seen = ctx.seen.get(schema);
      seen.ref = def.innerType;
      if (ctx.io === "input")
        json3._prefault = JSON.parse(JSON.stringify(def.defaultValue));
    }, "prefaultProcessor");
    catchProcessor = /* @__PURE__ */ __name((schema, ctx, json3, params) => {
      const def = schema._zod.def;
      process(def.innerType, ctx, params);
      const seen = ctx.seen.get(schema);
      seen.ref = def.innerType;
      let catchValue;
      try {
        catchValue = def.catchValue(void 0);
      } catch {
        throw new Error("Dynamic catch values are not supported in JSON Schema");
      }
      json3.default = catchValue;
    }, "catchProcessor");
    pipeProcessor = /* @__PURE__ */ __name((schema, ctx, _json, params) => {
      const def = schema._zod.def;
      const innerType = ctx.io === "input" ? def.in._zod.def.type === "transform" ? def.out : def.in : def.out;
      process(innerType, ctx, params);
      const seen = ctx.seen.get(schema);
      seen.ref = innerType;
    }, "pipeProcessor");
    readonlyProcessor = /* @__PURE__ */ __name((schema, ctx, json3, params) => {
      const def = schema._zod.def;
      process(def.innerType, ctx, params);
      const seen = ctx.seen.get(schema);
      seen.ref = def.innerType;
      json3.readOnly = true;
    }, "readonlyProcessor");
    promiseProcessor = /* @__PURE__ */ __name((schema, ctx, _json, params) => {
      const def = schema._zod.def;
      process(def.innerType, ctx, params);
      const seen = ctx.seen.get(schema);
      seen.ref = def.innerType;
    }, "promiseProcessor");
    optionalProcessor = /* @__PURE__ */ __name((schema, ctx, _json, params) => {
      const def = schema._zod.def;
      process(def.innerType, ctx, params);
      const seen = ctx.seen.get(schema);
      seen.ref = def.innerType;
    }, "optionalProcessor");
    lazyProcessor = /* @__PURE__ */ __name((schema, ctx, _json, params) => {
      const innerType = schema._zod.innerType;
      process(innerType, ctx, params);
      const seen = ctx.seen.get(schema);
      seen.ref = innerType;
    }, "lazyProcessor");
    allProcessors = {
      string: stringProcessor,
      number: numberProcessor,
      boolean: booleanProcessor,
      bigint: bigintProcessor,
      symbol: symbolProcessor,
      null: nullProcessor,
      undefined: undefinedProcessor,
      void: voidProcessor,
      never: neverProcessor,
      any: anyProcessor,
      unknown: unknownProcessor,
      date: dateProcessor,
      enum: enumProcessor,
      literal: literalProcessor,
      nan: nanProcessor,
      template_literal: templateLiteralProcessor,
      file: fileProcessor,
      success: successProcessor,
      custom: customProcessor,
      function: functionProcessor,
      transform: transformProcessor,
      map: mapProcessor,
      set: setProcessor,
      array: arrayProcessor,
      object: objectProcessor,
      union: unionProcessor,
      intersection: intersectionProcessor,
      tuple: tupleProcessor,
      record: recordProcessor,
      nullable: nullableProcessor,
      nonoptional: nonoptionalProcessor,
      default: defaultProcessor,
      prefault: prefaultProcessor,
      catch: catchProcessor,
      pipe: pipeProcessor,
      readonly: readonlyProcessor,
      promise: promiseProcessor,
      optional: optionalProcessor,
      lazy: lazyProcessor
    };
    __name(toJSONSchema, "toJSONSchema");
  }
});

// ../node_modules/zod/v4/core/json-schema-generator.js
var JSONSchemaGenerator;
var init_json_schema_generator = __esm({
  "../node_modules/zod/v4/core/json-schema-generator.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json_schema_processors();
    init_to_json_schema();
    JSONSchemaGenerator = class {
      /** @deprecated Access via ctx instead */
      get metadataRegistry() {
        return this.ctx.metadataRegistry;
      }
      /** @deprecated Access via ctx instead */
      get target() {
        return this.ctx.target;
      }
      /** @deprecated Access via ctx instead */
      get unrepresentable() {
        return this.ctx.unrepresentable;
      }
      /** @deprecated Access via ctx instead */
      get override() {
        return this.ctx.override;
      }
      /** @deprecated Access via ctx instead */
      get io() {
        return this.ctx.io;
      }
      /** @deprecated Access via ctx instead */
      get counter() {
        return this.ctx.counter;
      }
      set counter(value) {
        this.ctx.counter = value;
      }
      /** @deprecated Access via ctx instead */
      get seen() {
        return this.ctx.seen;
      }
      constructor(params) {
        let normalizedTarget = params?.target ?? "draft-2020-12";
        if (normalizedTarget === "draft-4")
          normalizedTarget = "draft-04";
        if (normalizedTarget === "draft-7")
          normalizedTarget = "draft-07";
        this.ctx = initializeContext({
          processors: allProcessors,
          target: normalizedTarget,
          ...params?.metadata && { metadata: params.metadata },
          ...params?.unrepresentable && { unrepresentable: params.unrepresentable },
          ...params?.override && { override: params.override },
          ...params?.io && { io: params.io }
        });
      }
      /**
       * Process a schema to prepare it for JSON Schema generation.
       * This must be called before emit().
       */
      process(schema, _params = { path: [], schemaPath: [] }) {
        return process(schema, this.ctx, _params);
      }
      /**
       * Emit the final JSON Schema after processing.
       * Must call process() first.
       */
      emit(schema, _params) {
        if (_params) {
          if (_params.cycles)
            this.ctx.cycles = _params.cycles;
          if (_params.reused)
            this.ctx.reused = _params.reused;
          if (_params.external)
            this.ctx.external = _params.external;
        }
        extractDefs(this.ctx, schema);
        const result = finalize(this.ctx, schema);
        const { "~standard": _, ...plainResult } = result;
        return plainResult;
      }
    };
    __name(JSONSchemaGenerator, "JSONSchemaGenerator");
  }
});

// ../node_modules/zod/v4/core/json-schema.js
var json_schema_exports = {};
var init_json_schema = __esm({
  "../node_modules/zod/v4/core/json-schema.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
  }
});

// ../node_modules/zod/v4/core/index.js
var core_exports2 = {};
__export(core_exports2, {
  $ZodAny: () => $ZodAny,
  $ZodArray: () => $ZodArray,
  $ZodAsyncError: () => $ZodAsyncError,
  $ZodBase64: () => $ZodBase64,
  $ZodBase64URL: () => $ZodBase64URL,
  $ZodBigInt: () => $ZodBigInt,
  $ZodBigIntFormat: () => $ZodBigIntFormat,
  $ZodBoolean: () => $ZodBoolean,
  $ZodCIDRv4: () => $ZodCIDRv4,
  $ZodCIDRv6: () => $ZodCIDRv6,
  $ZodCUID: () => $ZodCUID,
  $ZodCUID2: () => $ZodCUID2,
  $ZodCatch: () => $ZodCatch,
  $ZodCheck: () => $ZodCheck,
  $ZodCheckBigIntFormat: () => $ZodCheckBigIntFormat,
  $ZodCheckEndsWith: () => $ZodCheckEndsWith,
  $ZodCheckGreaterThan: () => $ZodCheckGreaterThan,
  $ZodCheckIncludes: () => $ZodCheckIncludes,
  $ZodCheckLengthEquals: () => $ZodCheckLengthEquals,
  $ZodCheckLessThan: () => $ZodCheckLessThan,
  $ZodCheckLowerCase: () => $ZodCheckLowerCase,
  $ZodCheckMaxLength: () => $ZodCheckMaxLength,
  $ZodCheckMaxSize: () => $ZodCheckMaxSize,
  $ZodCheckMimeType: () => $ZodCheckMimeType,
  $ZodCheckMinLength: () => $ZodCheckMinLength,
  $ZodCheckMinSize: () => $ZodCheckMinSize,
  $ZodCheckMultipleOf: () => $ZodCheckMultipleOf,
  $ZodCheckNumberFormat: () => $ZodCheckNumberFormat,
  $ZodCheckOverwrite: () => $ZodCheckOverwrite,
  $ZodCheckProperty: () => $ZodCheckProperty,
  $ZodCheckRegex: () => $ZodCheckRegex,
  $ZodCheckSizeEquals: () => $ZodCheckSizeEquals,
  $ZodCheckStartsWith: () => $ZodCheckStartsWith,
  $ZodCheckStringFormat: () => $ZodCheckStringFormat,
  $ZodCheckUpperCase: () => $ZodCheckUpperCase,
  $ZodCodec: () => $ZodCodec,
  $ZodCustom: () => $ZodCustom,
  $ZodCustomStringFormat: () => $ZodCustomStringFormat,
  $ZodDate: () => $ZodDate,
  $ZodDefault: () => $ZodDefault,
  $ZodDiscriminatedUnion: () => $ZodDiscriminatedUnion,
  $ZodE164: () => $ZodE164,
  $ZodEmail: () => $ZodEmail,
  $ZodEmoji: () => $ZodEmoji,
  $ZodEncodeError: () => $ZodEncodeError,
  $ZodEnum: () => $ZodEnum,
  $ZodError: () => $ZodError,
  $ZodExactOptional: () => $ZodExactOptional,
  $ZodFile: () => $ZodFile,
  $ZodFunction: () => $ZodFunction,
  $ZodGUID: () => $ZodGUID,
  $ZodIPv4: () => $ZodIPv4,
  $ZodIPv6: () => $ZodIPv6,
  $ZodISODate: () => $ZodISODate,
  $ZodISODateTime: () => $ZodISODateTime,
  $ZodISODuration: () => $ZodISODuration,
  $ZodISOTime: () => $ZodISOTime,
  $ZodIntersection: () => $ZodIntersection,
  $ZodJWT: () => $ZodJWT,
  $ZodKSUID: () => $ZodKSUID,
  $ZodLazy: () => $ZodLazy,
  $ZodLiteral: () => $ZodLiteral,
  $ZodMAC: () => $ZodMAC,
  $ZodMap: () => $ZodMap,
  $ZodNaN: () => $ZodNaN,
  $ZodNanoID: () => $ZodNanoID,
  $ZodNever: () => $ZodNever,
  $ZodNonOptional: () => $ZodNonOptional,
  $ZodNull: () => $ZodNull,
  $ZodNullable: () => $ZodNullable,
  $ZodNumber: () => $ZodNumber,
  $ZodNumberFormat: () => $ZodNumberFormat,
  $ZodObject: () => $ZodObject,
  $ZodObjectJIT: () => $ZodObjectJIT,
  $ZodOptional: () => $ZodOptional,
  $ZodPipe: () => $ZodPipe,
  $ZodPrefault: () => $ZodPrefault,
  $ZodPromise: () => $ZodPromise,
  $ZodReadonly: () => $ZodReadonly,
  $ZodRealError: () => $ZodRealError,
  $ZodRecord: () => $ZodRecord,
  $ZodRegistry: () => $ZodRegistry,
  $ZodSet: () => $ZodSet,
  $ZodString: () => $ZodString,
  $ZodStringFormat: () => $ZodStringFormat,
  $ZodSuccess: () => $ZodSuccess,
  $ZodSymbol: () => $ZodSymbol,
  $ZodTemplateLiteral: () => $ZodTemplateLiteral,
  $ZodTransform: () => $ZodTransform,
  $ZodTuple: () => $ZodTuple,
  $ZodType: () => $ZodType,
  $ZodULID: () => $ZodULID,
  $ZodURL: () => $ZodURL,
  $ZodUUID: () => $ZodUUID,
  $ZodUndefined: () => $ZodUndefined,
  $ZodUnion: () => $ZodUnion,
  $ZodUnknown: () => $ZodUnknown,
  $ZodVoid: () => $ZodVoid,
  $ZodXID: () => $ZodXID,
  $ZodXor: () => $ZodXor,
  $brand: () => $brand,
  $constructor: () => $constructor,
  $input: () => $input,
  $output: () => $output,
  Doc: () => Doc,
  JSONSchema: () => json_schema_exports,
  JSONSchemaGenerator: () => JSONSchemaGenerator,
  NEVER: () => NEVER,
  TimePrecision: () => TimePrecision,
  _any: () => _any,
  _array: () => _array,
  _base64: () => _base64,
  _base64url: () => _base64url,
  _bigint: () => _bigint,
  _boolean: () => _boolean,
  _catch: () => _catch,
  _check: () => _check,
  _cidrv4: () => _cidrv4,
  _cidrv6: () => _cidrv6,
  _coercedBigint: () => _coercedBigint,
  _coercedBoolean: () => _coercedBoolean,
  _coercedDate: () => _coercedDate,
  _coercedNumber: () => _coercedNumber,
  _coercedString: () => _coercedString,
  _cuid: () => _cuid,
  _cuid2: () => _cuid2,
  _custom: () => _custom,
  _date: () => _date,
  _decode: () => _decode,
  _decodeAsync: () => _decodeAsync,
  _default: () => _default,
  _discriminatedUnion: () => _discriminatedUnion,
  _e164: () => _e164,
  _email: () => _email,
  _emoji: () => _emoji2,
  _encode: () => _encode,
  _encodeAsync: () => _encodeAsync,
  _endsWith: () => _endsWith,
  _enum: () => _enum,
  _file: () => _file,
  _float32: () => _float32,
  _float64: () => _float64,
  _gt: () => _gt,
  _gte: () => _gte,
  _guid: () => _guid,
  _includes: () => _includes,
  _int: () => _int,
  _int32: () => _int32,
  _int64: () => _int64,
  _intersection: () => _intersection,
  _ipv4: () => _ipv4,
  _ipv6: () => _ipv6,
  _isoDate: () => _isoDate,
  _isoDateTime: () => _isoDateTime,
  _isoDuration: () => _isoDuration,
  _isoTime: () => _isoTime,
  _jwt: () => _jwt,
  _ksuid: () => _ksuid,
  _lazy: () => _lazy,
  _length: () => _length,
  _literal: () => _literal,
  _lowercase: () => _lowercase,
  _lt: () => _lt,
  _lte: () => _lte,
  _mac: () => _mac,
  _map: () => _map,
  _max: () => _lte,
  _maxLength: () => _maxLength,
  _maxSize: () => _maxSize,
  _mime: () => _mime,
  _min: () => _gte,
  _minLength: () => _minLength,
  _minSize: () => _minSize,
  _multipleOf: () => _multipleOf,
  _nan: () => _nan,
  _nanoid: () => _nanoid,
  _nativeEnum: () => _nativeEnum,
  _negative: () => _negative,
  _never: () => _never,
  _nonnegative: () => _nonnegative,
  _nonoptional: () => _nonoptional,
  _nonpositive: () => _nonpositive,
  _normalize: () => _normalize,
  _null: () => _null2,
  _nullable: () => _nullable,
  _number: () => _number,
  _optional: () => _optional,
  _overwrite: () => _overwrite,
  _parse: () => _parse,
  _parseAsync: () => _parseAsync,
  _pipe: () => _pipe,
  _positive: () => _positive,
  _promise: () => _promise,
  _property: () => _property,
  _readonly: () => _readonly,
  _record: () => _record,
  _refine: () => _refine,
  _regex: () => _regex,
  _safeDecode: () => _safeDecode,
  _safeDecodeAsync: () => _safeDecodeAsync,
  _safeEncode: () => _safeEncode,
  _safeEncodeAsync: () => _safeEncodeAsync,
  _safeParse: () => _safeParse,
  _safeParseAsync: () => _safeParseAsync,
  _set: () => _set,
  _size: () => _size,
  _slugify: () => _slugify,
  _startsWith: () => _startsWith,
  _string: () => _string,
  _stringFormat: () => _stringFormat,
  _stringbool: () => _stringbool,
  _success: () => _success,
  _superRefine: () => _superRefine,
  _symbol: () => _symbol,
  _templateLiteral: () => _templateLiteral,
  _toLowerCase: () => _toLowerCase,
  _toUpperCase: () => _toUpperCase,
  _transform: () => _transform,
  _trim: () => _trim,
  _tuple: () => _tuple,
  _uint32: () => _uint32,
  _uint64: () => _uint64,
  _ulid: () => _ulid,
  _undefined: () => _undefined2,
  _union: () => _union,
  _unknown: () => _unknown,
  _uppercase: () => _uppercase,
  _url: () => _url,
  _uuid: () => _uuid,
  _uuidv4: () => _uuidv4,
  _uuidv6: () => _uuidv6,
  _uuidv7: () => _uuidv7,
  _void: () => _void,
  _xid: () => _xid,
  _xor: () => _xor,
  clone: () => clone,
  config: () => config2,
  createStandardJSONSchemaMethod: () => createStandardJSONSchemaMethod,
  createToJSONSchemaMethod: () => createToJSONSchemaMethod,
  decode: () => decode,
  decodeAsync: () => decodeAsync,
  describe: () => describe,
  encode: () => encode,
  encodeAsync: () => encodeAsync,
  extractDefs: () => extractDefs,
  finalize: () => finalize,
  flattenError: () => flattenError,
  formatError: () => formatError,
  globalConfig: () => globalConfig,
  globalRegistry: () => globalRegistry,
  initializeContext: () => initializeContext,
  isValidBase64: () => isValidBase64,
  isValidBase64URL: () => isValidBase64URL,
  isValidJWT: () => isValidJWT,
  locales: () => locales_exports,
  meta: () => meta,
  parse: () => parse,
  parseAsync: () => parseAsync,
  prettifyError: () => prettifyError,
  process: () => process,
  regexes: () => regexes_exports,
  registry: () => registry,
  safeDecode: () => safeDecode,
  safeDecodeAsync: () => safeDecodeAsync,
  safeEncode: () => safeEncode,
  safeEncodeAsync: () => safeEncodeAsync,
  safeParse: () => safeParse,
  safeParseAsync: () => safeParseAsync,
  toDotPath: () => toDotPath,
  toJSONSchema: () => toJSONSchema,
  treeifyError: () => treeifyError,
  util: () => util_exports,
  version: () => version2
});
var init_core2 = __esm({
  "../node_modules/zod/v4/core/index.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_core();
    init_parse();
    init_errors();
    init_schemas();
    init_checks();
    init_versions();
    init_util();
    init_regexes();
    init_locales();
    init_registries();
    init_doc();
    init_api();
    init_to_json_schema();
    init_json_schema_processors();
    init_json_schema_generator();
    init_json_schema();
  }
});

// ../node_modules/zod/v4/classic/checks.js
var checks_exports2 = {};
__export(checks_exports2, {
  endsWith: () => _endsWith,
  gt: () => _gt,
  gte: () => _gte,
  includes: () => _includes,
  length: () => _length,
  lowercase: () => _lowercase,
  lt: () => _lt,
  lte: () => _lte,
  maxLength: () => _maxLength,
  maxSize: () => _maxSize,
  mime: () => _mime,
  minLength: () => _minLength,
  minSize: () => _minSize,
  multipleOf: () => _multipleOf,
  negative: () => _negative,
  nonnegative: () => _nonnegative,
  nonpositive: () => _nonpositive,
  normalize: () => _normalize,
  overwrite: () => _overwrite,
  positive: () => _positive,
  property: () => _property,
  regex: () => _regex,
  size: () => _size,
  slugify: () => _slugify,
  startsWith: () => _startsWith,
  toLowerCase: () => _toLowerCase,
  toUpperCase: () => _toUpperCase,
  trim: () => _trim,
  uppercase: () => _uppercase
});
var init_checks2 = __esm({
  "../node_modules/zod/v4/classic/checks.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_core2();
  }
});

// ../node_modules/zod/v4/classic/iso.js
var iso_exports = {};
__export(iso_exports, {
  ZodISODate: () => ZodISODate,
  ZodISODateTime: () => ZodISODateTime,
  ZodISODuration: () => ZodISODuration,
  ZodISOTime: () => ZodISOTime,
  date: () => date2,
  datetime: () => datetime2,
  duration: () => duration2,
  time: () => time4
});
function datetime2(params) {
  return _isoDateTime(ZodISODateTime, params);
}
function date2(params) {
  return _isoDate(ZodISODate, params);
}
function time4(params) {
  return _isoTime(ZodISOTime, params);
}
function duration2(params) {
  return _isoDuration(ZodISODuration, params);
}
var ZodISODateTime, ZodISODate, ZodISOTime, ZodISODuration;
var init_iso = __esm({
  "../node_modules/zod/v4/classic/iso.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_core2();
    init_schemas2();
    ZodISODateTime = /* @__PURE__ */ $constructor("ZodISODateTime", (inst, def) => {
      $ZodISODateTime.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    __name(datetime2, "datetime");
    ZodISODate = /* @__PURE__ */ $constructor("ZodISODate", (inst, def) => {
      $ZodISODate.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    __name(date2, "date");
    ZodISOTime = /* @__PURE__ */ $constructor("ZodISOTime", (inst, def) => {
      $ZodISOTime.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    __name(time4, "time");
    ZodISODuration = /* @__PURE__ */ $constructor("ZodISODuration", (inst, def) => {
      $ZodISODuration.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    __name(duration2, "duration");
  }
});

// ../node_modules/zod/v4/classic/errors.js
var initializer2, ZodError, ZodRealError;
var init_errors2 = __esm({
  "../node_modules/zod/v4/classic/errors.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_core2();
    init_core2();
    init_util();
    initializer2 = /* @__PURE__ */ __name((inst, issues) => {
      $ZodError.init(inst, issues);
      inst.name = "ZodError";
      Object.defineProperties(inst, {
        format: {
          value: (mapper) => formatError(inst, mapper)
          // enumerable: false,
        },
        flatten: {
          value: (mapper) => flattenError(inst, mapper)
          // enumerable: false,
        },
        addIssue: {
          value: (issue2) => {
            inst.issues.push(issue2);
            inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
          }
          // enumerable: false,
        },
        addIssues: {
          value: (issues2) => {
            inst.issues.push(...issues2);
            inst.message = JSON.stringify(inst.issues, jsonStringifyReplacer, 2);
          }
          // enumerable: false,
        },
        isEmpty: {
          get() {
            return inst.issues.length === 0;
          }
          // enumerable: false,
        }
      });
    }, "initializer");
    ZodError = $constructor("ZodError", initializer2);
    ZodRealError = $constructor("ZodError", initializer2, {
      Parent: Error
    });
  }
});

// ../node_modules/zod/v4/classic/parse.js
var parse2, parseAsync2, safeParse2, safeParseAsync2, encode2, decode2, encodeAsync2, decodeAsync2, safeEncode2, safeDecode2, safeEncodeAsync2, safeDecodeAsync2;
var init_parse2 = __esm({
  "../node_modules/zod/v4/classic/parse.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_core2();
    init_errors2();
    parse2 = /* @__PURE__ */ _parse(ZodRealError);
    parseAsync2 = /* @__PURE__ */ _parseAsync(ZodRealError);
    safeParse2 = /* @__PURE__ */ _safeParse(ZodRealError);
    safeParseAsync2 = /* @__PURE__ */ _safeParseAsync(ZodRealError);
    encode2 = /* @__PURE__ */ _encode(ZodRealError);
    decode2 = /* @__PURE__ */ _decode(ZodRealError);
    encodeAsync2 = /* @__PURE__ */ _encodeAsync(ZodRealError);
    decodeAsync2 = /* @__PURE__ */ _decodeAsync(ZodRealError);
    safeEncode2 = /* @__PURE__ */ _safeEncode(ZodRealError);
    safeDecode2 = /* @__PURE__ */ _safeDecode(ZodRealError);
    safeEncodeAsync2 = /* @__PURE__ */ _safeEncodeAsync(ZodRealError);
    safeDecodeAsync2 = /* @__PURE__ */ _safeDecodeAsync(ZodRealError);
  }
});

// ../node_modules/zod/v4/classic/schemas.js
var schemas_exports2 = {};
__export(schemas_exports2, {
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBase64: () => ZodBase64,
  ZodBase64URL: () => ZodBase64URL,
  ZodBigInt: () => ZodBigInt,
  ZodBigIntFormat: () => ZodBigIntFormat,
  ZodBoolean: () => ZodBoolean,
  ZodCIDRv4: () => ZodCIDRv4,
  ZodCIDRv6: () => ZodCIDRv6,
  ZodCUID: () => ZodCUID,
  ZodCUID2: () => ZodCUID2,
  ZodCatch: () => ZodCatch,
  ZodCodec: () => ZodCodec,
  ZodCustom: () => ZodCustom,
  ZodCustomStringFormat: () => ZodCustomStringFormat,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodE164: () => ZodE164,
  ZodEmail: () => ZodEmail,
  ZodEmoji: () => ZodEmoji,
  ZodEnum: () => ZodEnum,
  ZodExactOptional: () => ZodExactOptional,
  ZodFile: () => ZodFile,
  ZodFunction: () => ZodFunction,
  ZodGUID: () => ZodGUID,
  ZodIPv4: () => ZodIPv4,
  ZodIPv6: () => ZodIPv6,
  ZodIntersection: () => ZodIntersection,
  ZodJWT: () => ZodJWT,
  ZodKSUID: () => ZodKSUID,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMAC: () => ZodMAC,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNanoID: () => ZodNanoID,
  ZodNever: () => ZodNever,
  ZodNonOptional: () => ZodNonOptional,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodNumberFormat: () => ZodNumberFormat,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodPipe: () => ZodPipe,
  ZodPrefault: () => ZodPrefault,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRecord: () => ZodRecord,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodStringFormat: () => ZodStringFormat,
  ZodSuccess: () => ZodSuccess,
  ZodSymbol: () => ZodSymbol,
  ZodTemplateLiteral: () => ZodTemplateLiteral,
  ZodTransform: () => ZodTransform,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodULID: () => ZodULID,
  ZodURL: () => ZodURL,
  ZodUUID: () => ZodUUID,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  ZodXID: () => ZodXID,
  ZodXor: () => ZodXor,
  _ZodString: () => _ZodString,
  _default: () => _default2,
  _function: () => _function,
  any: () => any,
  array: () => array,
  base64: () => base642,
  base64url: () => base64url2,
  bigint: () => bigint3,
  boolean: () => boolean2,
  catch: () => _catch2,
  check: () => check,
  cidrv4: () => cidrv42,
  cidrv6: () => cidrv62,
  codec: () => codec,
  cuid: () => cuid3,
  cuid2: () => cuid22,
  custom: () => custom,
  date: () => date3,
  describe: () => describe2,
  discriminatedUnion: () => discriminatedUnion,
  e164: () => e1642,
  email: () => email2,
  emoji: () => emoji2,
  enum: () => _enum2,
  exactOptional: () => exactOptional,
  file: () => file,
  float32: () => float32,
  float64: () => float64,
  function: () => _function,
  guid: () => guid2,
  hash: () => hash,
  hex: () => hex2,
  hostname: () => hostname2,
  httpUrl: () => httpUrl,
  instanceof: () => _instanceof,
  int: () => int,
  int32: () => int32,
  int64: () => int64,
  intersection: () => intersection,
  ipv4: () => ipv42,
  ipv6: () => ipv62,
  json: () => json2,
  jwt: () => jwt,
  keyof: () => keyof,
  ksuid: () => ksuid2,
  lazy: () => lazy,
  literal: () => literal,
  looseObject: () => looseObject,
  looseRecord: () => looseRecord,
  mac: () => mac2,
  map: () => map,
  meta: () => meta2,
  nan: () => nan,
  nanoid: () => nanoid2,
  nativeEnum: () => nativeEnum,
  never: () => never,
  nonoptional: () => nonoptional,
  null: () => _null3,
  nullable: () => nullable,
  nullish: () => nullish2,
  number: () => number2,
  object: () => object,
  optional: () => optional,
  partialRecord: () => partialRecord,
  pipe: () => pipe,
  prefault: () => prefault,
  preprocess: () => preprocess,
  promise: () => promise,
  readonly: () => readonly,
  record: () => record,
  refine: () => refine,
  set: () => set,
  strictObject: () => strictObject,
  string: () => string2,
  stringFormat: () => stringFormat,
  stringbool: () => stringbool,
  success: () => success,
  superRefine: () => superRefine,
  symbol: () => symbol,
  templateLiteral: () => templateLiteral,
  transform: () => transform,
  tuple: () => tuple,
  uint32: () => uint32,
  uint64: () => uint64,
  ulid: () => ulid2,
  undefined: () => _undefined3,
  union: () => union,
  unknown: () => unknown,
  url: () => url,
  uuid: () => uuid2,
  uuidv4: () => uuidv4,
  uuidv6: () => uuidv6,
  uuidv7: () => uuidv7,
  void: () => _void2,
  xid: () => xid2,
  xor: () => xor
});
function string2(params) {
  return _string(ZodString, params);
}
function email2(params) {
  return _email(ZodEmail, params);
}
function guid2(params) {
  return _guid(ZodGUID, params);
}
function uuid2(params) {
  return _uuid(ZodUUID, params);
}
function uuidv4(params) {
  return _uuidv4(ZodUUID, params);
}
function uuidv6(params) {
  return _uuidv6(ZodUUID, params);
}
function uuidv7(params) {
  return _uuidv7(ZodUUID, params);
}
function url(params) {
  return _url(ZodURL, params);
}
function httpUrl(params) {
  return _url(ZodURL, {
    protocol: /^https?$/,
    hostname: regexes_exports.domain,
    ...util_exports.normalizeParams(params)
  });
}
function emoji2(params) {
  return _emoji2(ZodEmoji, params);
}
function nanoid2(params) {
  return _nanoid(ZodNanoID, params);
}
function cuid3(params) {
  return _cuid(ZodCUID, params);
}
function cuid22(params) {
  return _cuid2(ZodCUID2, params);
}
function ulid2(params) {
  return _ulid(ZodULID, params);
}
function xid2(params) {
  return _xid(ZodXID, params);
}
function ksuid2(params) {
  return _ksuid(ZodKSUID, params);
}
function ipv42(params) {
  return _ipv4(ZodIPv4, params);
}
function mac2(params) {
  return _mac(ZodMAC, params);
}
function ipv62(params) {
  return _ipv6(ZodIPv6, params);
}
function cidrv42(params) {
  return _cidrv4(ZodCIDRv4, params);
}
function cidrv62(params) {
  return _cidrv6(ZodCIDRv6, params);
}
function base642(params) {
  return _base64(ZodBase64, params);
}
function base64url2(params) {
  return _base64url(ZodBase64URL, params);
}
function e1642(params) {
  return _e164(ZodE164, params);
}
function jwt(params) {
  return _jwt(ZodJWT, params);
}
function stringFormat(format, fnOrRegex, _params = {}) {
  return _stringFormat(ZodCustomStringFormat, format, fnOrRegex, _params);
}
function hostname2(_params) {
  return _stringFormat(ZodCustomStringFormat, "hostname", regexes_exports.hostname, _params);
}
function hex2(_params) {
  return _stringFormat(ZodCustomStringFormat, "hex", regexes_exports.hex, _params);
}
function hash(alg, params) {
  const enc = params?.enc ?? "hex";
  const format = `${alg}_${enc}`;
  const regex = regexes_exports[format];
  if (!regex)
    throw new Error(`Unrecognized hash format: ${format}`);
  return _stringFormat(ZodCustomStringFormat, format, regex, params);
}
function number2(params) {
  return _number(ZodNumber, params);
}
function int(params) {
  return _int(ZodNumberFormat, params);
}
function float32(params) {
  return _float32(ZodNumberFormat, params);
}
function float64(params) {
  return _float64(ZodNumberFormat, params);
}
function int32(params) {
  return _int32(ZodNumberFormat, params);
}
function uint32(params) {
  return _uint32(ZodNumberFormat, params);
}
function boolean2(params) {
  return _boolean(ZodBoolean, params);
}
function bigint3(params) {
  return _bigint(ZodBigInt, params);
}
function int64(params) {
  return _int64(ZodBigIntFormat, params);
}
function uint64(params) {
  return _uint64(ZodBigIntFormat, params);
}
function symbol(params) {
  return _symbol(ZodSymbol, params);
}
function _undefined3(params) {
  return _undefined2(ZodUndefined, params);
}
function _null3(params) {
  return _null2(ZodNull, params);
}
function any() {
  return _any(ZodAny);
}
function unknown() {
  return _unknown(ZodUnknown);
}
function never(params) {
  return _never(ZodNever, params);
}
function _void2(params) {
  return _void(ZodVoid, params);
}
function date3(params) {
  return _date(ZodDate, params);
}
function array(element, params) {
  return _array(ZodArray, element, params);
}
function keyof(schema) {
  const shape = schema._zod.def.shape;
  return _enum2(Object.keys(shape));
}
function object(shape, params) {
  const def = {
    type: "object",
    shape: shape ?? {},
    ...util_exports.normalizeParams(params)
  };
  return new ZodObject(def);
}
function strictObject(shape, params) {
  return new ZodObject({
    type: "object",
    shape,
    catchall: never(),
    ...util_exports.normalizeParams(params)
  });
}
function looseObject(shape, params) {
  return new ZodObject({
    type: "object",
    shape,
    catchall: unknown(),
    ...util_exports.normalizeParams(params)
  });
}
function union(options, params) {
  return new ZodUnion({
    type: "union",
    options,
    ...util_exports.normalizeParams(params)
  });
}
function xor(options, params) {
  return new ZodXor({
    type: "union",
    options,
    inclusive: false,
    ...util_exports.normalizeParams(params)
  });
}
function discriminatedUnion(discriminator, options, params) {
  return new ZodDiscriminatedUnion({
    type: "union",
    options,
    discriminator,
    ...util_exports.normalizeParams(params)
  });
}
function intersection(left, right) {
  return new ZodIntersection({
    type: "intersection",
    left,
    right
  });
}
function tuple(items, _paramsOrRest, _params) {
  const hasRest = _paramsOrRest instanceof $ZodType;
  const params = hasRest ? _params : _paramsOrRest;
  const rest = hasRest ? _paramsOrRest : null;
  return new ZodTuple({
    type: "tuple",
    items,
    rest,
    ...util_exports.normalizeParams(params)
  });
}
function record(keyType, valueType, params) {
  return new ZodRecord({
    type: "record",
    keyType,
    valueType,
    ...util_exports.normalizeParams(params)
  });
}
function partialRecord(keyType, valueType, params) {
  const k = clone(keyType);
  k._zod.values = void 0;
  return new ZodRecord({
    type: "record",
    keyType: k,
    valueType,
    ...util_exports.normalizeParams(params)
  });
}
function looseRecord(keyType, valueType, params) {
  return new ZodRecord({
    type: "record",
    keyType,
    valueType,
    mode: "loose",
    ...util_exports.normalizeParams(params)
  });
}
function map(keyType, valueType, params) {
  return new ZodMap({
    type: "map",
    keyType,
    valueType,
    ...util_exports.normalizeParams(params)
  });
}
function set(valueType, params) {
  return new ZodSet({
    type: "set",
    valueType,
    ...util_exports.normalizeParams(params)
  });
}
function _enum2(values, params) {
  const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
  return new ZodEnum({
    type: "enum",
    entries,
    ...util_exports.normalizeParams(params)
  });
}
function nativeEnum(entries, params) {
  return new ZodEnum({
    type: "enum",
    entries,
    ...util_exports.normalizeParams(params)
  });
}
function literal(value, params) {
  return new ZodLiteral({
    type: "literal",
    values: Array.isArray(value) ? value : [value],
    ...util_exports.normalizeParams(params)
  });
}
function file(params) {
  return _file(ZodFile, params);
}
function transform(fn) {
  return new ZodTransform({
    type: "transform",
    transform: fn
  });
}
function optional(innerType) {
  return new ZodOptional({
    type: "optional",
    innerType
  });
}
function exactOptional(innerType) {
  return new ZodExactOptional({
    type: "optional",
    innerType
  });
}
function nullable(innerType) {
  return new ZodNullable({
    type: "nullable",
    innerType
  });
}
function nullish2(innerType) {
  return optional(nullable(innerType));
}
function _default2(innerType, defaultValue) {
  return new ZodDefault({
    type: "default",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : util_exports.shallowClone(defaultValue);
    }
  });
}
function prefault(innerType, defaultValue) {
  return new ZodPrefault({
    type: "prefault",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : util_exports.shallowClone(defaultValue);
    }
  });
}
function nonoptional(innerType, params) {
  return new ZodNonOptional({
    type: "nonoptional",
    innerType,
    ...util_exports.normalizeParams(params)
  });
}
function success(innerType) {
  return new ZodSuccess({
    type: "success",
    innerType
  });
}
function _catch2(innerType, catchValue) {
  return new ZodCatch({
    type: "catch",
    innerType,
    catchValue: typeof catchValue === "function" ? catchValue : () => catchValue
  });
}
function nan(params) {
  return _nan(ZodNaN, params);
}
function pipe(in_, out) {
  return new ZodPipe({
    type: "pipe",
    in: in_,
    out
    // ...util.normalizeParams(params),
  });
}
function codec(in_, out, params) {
  return new ZodCodec({
    type: "pipe",
    in: in_,
    out,
    transform: params.decode,
    reverseTransform: params.encode
  });
}
function readonly(innerType) {
  return new ZodReadonly({
    type: "readonly",
    innerType
  });
}
function templateLiteral(parts, params) {
  return new ZodTemplateLiteral({
    type: "template_literal",
    parts,
    ...util_exports.normalizeParams(params)
  });
}
function lazy(getter) {
  return new ZodLazy({
    type: "lazy",
    getter
  });
}
function promise(innerType) {
  return new ZodPromise({
    type: "promise",
    innerType
  });
}
function _function(params) {
  return new ZodFunction({
    type: "function",
    input: Array.isArray(params?.input) ? tuple(params?.input) : params?.input ?? array(unknown()),
    output: params?.output ?? unknown()
  });
}
function check(fn) {
  const ch = new $ZodCheck({
    check: "custom"
    // ...util.normalizeParams(params),
  });
  ch._zod.check = fn;
  return ch;
}
function custom(fn, _params) {
  return _custom(ZodCustom, fn ?? (() => true), _params);
}
function refine(fn, _params = {}) {
  return _refine(ZodCustom, fn, _params);
}
function superRefine(fn) {
  return _superRefine(fn);
}
function _instanceof(cls, params = {}) {
  const inst = new ZodCustom({
    type: "custom",
    check: "custom",
    fn: (data) => data instanceof cls,
    abort: true,
    ...util_exports.normalizeParams(params)
  });
  inst._zod.bag.Class = cls;
  inst._zod.check = (payload) => {
    if (!(payload.value instanceof cls)) {
      payload.issues.push({
        code: "invalid_type",
        expected: cls.name,
        input: payload.value,
        inst,
        path: [...inst._zod.def.path ?? []]
      });
    }
  };
  return inst;
}
function json2(params) {
  const jsonSchema = lazy(() => {
    return union([string2(params), number2(), boolean2(), _null3(), array(jsonSchema), record(string2(), jsonSchema)]);
  });
  return jsonSchema;
}
function preprocess(fn, schema) {
  return pipe(transform(fn), schema);
}
var ZodType, _ZodString, ZodString, ZodStringFormat, ZodEmail, ZodGUID, ZodUUID, ZodURL, ZodEmoji, ZodNanoID, ZodCUID, ZodCUID2, ZodULID, ZodXID, ZodKSUID, ZodIPv4, ZodMAC, ZodIPv6, ZodCIDRv4, ZodCIDRv6, ZodBase64, ZodBase64URL, ZodE164, ZodJWT, ZodCustomStringFormat, ZodNumber, ZodNumberFormat, ZodBoolean, ZodBigInt, ZodBigIntFormat, ZodSymbol, ZodUndefined, ZodNull, ZodAny, ZodUnknown, ZodNever, ZodVoid, ZodDate, ZodArray, ZodObject, ZodUnion, ZodXor, ZodDiscriminatedUnion, ZodIntersection, ZodTuple, ZodRecord, ZodMap, ZodSet, ZodEnum, ZodLiteral, ZodFile, ZodTransform, ZodOptional, ZodExactOptional, ZodNullable, ZodDefault, ZodPrefault, ZodNonOptional, ZodSuccess, ZodCatch, ZodNaN, ZodPipe, ZodCodec, ZodReadonly, ZodTemplateLiteral, ZodLazy, ZodPromise, ZodFunction, ZodCustom, describe2, meta2, stringbool;
var init_schemas2 = __esm({
  "../node_modules/zod/v4/classic/schemas.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_core2();
    init_core2();
    init_json_schema_processors();
    init_to_json_schema();
    init_checks2();
    init_iso();
    init_parse2();
    ZodType = /* @__PURE__ */ $constructor("ZodType", (inst, def) => {
      $ZodType.init(inst, def);
      Object.assign(inst["~standard"], {
        jsonSchema: {
          input: createStandardJSONSchemaMethod(inst, "input"),
          output: createStandardJSONSchemaMethod(inst, "output")
        }
      });
      inst.toJSONSchema = createToJSONSchemaMethod(inst, {});
      inst.def = def;
      inst.type = def.type;
      Object.defineProperty(inst, "_def", { value: def });
      inst.check = (...checks) => {
        return inst.clone(util_exports.mergeDefs(def, {
          checks: [
            ...def.checks ?? [],
            ...checks.map((ch) => typeof ch === "function" ? { _zod: { check: ch, def: { check: "custom" }, onattach: [] } } : ch)
          ]
        }), {
          parent: true
        });
      };
      inst.with = inst.check;
      inst.clone = (def2, params) => clone(inst, def2, params);
      inst.brand = () => inst;
      inst.register = (reg, meta3) => {
        reg.add(inst, meta3);
        return inst;
      };
      inst.parse = (data, params) => parse2(inst, data, params, { callee: inst.parse });
      inst.safeParse = (data, params) => safeParse2(inst, data, params);
      inst.parseAsync = async (data, params) => parseAsync2(inst, data, params, { callee: inst.parseAsync });
      inst.safeParseAsync = async (data, params) => safeParseAsync2(inst, data, params);
      inst.spa = inst.safeParseAsync;
      inst.encode = (data, params) => encode2(inst, data, params);
      inst.decode = (data, params) => decode2(inst, data, params);
      inst.encodeAsync = async (data, params) => encodeAsync2(inst, data, params);
      inst.decodeAsync = async (data, params) => decodeAsync2(inst, data, params);
      inst.safeEncode = (data, params) => safeEncode2(inst, data, params);
      inst.safeDecode = (data, params) => safeDecode2(inst, data, params);
      inst.safeEncodeAsync = async (data, params) => safeEncodeAsync2(inst, data, params);
      inst.safeDecodeAsync = async (data, params) => safeDecodeAsync2(inst, data, params);
      inst.refine = (check2, params) => inst.check(refine(check2, params));
      inst.superRefine = (refinement) => inst.check(superRefine(refinement));
      inst.overwrite = (fn) => inst.check(_overwrite(fn));
      inst.optional = () => optional(inst);
      inst.exactOptional = () => exactOptional(inst);
      inst.nullable = () => nullable(inst);
      inst.nullish = () => optional(nullable(inst));
      inst.nonoptional = (params) => nonoptional(inst, params);
      inst.array = () => array(inst);
      inst.or = (arg) => union([inst, arg]);
      inst.and = (arg) => intersection(inst, arg);
      inst.transform = (tx) => pipe(inst, transform(tx));
      inst.default = (def2) => _default2(inst, def2);
      inst.prefault = (def2) => prefault(inst, def2);
      inst.catch = (params) => _catch2(inst, params);
      inst.pipe = (target) => pipe(inst, target);
      inst.readonly = () => readonly(inst);
      inst.describe = (description) => {
        const cl = inst.clone();
        globalRegistry.add(cl, { description });
        return cl;
      };
      Object.defineProperty(inst, "description", {
        get() {
          return globalRegistry.get(inst)?.description;
        },
        configurable: true
      });
      inst.meta = (...args) => {
        if (args.length === 0) {
          return globalRegistry.get(inst);
        }
        const cl = inst.clone();
        globalRegistry.add(cl, args[0]);
        return cl;
      };
      inst.isOptional = () => inst.safeParse(void 0).success;
      inst.isNullable = () => inst.safeParse(null).success;
      inst.apply = (fn) => fn(inst);
      return inst;
    });
    _ZodString = /* @__PURE__ */ $constructor("_ZodString", (inst, def) => {
      $ZodString.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => stringProcessor(inst, ctx, json3, params);
      const bag = inst._zod.bag;
      inst.format = bag.format ?? null;
      inst.minLength = bag.minimum ?? null;
      inst.maxLength = bag.maximum ?? null;
      inst.regex = (...args) => inst.check(_regex(...args));
      inst.includes = (...args) => inst.check(_includes(...args));
      inst.startsWith = (...args) => inst.check(_startsWith(...args));
      inst.endsWith = (...args) => inst.check(_endsWith(...args));
      inst.min = (...args) => inst.check(_minLength(...args));
      inst.max = (...args) => inst.check(_maxLength(...args));
      inst.length = (...args) => inst.check(_length(...args));
      inst.nonempty = (...args) => inst.check(_minLength(1, ...args));
      inst.lowercase = (params) => inst.check(_lowercase(params));
      inst.uppercase = (params) => inst.check(_uppercase(params));
      inst.trim = () => inst.check(_trim());
      inst.normalize = (...args) => inst.check(_normalize(...args));
      inst.toLowerCase = () => inst.check(_toLowerCase());
      inst.toUpperCase = () => inst.check(_toUpperCase());
      inst.slugify = () => inst.check(_slugify());
    });
    ZodString = /* @__PURE__ */ $constructor("ZodString", (inst, def) => {
      $ZodString.init(inst, def);
      _ZodString.init(inst, def);
      inst.email = (params) => inst.check(_email(ZodEmail, params));
      inst.url = (params) => inst.check(_url(ZodURL, params));
      inst.jwt = (params) => inst.check(_jwt(ZodJWT, params));
      inst.emoji = (params) => inst.check(_emoji2(ZodEmoji, params));
      inst.guid = (params) => inst.check(_guid(ZodGUID, params));
      inst.uuid = (params) => inst.check(_uuid(ZodUUID, params));
      inst.uuidv4 = (params) => inst.check(_uuidv4(ZodUUID, params));
      inst.uuidv6 = (params) => inst.check(_uuidv6(ZodUUID, params));
      inst.uuidv7 = (params) => inst.check(_uuidv7(ZodUUID, params));
      inst.nanoid = (params) => inst.check(_nanoid(ZodNanoID, params));
      inst.guid = (params) => inst.check(_guid(ZodGUID, params));
      inst.cuid = (params) => inst.check(_cuid(ZodCUID, params));
      inst.cuid2 = (params) => inst.check(_cuid2(ZodCUID2, params));
      inst.ulid = (params) => inst.check(_ulid(ZodULID, params));
      inst.base64 = (params) => inst.check(_base64(ZodBase64, params));
      inst.base64url = (params) => inst.check(_base64url(ZodBase64URL, params));
      inst.xid = (params) => inst.check(_xid(ZodXID, params));
      inst.ksuid = (params) => inst.check(_ksuid(ZodKSUID, params));
      inst.ipv4 = (params) => inst.check(_ipv4(ZodIPv4, params));
      inst.ipv6 = (params) => inst.check(_ipv6(ZodIPv6, params));
      inst.cidrv4 = (params) => inst.check(_cidrv4(ZodCIDRv4, params));
      inst.cidrv6 = (params) => inst.check(_cidrv6(ZodCIDRv6, params));
      inst.e164 = (params) => inst.check(_e164(ZodE164, params));
      inst.datetime = (params) => inst.check(datetime2(params));
      inst.date = (params) => inst.check(date2(params));
      inst.time = (params) => inst.check(time4(params));
      inst.duration = (params) => inst.check(duration2(params));
    });
    __name(string2, "string");
    ZodStringFormat = /* @__PURE__ */ $constructor("ZodStringFormat", (inst, def) => {
      $ZodStringFormat.init(inst, def);
      _ZodString.init(inst, def);
    });
    ZodEmail = /* @__PURE__ */ $constructor("ZodEmail", (inst, def) => {
      $ZodEmail.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    __name(email2, "email");
    ZodGUID = /* @__PURE__ */ $constructor("ZodGUID", (inst, def) => {
      $ZodGUID.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    __name(guid2, "guid");
    ZodUUID = /* @__PURE__ */ $constructor("ZodUUID", (inst, def) => {
      $ZodUUID.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    __name(uuid2, "uuid");
    __name(uuidv4, "uuidv4");
    __name(uuidv6, "uuidv6");
    __name(uuidv7, "uuidv7");
    ZodURL = /* @__PURE__ */ $constructor("ZodURL", (inst, def) => {
      $ZodURL.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    __name(url, "url");
    __name(httpUrl, "httpUrl");
    ZodEmoji = /* @__PURE__ */ $constructor("ZodEmoji", (inst, def) => {
      $ZodEmoji.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    __name(emoji2, "emoji");
    ZodNanoID = /* @__PURE__ */ $constructor("ZodNanoID", (inst, def) => {
      $ZodNanoID.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    __name(nanoid2, "nanoid");
    ZodCUID = /* @__PURE__ */ $constructor("ZodCUID", (inst, def) => {
      $ZodCUID.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    __name(cuid3, "cuid");
    ZodCUID2 = /* @__PURE__ */ $constructor("ZodCUID2", (inst, def) => {
      $ZodCUID2.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    __name(cuid22, "cuid2");
    ZodULID = /* @__PURE__ */ $constructor("ZodULID", (inst, def) => {
      $ZodULID.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    __name(ulid2, "ulid");
    ZodXID = /* @__PURE__ */ $constructor("ZodXID", (inst, def) => {
      $ZodXID.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    __name(xid2, "xid");
    ZodKSUID = /* @__PURE__ */ $constructor("ZodKSUID", (inst, def) => {
      $ZodKSUID.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    __name(ksuid2, "ksuid");
    ZodIPv4 = /* @__PURE__ */ $constructor("ZodIPv4", (inst, def) => {
      $ZodIPv4.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    __name(ipv42, "ipv4");
    ZodMAC = /* @__PURE__ */ $constructor("ZodMAC", (inst, def) => {
      $ZodMAC.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    __name(mac2, "mac");
    ZodIPv6 = /* @__PURE__ */ $constructor("ZodIPv6", (inst, def) => {
      $ZodIPv6.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    __name(ipv62, "ipv6");
    ZodCIDRv4 = /* @__PURE__ */ $constructor("ZodCIDRv4", (inst, def) => {
      $ZodCIDRv4.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    __name(cidrv42, "cidrv4");
    ZodCIDRv6 = /* @__PURE__ */ $constructor("ZodCIDRv6", (inst, def) => {
      $ZodCIDRv6.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    __name(cidrv62, "cidrv6");
    ZodBase64 = /* @__PURE__ */ $constructor("ZodBase64", (inst, def) => {
      $ZodBase64.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    __name(base642, "base64");
    ZodBase64URL = /* @__PURE__ */ $constructor("ZodBase64URL", (inst, def) => {
      $ZodBase64URL.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    __name(base64url2, "base64url");
    ZodE164 = /* @__PURE__ */ $constructor("ZodE164", (inst, def) => {
      $ZodE164.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    __name(e1642, "e164");
    ZodJWT = /* @__PURE__ */ $constructor("ZodJWT", (inst, def) => {
      $ZodJWT.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    __name(jwt, "jwt");
    ZodCustomStringFormat = /* @__PURE__ */ $constructor("ZodCustomStringFormat", (inst, def) => {
      $ZodCustomStringFormat.init(inst, def);
      ZodStringFormat.init(inst, def);
    });
    __name(stringFormat, "stringFormat");
    __name(hostname2, "hostname");
    __name(hex2, "hex");
    __name(hash, "hash");
    ZodNumber = /* @__PURE__ */ $constructor("ZodNumber", (inst, def) => {
      $ZodNumber.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => numberProcessor(inst, ctx, json3, params);
      inst.gt = (value, params) => inst.check(_gt(value, params));
      inst.gte = (value, params) => inst.check(_gte(value, params));
      inst.min = (value, params) => inst.check(_gte(value, params));
      inst.lt = (value, params) => inst.check(_lt(value, params));
      inst.lte = (value, params) => inst.check(_lte(value, params));
      inst.max = (value, params) => inst.check(_lte(value, params));
      inst.int = (params) => inst.check(int(params));
      inst.safe = (params) => inst.check(int(params));
      inst.positive = (params) => inst.check(_gt(0, params));
      inst.nonnegative = (params) => inst.check(_gte(0, params));
      inst.negative = (params) => inst.check(_lt(0, params));
      inst.nonpositive = (params) => inst.check(_lte(0, params));
      inst.multipleOf = (value, params) => inst.check(_multipleOf(value, params));
      inst.step = (value, params) => inst.check(_multipleOf(value, params));
      inst.finite = () => inst;
      const bag = inst._zod.bag;
      inst.minValue = Math.max(bag.minimum ?? Number.NEGATIVE_INFINITY, bag.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null;
      inst.maxValue = Math.min(bag.maximum ?? Number.POSITIVE_INFINITY, bag.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null;
      inst.isInt = (bag.format ?? "").includes("int") || Number.isSafeInteger(bag.multipleOf ?? 0.5);
      inst.isFinite = true;
      inst.format = bag.format ?? null;
    });
    __name(number2, "number");
    ZodNumberFormat = /* @__PURE__ */ $constructor("ZodNumberFormat", (inst, def) => {
      $ZodNumberFormat.init(inst, def);
      ZodNumber.init(inst, def);
    });
    __name(int, "int");
    __name(float32, "float32");
    __name(float64, "float64");
    __name(int32, "int32");
    __name(uint32, "uint32");
    ZodBoolean = /* @__PURE__ */ $constructor("ZodBoolean", (inst, def) => {
      $ZodBoolean.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => booleanProcessor(inst, ctx, json3, params);
    });
    __name(boolean2, "boolean");
    ZodBigInt = /* @__PURE__ */ $constructor("ZodBigInt", (inst, def) => {
      $ZodBigInt.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => bigintProcessor(inst, ctx, json3, params);
      inst.gte = (value, params) => inst.check(_gte(value, params));
      inst.min = (value, params) => inst.check(_gte(value, params));
      inst.gt = (value, params) => inst.check(_gt(value, params));
      inst.gte = (value, params) => inst.check(_gte(value, params));
      inst.min = (value, params) => inst.check(_gte(value, params));
      inst.lt = (value, params) => inst.check(_lt(value, params));
      inst.lte = (value, params) => inst.check(_lte(value, params));
      inst.max = (value, params) => inst.check(_lte(value, params));
      inst.positive = (params) => inst.check(_gt(BigInt(0), params));
      inst.negative = (params) => inst.check(_lt(BigInt(0), params));
      inst.nonpositive = (params) => inst.check(_lte(BigInt(0), params));
      inst.nonnegative = (params) => inst.check(_gte(BigInt(0), params));
      inst.multipleOf = (value, params) => inst.check(_multipleOf(value, params));
      const bag = inst._zod.bag;
      inst.minValue = bag.minimum ?? null;
      inst.maxValue = bag.maximum ?? null;
      inst.format = bag.format ?? null;
    });
    __name(bigint3, "bigint");
    ZodBigIntFormat = /* @__PURE__ */ $constructor("ZodBigIntFormat", (inst, def) => {
      $ZodBigIntFormat.init(inst, def);
      ZodBigInt.init(inst, def);
    });
    __name(int64, "int64");
    __name(uint64, "uint64");
    ZodSymbol = /* @__PURE__ */ $constructor("ZodSymbol", (inst, def) => {
      $ZodSymbol.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => symbolProcessor(inst, ctx, json3, params);
    });
    __name(symbol, "symbol");
    ZodUndefined = /* @__PURE__ */ $constructor("ZodUndefined", (inst, def) => {
      $ZodUndefined.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => undefinedProcessor(inst, ctx, json3, params);
    });
    __name(_undefined3, "_undefined");
    ZodNull = /* @__PURE__ */ $constructor("ZodNull", (inst, def) => {
      $ZodNull.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => nullProcessor(inst, ctx, json3, params);
    });
    __name(_null3, "_null");
    ZodAny = /* @__PURE__ */ $constructor("ZodAny", (inst, def) => {
      $ZodAny.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => anyProcessor(inst, ctx, json3, params);
    });
    __name(any, "any");
    ZodUnknown = /* @__PURE__ */ $constructor("ZodUnknown", (inst, def) => {
      $ZodUnknown.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => unknownProcessor(inst, ctx, json3, params);
    });
    __name(unknown, "unknown");
    ZodNever = /* @__PURE__ */ $constructor("ZodNever", (inst, def) => {
      $ZodNever.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => neverProcessor(inst, ctx, json3, params);
    });
    __name(never, "never");
    ZodVoid = /* @__PURE__ */ $constructor("ZodVoid", (inst, def) => {
      $ZodVoid.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => voidProcessor(inst, ctx, json3, params);
    });
    __name(_void2, "_void");
    ZodDate = /* @__PURE__ */ $constructor("ZodDate", (inst, def) => {
      $ZodDate.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => dateProcessor(inst, ctx, json3, params);
      inst.min = (value, params) => inst.check(_gte(value, params));
      inst.max = (value, params) => inst.check(_lte(value, params));
      const c = inst._zod.bag;
      inst.minDate = c.minimum ? new Date(c.minimum) : null;
      inst.maxDate = c.maximum ? new Date(c.maximum) : null;
    });
    __name(date3, "date");
    ZodArray = /* @__PURE__ */ $constructor("ZodArray", (inst, def) => {
      $ZodArray.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => arrayProcessor(inst, ctx, json3, params);
      inst.element = def.element;
      inst.min = (minLength, params) => inst.check(_minLength(minLength, params));
      inst.nonempty = (params) => inst.check(_minLength(1, params));
      inst.max = (maxLength, params) => inst.check(_maxLength(maxLength, params));
      inst.length = (len, params) => inst.check(_length(len, params));
      inst.unwrap = () => inst.element;
    });
    __name(array, "array");
    __name(keyof, "keyof");
    ZodObject = /* @__PURE__ */ $constructor("ZodObject", (inst, def) => {
      $ZodObjectJIT.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => objectProcessor(inst, ctx, json3, params);
      util_exports.defineLazy(inst, "shape", () => {
        return def.shape;
      });
      inst.keyof = () => _enum2(Object.keys(inst._zod.def.shape));
      inst.catchall = (catchall) => inst.clone({ ...inst._zod.def, catchall });
      inst.passthrough = () => inst.clone({ ...inst._zod.def, catchall: unknown() });
      inst.loose = () => inst.clone({ ...inst._zod.def, catchall: unknown() });
      inst.strict = () => inst.clone({ ...inst._zod.def, catchall: never() });
      inst.strip = () => inst.clone({ ...inst._zod.def, catchall: void 0 });
      inst.extend = (incoming) => {
        return util_exports.extend(inst, incoming);
      };
      inst.safeExtend = (incoming) => {
        return util_exports.safeExtend(inst, incoming);
      };
      inst.merge = (other) => util_exports.merge(inst, other);
      inst.pick = (mask) => util_exports.pick(inst, mask);
      inst.omit = (mask) => util_exports.omit(inst, mask);
      inst.partial = (...args) => util_exports.partial(ZodOptional, inst, args[0]);
      inst.required = (...args) => util_exports.required(ZodNonOptional, inst, args[0]);
    });
    __name(object, "object");
    __name(strictObject, "strictObject");
    __name(looseObject, "looseObject");
    ZodUnion = /* @__PURE__ */ $constructor("ZodUnion", (inst, def) => {
      $ZodUnion.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => unionProcessor(inst, ctx, json3, params);
      inst.options = def.options;
    });
    __name(union, "union");
    ZodXor = /* @__PURE__ */ $constructor("ZodXor", (inst, def) => {
      ZodUnion.init(inst, def);
      $ZodXor.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => unionProcessor(inst, ctx, json3, params);
      inst.options = def.options;
    });
    __name(xor, "xor");
    ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("ZodDiscriminatedUnion", (inst, def) => {
      ZodUnion.init(inst, def);
      $ZodDiscriminatedUnion.init(inst, def);
    });
    __name(discriminatedUnion, "discriminatedUnion");
    ZodIntersection = /* @__PURE__ */ $constructor("ZodIntersection", (inst, def) => {
      $ZodIntersection.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => intersectionProcessor(inst, ctx, json3, params);
    });
    __name(intersection, "intersection");
    ZodTuple = /* @__PURE__ */ $constructor("ZodTuple", (inst, def) => {
      $ZodTuple.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => tupleProcessor(inst, ctx, json3, params);
      inst.rest = (rest) => inst.clone({
        ...inst._zod.def,
        rest
      });
    });
    __name(tuple, "tuple");
    ZodRecord = /* @__PURE__ */ $constructor("ZodRecord", (inst, def) => {
      $ZodRecord.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => recordProcessor(inst, ctx, json3, params);
      inst.keyType = def.keyType;
      inst.valueType = def.valueType;
    });
    __name(record, "record");
    __name(partialRecord, "partialRecord");
    __name(looseRecord, "looseRecord");
    ZodMap = /* @__PURE__ */ $constructor("ZodMap", (inst, def) => {
      $ZodMap.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => mapProcessor(inst, ctx, json3, params);
      inst.keyType = def.keyType;
      inst.valueType = def.valueType;
      inst.min = (...args) => inst.check(_minSize(...args));
      inst.nonempty = (params) => inst.check(_minSize(1, params));
      inst.max = (...args) => inst.check(_maxSize(...args));
      inst.size = (...args) => inst.check(_size(...args));
    });
    __name(map, "map");
    ZodSet = /* @__PURE__ */ $constructor("ZodSet", (inst, def) => {
      $ZodSet.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => setProcessor(inst, ctx, json3, params);
      inst.min = (...args) => inst.check(_minSize(...args));
      inst.nonempty = (params) => inst.check(_minSize(1, params));
      inst.max = (...args) => inst.check(_maxSize(...args));
      inst.size = (...args) => inst.check(_size(...args));
    });
    __name(set, "set");
    ZodEnum = /* @__PURE__ */ $constructor("ZodEnum", (inst, def) => {
      $ZodEnum.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => enumProcessor(inst, ctx, json3, params);
      inst.enum = def.entries;
      inst.options = Object.values(def.entries);
      const keys = new Set(Object.keys(def.entries));
      inst.extract = (values, params) => {
        const newEntries = {};
        for (const value of values) {
          if (keys.has(value)) {
            newEntries[value] = def.entries[value];
          } else
            throw new Error(`Key ${value} not found in enum`);
        }
        return new ZodEnum({
          ...def,
          checks: [],
          ...util_exports.normalizeParams(params),
          entries: newEntries
        });
      };
      inst.exclude = (values, params) => {
        const newEntries = { ...def.entries };
        for (const value of values) {
          if (keys.has(value)) {
            delete newEntries[value];
          } else
            throw new Error(`Key ${value} not found in enum`);
        }
        return new ZodEnum({
          ...def,
          checks: [],
          ...util_exports.normalizeParams(params),
          entries: newEntries
        });
      };
    });
    __name(_enum2, "_enum");
    __name(nativeEnum, "nativeEnum");
    ZodLiteral = /* @__PURE__ */ $constructor("ZodLiteral", (inst, def) => {
      $ZodLiteral.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => literalProcessor(inst, ctx, json3, params);
      inst.values = new Set(def.values);
      Object.defineProperty(inst, "value", {
        get() {
          if (def.values.length > 1) {
            throw new Error("This schema contains multiple valid literal values. Use `.values` instead.");
          }
          return def.values[0];
        }
      });
    });
    __name(literal, "literal");
    ZodFile = /* @__PURE__ */ $constructor("ZodFile", (inst, def) => {
      $ZodFile.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => fileProcessor(inst, ctx, json3, params);
      inst.min = (size, params) => inst.check(_minSize(size, params));
      inst.max = (size, params) => inst.check(_maxSize(size, params));
      inst.mime = (types, params) => inst.check(_mime(Array.isArray(types) ? types : [types], params));
    });
    __name(file, "file");
    ZodTransform = /* @__PURE__ */ $constructor("ZodTransform", (inst, def) => {
      $ZodTransform.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => transformProcessor(inst, ctx, json3, params);
      inst._zod.parse = (payload, _ctx) => {
        if (_ctx.direction === "backward") {
          throw new $ZodEncodeError(inst.constructor.name);
        }
        payload.addIssue = (issue2) => {
          if (typeof issue2 === "string") {
            payload.issues.push(util_exports.issue(issue2, payload.value, def));
          } else {
            const _issue = issue2;
            if (_issue.fatal)
              _issue.continue = false;
            _issue.code ?? (_issue.code = "custom");
            _issue.input ?? (_issue.input = payload.value);
            _issue.inst ?? (_issue.inst = inst);
            payload.issues.push(util_exports.issue(_issue));
          }
        };
        const output = def.transform(payload.value, payload);
        if (output instanceof Promise) {
          return output.then((output2) => {
            payload.value = output2;
            return payload;
          });
        }
        payload.value = output;
        return payload;
      };
    });
    __name(transform, "transform");
    ZodOptional = /* @__PURE__ */ $constructor("ZodOptional", (inst, def) => {
      $ZodOptional.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => optionalProcessor(inst, ctx, json3, params);
      inst.unwrap = () => inst._zod.def.innerType;
    });
    __name(optional, "optional");
    ZodExactOptional = /* @__PURE__ */ $constructor("ZodExactOptional", (inst, def) => {
      $ZodExactOptional.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => optionalProcessor(inst, ctx, json3, params);
      inst.unwrap = () => inst._zod.def.innerType;
    });
    __name(exactOptional, "exactOptional");
    ZodNullable = /* @__PURE__ */ $constructor("ZodNullable", (inst, def) => {
      $ZodNullable.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => nullableProcessor(inst, ctx, json3, params);
      inst.unwrap = () => inst._zod.def.innerType;
    });
    __name(nullable, "nullable");
    __name(nullish2, "nullish");
    ZodDefault = /* @__PURE__ */ $constructor("ZodDefault", (inst, def) => {
      $ZodDefault.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => defaultProcessor(inst, ctx, json3, params);
      inst.unwrap = () => inst._zod.def.innerType;
      inst.removeDefault = inst.unwrap;
    });
    __name(_default2, "_default");
    ZodPrefault = /* @__PURE__ */ $constructor("ZodPrefault", (inst, def) => {
      $ZodPrefault.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => prefaultProcessor(inst, ctx, json3, params);
      inst.unwrap = () => inst._zod.def.innerType;
    });
    __name(prefault, "prefault");
    ZodNonOptional = /* @__PURE__ */ $constructor("ZodNonOptional", (inst, def) => {
      $ZodNonOptional.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => nonoptionalProcessor(inst, ctx, json3, params);
      inst.unwrap = () => inst._zod.def.innerType;
    });
    __name(nonoptional, "nonoptional");
    ZodSuccess = /* @__PURE__ */ $constructor("ZodSuccess", (inst, def) => {
      $ZodSuccess.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => successProcessor(inst, ctx, json3, params);
      inst.unwrap = () => inst._zod.def.innerType;
    });
    __name(success, "success");
    ZodCatch = /* @__PURE__ */ $constructor("ZodCatch", (inst, def) => {
      $ZodCatch.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => catchProcessor(inst, ctx, json3, params);
      inst.unwrap = () => inst._zod.def.innerType;
      inst.removeCatch = inst.unwrap;
    });
    __name(_catch2, "_catch");
    ZodNaN = /* @__PURE__ */ $constructor("ZodNaN", (inst, def) => {
      $ZodNaN.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => nanProcessor(inst, ctx, json3, params);
    });
    __name(nan, "nan");
    ZodPipe = /* @__PURE__ */ $constructor("ZodPipe", (inst, def) => {
      $ZodPipe.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => pipeProcessor(inst, ctx, json3, params);
      inst.in = def.in;
      inst.out = def.out;
    });
    __name(pipe, "pipe");
    ZodCodec = /* @__PURE__ */ $constructor("ZodCodec", (inst, def) => {
      ZodPipe.init(inst, def);
      $ZodCodec.init(inst, def);
    });
    __name(codec, "codec");
    ZodReadonly = /* @__PURE__ */ $constructor("ZodReadonly", (inst, def) => {
      $ZodReadonly.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => readonlyProcessor(inst, ctx, json3, params);
      inst.unwrap = () => inst._zod.def.innerType;
    });
    __name(readonly, "readonly");
    ZodTemplateLiteral = /* @__PURE__ */ $constructor("ZodTemplateLiteral", (inst, def) => {
      $ZodTemplateLiteral.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => templateLiteralProcessor(inst, ctx, json3, params);
    });
    __name(templateLiteral, "templateLiteral");
    ZodLazy = /* @__PURE__ */ $constructor("ZodLazy", (inst, def) => {
      $ZodLazy.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => lazyProcessor(inst, ctx, json3, params);
      inst.unwrap = () => inst._zod.def.getter();
    });
    __name(lazy, "lazy");
    ZodPromise = /* @__PURE__ */ $constructor("ZodPromise", (inst, def) => {
      $ZodPromise.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => promiseProcessor(inst, ctx, json3, params);
      inst.unwrap = () => inst._zod.def.innerType;
    });
    __name(promise, "promise");
    ZodFunction = /* @__PURE__ */ $constructor("ZodFunction", (inst, def) => {
      $ZodFunction.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => functionProcessor(inst, ctx, json3, params);
    });
    __name(_function, "_function");
    ZodCustom = /* @__PURE__ */ $constructor("ZodCustom", (inst, def) => {
      $ZodCustom.init(inst, def);
      ZodType.init(inst, def);
      inst._zod.processJSONSchema = (ctx, json3, params) => customProcessor(inst, ctx, json3, params);
    });
    __name(check, "check");
    __name(custom, "custom");
    __name(refine, "refine");
    __name(superRefine, "superRefine");
    describe2 = describe;
    meta2 = meta;
    __name(_instanceof, "_instanceof");
    stringbool = /* @__PURE__ */ __name((...args) => _stringbool({
      Codec: ZodCodec,
      Boolean: ZodBoolean,
      String: ZodString
    }, ...args), "stringbool");
    __name(json2, "json");
    __name(preprocess, "preprocess");
  }
});

// ../node_modules/zod/v4/classic/compat.js
function setErrorMap(map2) {
  config2({
    customError: map2
  });
}
function getErrorMap() {
  return config2().customError;
}
var ZodIssueCode, ZodFirstPartyTypeKind;
var init_compat = __esm({
  "../node_modules/zod/v4/classic/compat.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_core2();
    init_core2();
    ZodIssueCode = {
      invalid_type: "invalid_type",
      too_big: "too_big",
      too_small: "too_small",
      invalid_format: "invalid_format",
      not_multiple_of: "not_multiple_of",
      unrecognized_keys: "unrecognized_keys",
      invalid_union: "invalid_union",
      invalid_key: "invalid_key",
      invalid_element: "invalid_element",
      invalid_value: "invalid_value",
      custom: "custom"
    };
    __name(setErrorMap, "setErrorMap");
    __name(getErrorMap, "getErrorMap");
    (function(ZodFirstPartyTypeKind2) {
    })(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
  }
});

// ../node_modules/zod/v4/classic/from-json-schema.js
function detectVersion(schema, defaultTarget) {
  const $schema = schema.$schema;
  if ($schema === "https://json-schema.org/draft/2020-12/schema") {
    return "draft-2020-12";
  }
  if ($schema === "http://json-schema.org/draft-07/schema#") {
    return "draft-7";
  }
  if ($schema === "http://json-schema.org/draft-04/schema#") {
    return "draft-4";
  }
  return defaultTarget ?? "draft-2020-12";
}
function resolveRef(ref, ctx) {
  if (!ref.startsWith("#")) {
    throw new Error("External $ref is not supported, only local refs (#/...) are allowed");
  }
  const path = ref.slice(1).split("/").filter(Boolean);
  if (path.length === 0) {
    return ctx.rootSchema;
  }
  const defsKey = ctx.version === "draft-2020-12" ? "$defs" : "definitions";
  if (path[0] === defsKey) {
    const key = path[1];
    if (!key || !ctx.defs[key]) {
      throw new Error(`Reference not found: ${ref}`);
    }
    return ctx.defs[key];
  }
  throw new Error(`Reference not found: ${ref}`);
}
function convertBaseSchema(schema, ctx) {
  if (schema.not !== void 0) {
    if (typeof schema.not === "object" && Object.keys(schema.not).length === 0) {
      return z.never();
    }
    throw new Error("not is not supported in Zod (except { not: {} } for never)");
  }
  if (schema.unevaluatedItems !== void 0) {
    throw new Error("unevaluatedItems is not supported");
  }
  if (schema.unevaluatedProperties !== void 0) {
    throw new Error("unevaluatedProperties is not supported");
  }
  if (schema.if !== void 0 || schema.then !== void 0 || schema.else !== void 0) {
    throw new Error("Conditional schemas (if/then/else) are not supported");
  }
  if (schema.dependentSchemas !== void 0 || schema.dependentRequired !== void 0) {
    throw new Error("dependentSchemas and dependentRequired are not supported");
  }
  if (schema.$ref) {
    const refPath = schema.$ref;
    if (ctx.refs.has(refPath)) {
      return ctx.refs.get(refPath);
    }
    if (ctx.processing.has(refPath)) {
      return z.lazy(() => {
        if (!ctx.refs.has(refPath)) {
          throw new Error(`Circular reference not resolved: ${refPath}`);
        }
        return ctx.refs.get(refPath);
      });
    }
    ctx.processing.add(refPath);
    const resolved = resolveRef(refPath, ctx);
    const zodSchema2 = convertSchema(resolved, ctx);
    ctx.refs.set(refPath, zodSchema2);
    ctx.processing.delete(refPath);
    return zodSchema2;
  }
  if (schema.enum !== void 0) {
    const enumValues = schema.enum;
    if (ctx.version === "openapi-3.0" && schema.nullable === true && enumValues.length === 1 && enumValues[0] === null) {
      return z.null();
    }
    if (enumValues.length === 0) {
      return z.never();
    }
    if (enumValues.length === 1) {
      return z.literal(enumValues[0]);
    }
    if (enumValues.every((v) => typeof v === "string")) {
      return z.enum(enumValues);
    }
    const literalSchemas = enumValues.map((v) => z.literal(v));
    if (literalSchemas.length < 2) {
      return literalSchemas[0];
    }
    return z.union([literalSchemas[0], literalSchemas[1], ...literalSchemas.slice(2)]);
  }
  if (schema.const !== void 0) {
    return z.literal(schema.const);
  }
  const type = schema.type;
  if (Array.isArray(type)) {
    const typeSchemas = type.map((t) => {
      const typeSchema = { ...schema, type: t };
      return convertBaseSchema(typeSchema, ctx);
    });
    if (typeSchemas.length === 0) {
      return z.never();
    }
    if (typeSchemas.length === 1) {
      return typeSchemas[0];
    }
    return z.union(typeSchemas);
  }
  if (!type) {
    return z.any();
  }
  let zodSchema;
  switch (type) {
    case "string": {
      let stringSchema = z.string();
      if (schema.format) {
        const format = schema.format;
        if (format === "email") {
          stringSchema = stringSchema.check(z.email());
        } else if (format === "uri" || format === "uri-reference") {
          stringSchema = stringSchema.check(z.url());
        } else if (format === "uuid" || format === "guid") {
          stringSchema = stringSchema.check(z.uuid());
        } else if (format === "date-time") {
          stringSchema = stringSchema.check(z.iso.datetime());
        } else if (format === "date") {
          stringSchema = stringSchema.check(z.iso.date());
        } else if (format === "time") {
          stringSchema = stringSchema.check(z.iso.time());
        } else if (format === "duration") {
          stringSchema = stringSchema.check(z.iso.duration());
        } else if (format === "ipv4") {
          stringSchema = stringSchema.check(z.ipv4());
        } else if (format === "ipv6") {
          stringSchema = stringSchema.check(z.ipv6());
        } else if (format === "mac") {
          stringSchema = stringSchema.check(z.mac());
        } else if (format === "cidr") {
          stringSchema = stringSchema.check(z.cidrv4());
        } else if (format === "cidr-v6") {
          stringSchema = stringSchema.check(z.cidrv6());
        } else if (format === "base64") {
          stringSchema = stringSchema.check(z.base64());
        } else if (format === "base64url") {
          stringSchema = stringSchema.check(z.base64url());
        } else if (format === "e164") {
          stringSchema = stringSchema.check(z.e164());
        } else if (format === "jwt") {
          stringSchema = stringSchema.check(z.jwt());
        } else if (format === "emoji") {
          stringSchema = stringSchema.check(z.emoji());
        } else if (format === "nanoid") {
          stringSchema = stringSchema.check(z.nanoid());
        } else if (format === "cuid") {
          stringSchema = stringSchema.check(z.cuid());
        } else if (format === "cuid2") {
          stringSchema = stringSchema.check(z.cuid2());
        } else if (format === "ulid") {
          stringSchema = stringSchema.check(z.ulid());
        } else if (format === "xid") {
          stringSchema = stringSchema.check(z.xid());
        } else if (format === "ksuid") {
          stringSchema = stringSchema.check(z.ksuid());
        }
      }
      if (typeof schema.minLength === "number") {
        stringSchema = stringSchema.min(schema.minLength);
      }
      if (typeof schema.maxLength === "number") {
        stringSchema = stringSchema.max(schema.maxLength);
      }
      if (schema.pattern) {
        stringSchema = stringSchema.regex(new RegExp(schema.pattern));
      }
      zodSchema = stringSchema;
      break;
    }
    case "number":
    case "integer": {
      let numberSchema = type === "integer" ? z.number().int() : z.number();
      if (typeof schema.minimum === "number") {
        numberSchema = numberSchema.min(schema.minimum);
      }
      if (typeof schema.maximum === "number") {
        numberSchema = numberSchema.max(schema.maximum);
      }
      if (typeof schema.exclusiveMinimum === "number") {
        numberSchema = numberSchema.gt(schema.exclusiveMinimum);
      } else if (schema.exclusiveMinimum === true && typeof schema.minimum === "number") {
        numberSchema = numberSchema.gt(schema.minimum);
      }
      if (typeof schema.exclusiveMaximum === "number") {
        numberSchema = numberSchema.lt(schema.exclusiveMaximum);
      } else if (schema.exclusiveMaximum === true && typeof schema.maximum === "number") {
        numberSchema = numberSchema.lt(schema.maximum);
      }
      if (typeof schema.multipleOf === "number") {
        numberSchema = numberSchema.multipleOf(schema.multipleOf);
      }
      zodSchema = numberSchema;
      break;
    }
    case "boolean": {
      zodSchema = z.boolean();
      break;
    }
    case "null": {
      zodSchema = z.null();
      break;
    }
    case "object": {
      const shape = {};
      const properties = schema.properties || {};
      const requiredSet = new Set(schema.required || []);
      for (const [key, propSchema] of Object.entries(properties)) {
        const propZodSchema = convertSchema(propSchema, ctx);
        shape[key] = requiredSet.has(key) ? propZodSchema : propZodSchema.optional();
      }
      if (schema.propertyNames) {
        const keySchema = convertSchema(schema.propertyNames, ctx);
        const valueSchema = schema.additionalProperties && typeof schema.additionalProperties === "object" ? convertSchema(schema.additionalProperties, ctx) : z.any();
        if (Object.keys(shape).length === 0) {
          zodSchema = z.record(keySchema, valueSchema);
          break;
        }
        const objectSchema2 = z.object(shape).passthrough();
        const recordSchema = z.looseRecord(keySchema, valueSchema);
        zodSchema = z.intersection(objectSchema2, recordSchema);
        break;
      }
      if (schema.patternProperties) {
        const patternProps = schema.patternProperties;
        const patternKeys = Object.keys(patternProps);
        const looseRecords = [];
        for (const pattern of patternKeys) {
          const patternValue = convertSchema(patternProps[pattern], ctx);
          const keySchema = z.string().regex(new RegExp(pattern));
          looseRecords.push(z.looseRecord(keySchema, patternValue));
        }
        const schemasToIntersect = [];
        if (Object.keys(shape).length > 0) {
          schemasToIntersect.push(z.object(shape).passthrough());
        }
        schemasToIntersect.push(...looseRecords);
        if (schemasToIntersect.length === 0) {
          zodSchema = z.object({}).passthrough();
        } else if (schemasToIntersect.length === 1) {
          zodSchema = schemasToIntersect[0];
        } else {
          let result = z.intersection(schemasToIntersect[0], schemasToIntersect[1]);
          for (let i = 2; i < schemasToIntersect.length; i++) {
            result = z.intersection(result, schemasToIntersect[i]);
          }
          zodSchema = result;
        }
        break;
      }
      const objectSchema = z.object(shape);
      if (schema.additionalProperties === false) {
        zodSchema = objectSchema.strict();
      } else if (typeof schema.additionalProperties === "object") {
        zodSchema = objectSchema.catchall(convertSchema(schema.additionalProperties, ctx));
      } else {
        zodSchema = objectSchema.passthrough();
      }
      break;
    }
    case "array": {
      const prefixItems = schema.prefixItems;
      const items = schema.items;
      if (prefixItems && Array.isArray(prefixItems)) {
        const tupleItems = prefixItems.map((item) => convertSchema(item, ctx));
        const rest = items && typeof items === "object" && !Array.isArray(items) ? convertSchema(items, ctx) : void 0;
        if (rest) {
          zodSchema = z.tuple(tupleItems).rest(rest);
        } else {
          zodSchema = z.tuple(tupleItems);
        }
        if (typeof schema.minItems === "number") {
          zodSchema = zodSchema.check(z.minLength(schema.minItems));
        }
        if (typeof schema.maxItems === "number") {
          zodSchema = zodSchema.check(z.maxLength(schema.maxItems));
        }
      } else if (Array.isArray(items)) {
        const tupleItems = items.map((item) => convertSchema(item, ctx));
        const rest = schema.additionalItems && typeof schema.additionalItems === "object" ? convertSchema(schema.additionalItems, ctx) : void 0;
        if (rest) {
          zodSchema = z.tuple(tupleItems).rest(rest);
        } else {
          zodSchema = z.tuple(tupleItems);
        }
        if (typeof schema.minItems === "number") {
          zodSchema = zodSchema.check(z.minLength(schema.minItems));
        }
        if (typeof schema.maxItems === "number") {
          zodSchema = zodSchema.check(z.maxLength(schema.maxItems));
        }
      } else if (items !== void 0) {
        const element = convertSchema(items, ctx);
        let arraySchema = z.array(element);
        if (typeof schema.minItems === "number") {
          arraySchema = arraySchema.min(schema.minItems);
        }
        if (typeof schema.maxItems === "number") {
          arraySchema = arraySchema.max(schema.maxItems);
        }
        zodSchema = arraySchema;
      } else {
        zodSchema = z.array(z.any());
      }
      break;
    }
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
  if (schema.description) {
    zodSchema = zodSchema.describe(schema.description);
  }
  if (schema.default !== void 0) {
    zodSchema = zodSchema.default(schema.default);
  }
  return zodSchema;
}
function convertSchema(schema, ctx) {
  if (typeof schema === "boolean") {
    return schema ? z.any() : z.never();
  }
  let baseSchema = convertBaseSchema(schema, ctx);
  const hasExplicitType = schema.type || schema.enum !== void 0 || schema.const !== void 0;
  if (schema.anyOf && Array.isArray(schema.anyOf)) {
    const options = schema.anyOf.map((s) => convertSchema(s, ctx));
    const anyOfUnion = z.union(options);
    baseSchema = hasExplicitType ? z.intersection(baseSchema, anyOfUnion) : anyOfUnion;
  }
  if (schema.oneOf && Array.isArray(schema.oneOf)) {
    const options = schema.oneOf.map((s) => convertSchema(s, ctx));
    const oneOfUnion = z.xor(options);
    baseSchema = hasExplicitType ? z.intersection(baseSchema, oneOfUnion) : oneOfUnion;
  }
  if (schema.allOf && Array.isArray(schema.allOf)) {
    if (schema.allOf.length === 0) {
      baseSchema = hasExplicitType ? baseSchema : z.any();
    } else {
      let result = hasExplicitType ? baseSchema : convertSchema(schema.allOf[0], ctx);
      const startIdx = hasExplicitType ? 0 : 1;
      for (let i = startIdx; i < schema.allOf.length; i++) {
        result = z.intersection(result, convertSchema(schema.allOf[i], ctx));
      }
      baseSchema = result;
    }
  }
  if (schema.nullable === true && ctx.version === "openapi-3.0") {
    baseSchema = z.nullable(baseSchema);
  }
  if (schema.readOnly === true) {
    baseSchema = z.readonly(baseSchema);
  }
  const extraMeta = {};
  const coreMetadataKeys = ["$id", "id", "$comment", "$anchor", "$vocabulary", "$dynamicRef", "$dynamicAnchor"];
  for (const key of coreMetadataKeys) {
    if (key in schema) {
      extraMeta[key] = schema[key];
    }
  }
  const contentMetadataKeys = ["contentEncoding", "contentMediaType", "contentSchema"];
  for (const key of contentMetadataKeys) {
    if (key in schema) {
      extraMeta[key] = schema[key];
    }
  }
  for (const key of Object.keys(schema)) {
    if (!RECOGNIZED_KEYS.has(key)) {
      extraMeta[key] = schema[key];
    }
  }
  if (Object.keys(extraMeta).length > 0) {
    ctx.registry.add(baseSchema, extraMeta);
  }
  return baseSchema;
}
function fromJSONSchema(schema, params) {
  if (typeof schema === "boolean") {
    return schema ? z.any() : z.never();
  }
  const version3 = detectVersion(schema, params?.defaultTarget);
  const defs = schema.$defs || schema.definitions || {};
  const ctx = {
    version: version3,
    defs,
    refs: /* @__PURE__ */ new Map(),
    processing: /* @__PURE__ */ new Set(),
    rootSchema: schema,
    registry: params?.registry ?? globalRegistry
  };
  return convertSchema(schema, ctx);
}
var z, RECOGNIZED_KEYS;
var init_from_json_schema = __esm({
  "../node_modules/zod/v4/classic/from-json-schema.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_registries();
    init_checks2();
    init_iso();
    init_schemas2();
    z = {
      ...schemas_exports2,
      ...checks_exports2,
      iso: iso_exports
    };
    RECOGNIZED_KEYS = /* @__PURE__ */ new Set([
      // Schema identification
      "$schema",
      "$ref",
      "$defs",
      "definitions",
      // Core schema keywords
      "$id",
      "id",
      "$comment",
      "$anchor",
      "$vocabulary",
      "$dynamicRef",
      "$dynamicAnchor",
      // Type
      "type",
      "enum",
      "const",
      // Composition
      "anyOf",
      "oneOf",
      "allOf",
      "not",
      // Object
      "properties",
      "required",
      "additionalProperties",
      "patternProperties",
      "propertyNames",
      "minProperties",
      "maxProperties",
      // Array
      "items",
      "prefixItems",
      "additionalItems",
      "minItems",
      "maxItems",
      "uniqueItems",
      "contains",
      "minContains",
      "maxContains",
      // String
      "minLength",
      "maxLength",
      "pattern",
      "format",
      // Number
      "minimum",
      "maximum",
      "exclusiveMinimum",
      "exclusiveMaximum",
      "multipleOf",
      // Already handled metadata
      "description",
      "default",
      // Content
      "contentEncoding",
      "contentMediaType",
      "contentSchema",
      // Unsupported (error-throwing)
      "unevaluatedItems",
      "unevaluatedProperties",
      "if",
      "then",
      "else",
      "dependentSchemas",
      "dependentRequired",
      // OpenAPI
      "nullable",
      "readOnly"
    ]);
    __name(detectVersion, "detectVersion");
    __name(resolveRef, "resolveRef");
    __name(convertBaseSchema, "convertBaseSchema");
    __name(convertSchema, "convertSchema");
    __name(fromJSONSchema, "fromJSONSchema");
  }
});

// ../node_modules/zod/v4/classic/coerce.js
var coerce_exports = {};
__export(coerce_exports, {
  bigint: () => bigint4,
  boolean: () => boolean3,
  date: () => date4,
  number: () => number3,
  string: () => string3
});
function string3(params) {
  return _coercedString(ZodString, params);
}
function number3(params) {
  return _coercedNumber(ZodNumber, params);
}
function boolean3(params) {
  return _coercedBoolean(ZodBoolean, params);
}
function bigint4(params) {
  return _coercedBigint(ZodBigInt, params);
}
function date4(params) {
  return _coercedDate(ZodDate, params);
}
var init_coerce = __esm({
  "../node_modules/zod/v4/classic/coerce.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_core2();
    init_schemas2();
    __name(string3, "string");
    __name(number3, "number");
    __name(boolean3, "boolean");
    __name(bigint4, "bigint");
    __name(date4, "date");
  }
});

// ../node_modules/zod/v4/classic/external.js
var external_exports = {};
__export(external_exports, {
  $brand: () => $brand,
  $input: () => $input,
  $output: () => $output,
  NEVER: () => NEVER,
  TimePrecision: () => TimePrecision,
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBase64: () => ZodBase64,
  ZodBase64URL: () => ZodBase64URL,
  ZodBigInt: () => ZodBigInt,
  ZodBigIntFormat: () => ZodBigIntFormat,
  ZodBoolean: () => ZodBoolean,
  ZodCIDRv4: () => ZodCIDRv4,
  ZodCIDRv6: () => ZodCIDRv6,
  ZodCUID: () => ZodCUID,
  ZodCUID2: () => ZodCUID2,
  ZodCatch: () => ZodCatch,
  ZodCodec: () => ZodCodec,
  ZodCustom: () => ZodCustom,
  ZodCustomStringFormat: () => ZodCustomStringFormat,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodE164: () => ZodE164,
  ZodEmail: () => ZodEmail,
  ZodEmoji: () => ZodEmoji,
  ZodEnum: () => ZodEnum,
  ZodError: () => ZodError,
  ZodExactOptional: () => ZodExactOptional,
  ZodFile: () => ZodFile,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFunction: () => ZodFunction,
  ZodGUID: () => ZodGUID,
  ZodIPv4: () => ZodIPv4,
  ZodIPv6: () => ZodIPv6,
  ZodISODate: () => ZodISODate,
  ZodISODateTime: () => ZodISODateTime,
  ZodISODuration: () => ZodISODuration,
  ZodISOTime: () => ZodISOTime,
  ZodIntersection: () => ZodIntersection,
  ZodIssueCode: () => ZodIssueCode,
  ZodJWT: () => ZodJWT,
  ZodKSUID: () => ZodKSUID,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMAC: () => ZodMAC,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNanoID: () => ZodNanoID,
  ZodNever: () => ZodNever,
  ZodNonOptional: () => ZodNonOptional,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodNumberFormat: () => ZodNumberFormat,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodPipe: () => ZodPipe,
  ZodPrefault: () => ZodPrefault,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRealError: () => ZodRealError,
  ZodRecord: () => ZodRecord,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodStringFormat: () => ZodStringFormat,
  ZodSuccess: () => ZodSuccess,
  ZodSymbol: () => ZodSymbol,
  ZodTemplateLiteral: () => ZodTemplateLiteral,
  ZodTransform: () => ZodTransform,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodULID: () => ZodULID,
  ZodURL: () => ZodURL,
  ZodUUID: () => ZodUUID,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  ZodXID: () => ZodXID,
  ZodXor: () => ZodXor,
  _ZodString: () => _ZodString,
  _default: () => _default2,
  _function: () => _function,
  any: () => any,
  array: () => array,
  base64: () => base642,
  base64url: () => base64url2,
  bigint: () => bigint3,
  boolean: () => boolean2,
  catch: () => _catch2,
  check: () => check,
  cidrv4: () => cidrv42,
  cidrv6: () => cidrv62,
  clone: () => clone,
  codec: () => codec,
  coerce: () => coerce_exports,
  config: () => config2,
  core: () => core_exports2,
  cuid: () => cuid3,
  cuid2: () => cuid22,
  custom: () => custom,
  date: () => date3,
  decode: () => decode2,
  decodeAsync: () => decodeAsync2,
  describe: () => describe2,
  discriminatedUnion: () => discriminatedUnion,
  e164: () => e1642,
  email: () => email2,
  emoji: () => emoji2,
  encode: () => encode2,
  encodeAsync: () => encodeAsync2,
  endsWith: () => _endsWith,
  enum: () => _enum2,
  exactOptional: () => exactOptional,
  file: () => file,
  flattenError: () => flattenError,
  float32: () => float32,
  float64: () => float64,
  formatError: () => formatError,
  fromJSONSchema: () => fromJSONSchema,
  function: () => _function,
  getErrorMap: () => getErrorMap,
  globalRegistry: () => globalRegistry,
  gt: () => _gt,
  gte: () => _gte,
  guid: () => guid2,
  hash: () => hash,
  hex: () => hex2,
  hostname: () => hostname2,
  httpUrl: () => httpUrl,
  includes: () => _includes,
  instanceof: () => _instanceof,
  int: () => int,
  int32: () => int32,
  int64: () => int64,
  intersection: () => intersection,
  ipv4: () => ipv42,
  ipv6: () => ipv62,
  iso: () => iso_exports,
  json: () => json2,
  jwt: () => jwt,
  keyof: () => keyof,
  ksuid: () => ksuid2,
  lazy: () => lazy,
  length: () => _length,
  literal: () => literal,
  locales: () => locales_exports,
  looseObject: () => looseObject,
  looseRecord: () => looseRecord,
  lowercase: () => _lowercase,
  lt: () => _lt,
  lte: () => _lte,
  mac: () => mac2,
  map: () => map,
  maxLength: () => _maxLength,
  maxSize: () => _maxSize,
  meta: () => meta2,
  mime: () => _mime,
  minLength: () => _minLength,
  minSize: () => _minSize,
  multipleOf: () => _multipleOf,
  nan: () => nan,
  nanoid: () => nanoid2,
  nativeEnum: () => nativeEnum,
  negative: () => _negative,
  never: () => never,
  nonnegative: () => _nonnegative,
  nonoptional: () => nonoptional,
  nonpositive: () => _nonpositive,
  normalize: () => _normalize,
  null: () => _null3,
  nullable: () => nullable,
  nullish: () => nullish2,
  number: () => number2,
  object: () => object,
  optional: () => optional,
  overwrite: () => _overwrite,
  parse: () => parse2,
  parseAsync: () => parseAsync2,
  partialRecord: () => partialRecord,
  pipe: () => pipe,
  positive: () => _positive,
  prefault: () => prefault,
  preprocess: () => preprocess,
  prettifyError: () => prettifyError,
  promise: () => promise,
  property: () => _property,
  readonly: () => readonly,
  record: () => record,
  refine: () => refine,
  regex: () => _regex,
  regexes: () => regexes_exports,
  registry: () => registry,
  safeDecode: () => safeDecode2,
  safeDecodeAsync: () => safeDecodeAsync2,
  safeEncode: () => safeEncode2,
  safeEncodeAsync: () => safeEncodeAsync2,
  safeParse: () => safeParse2,
  safeParseAsync: () => safeParseAsync2,
  set: () => set,
  setErrorMap: () => setErrorMap,
  size: () => _size,
  slugify: () => _slugify,
  startsWith: () => _startsWith,
  strictObject: () => strictObject,
  string: () => string2,
  stringFormat: () => stringFormat,
  stringbool: () => stringbool,
  success: () => success,
  superRefine: () => superRefine,
  symbol: () => symbol,
  templateLiteral: () => templateLiteral,
  toJSONSchema: () => toJSONSchema,
  toLowerCase: () => _toLowerCase,
  toUpperCase: () => _toUpperCase,
  transform: () => transform,
  treeifyError: () => treeifyError,
  trim: () => _trim,
  tuple: () => tuple,
  uint32: () => uint32,
  uint64: () => uint64,
  ulid: () => ulid2,
  undefined: () => _undefined3,
  union: () => union,
  unknown: () => unknown,
  uppercase: () => _uppercase,
  url: () => url,
  util: () => util_exports,
  uuid: () => uuid2,
  uuidv4: () => uuidv4,
  uuidv6: () => uuidv6,
  uuidv7: () => uuidv7,
  void: () => _void2,
  xid: () => xid2,
  xor: () => xor
});
var init_external = __esm({
  "../node_modules/zod/v4/classic/external.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_core2();
    init_schemas2();
    init_checks2();
    init_errors2();
    init_parse2();
    init_compat();
    init_core2();
    init_en();
    init_core2();
    init_json_schema_processors();
    init_from_json_schema();
    init_locales();
    init_iso();
    init_iso();
    init_coerce();
    config2(en_default());
  }
});

// ../node_modules/zod/index.js
var init_zod = __esm({
  "../node_modules/zod/index.js"() {
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_external();
    init_external();
  }
});

// api/admin/applications/[id]/appeals/resolve.ts
var Body, onRequestPost;
var init_resolve = __esm({
  "api/admin/applications/[id]/appeals/resolve.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_admin_auth();
    init_validate();
    init_db();
    init_email();
    init_sms();
    init_escape_html();
    init_form_data();
    init_zod();
    Body = external_exports.object({
      outcome: external_exports.enum(["upheld", "overturned"]),
      notes: external_exports.string().min(10).max(4e3)
    });
    onRequestPost = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      if (auth.admin.role !== "recruitment_admin" && auth.admin.role !== "super_admin") {
        return json({ error: "recruitment_admin role required" }, { status: 403 });
      }
      const body = await parseBody(request, Body);
      if (body.kind === "reject")
        return body.response;
      const app = await first(
        env2,
        "SELECT status, email, form_data FROM applications WHERE id = ?",
        params.id
      );
      if (!app)
        return json({ error: "not found" }, { status: 404 });
      if (app.status !== "appeal_under_review") {
        return json(
          { error: "application is not in appeal review", status: app.status },
          { status: 409 }
        );
      }
      const now = Date.now();
      const newStatus = body.value.outcome === "overturned" ? "vetting_passed" : "appeal_upheld";
      await run(
        env2,
        "INSERT INTO status_transitions (id, application_id, from_status, to_status, actor_email, actor_role, reason, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        `tx_${now}_${Math.random().toString(36).slice(2, 10)}`,
        params.id,
        "appeal_under_review",
        newStatus,
        auth.admin.email,
        auth.admin.role,
        `Appeal ${body.value.outcome}: ${body.value.notes}`,
        now
      );
      await run(env2, "UPDATE applications SET status = ? WHERE id = ?", newStatus, params.id);
      try {
        if (body.value.outcome === "overturned") {
          await sendEmail(env2, {
            to: app.email,
            subject: "OHCS Recruitment \u2014 appeal upheld, application proceeds",
            html: `<p>Your appeal on application <strong>${escapeHtml(params.id)}</strong> has been overturned. You may now proceed to pay the exam fee.</p>`,
            text: `Your appeal on application ${params.id} was overturned. Please pay the exam fee to proceed.`
          });
          const phone = extractPhone(app.form_data);
          if (phone) {
            await sendSms(env2, {
              to: phone,
              message: `OHCS: your appeal on ${params.id} was successful. Pay exam fee to proceed.`
            });
          }
        } else {
          await sendEmail(env2, {
            to: app.email,
            subject: "OHCS Recruitment \u2014 appeal outcome",
            html: `<p>Your appeal on application <strong>${escapeHtml(params.id)}</strong> has been reviewed and the original decision stands.</p><p>Notes: ${escapeHtml(body.value.notes)}</p>`,
            text: `Your appeal on application ${params.id} was upheld. Notes: ${body.value.notes}`
          });
        }
      } catch (err) {
        console.error("appeal notification failed", err);
      }
      return json({ data: { status: newStatus } });
    }, "onRequestPost");
  }
});

// _shared/hash-token.ts
async function hashToken(raw) {
  const enc = new TextEncoder();
  const buf = await crypto.subtle.digest("SHA-256", enc.encode(raw));
  const bytes = new Uint8Array(buf);
  let hex3 = "";
  for (const byte of bytes) {
    hex3 += byte.toString(16).padStart(2, "0");
  }
  return hex3;
}
var init_hash_token = __esm({
  "_shared/hash-token.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(hashToken, "hashToken");
  }
});

// api/admin/auth/magic/[token].ts
var onRequestGet4;
var init_token = __esm({
  "api/admin/auth/magic/[token].ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_db();
    init_hash_token();
    init_admin_session();
    init_admin_cookies();
    onRequestGet4 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const tokenHash = await hashToken(params.token);
      const tokenRow = await first(
        env2,
        "SELECT * FROM admin_magic_tokens WHERE token = ?",
        tokenHash
      );
      if (!tokenRow)
        return json({ error: "token not found" }, { status: 404 });
      const now = Date.now();
      if (tokenRow.used_at)
        return json({ error: "token already used" }, { status: 410 });
      if (tokenRow.expires_at <= now)
        return json({ error: "token expired" }, { status: 410 });
      const ipAddress = request.headers.get("cf-connecting-ip") ?? null;
      const sessionId = await createAdminSession(env2, {
        email: tokenRow.email,
        ipAddress
      });
      await run(env2, "UPDATE admin_magic_tokens SET used_at = ? WHERE token = ?", now, tokenHash);
      await run(env2, "UPDATE admin_users SET last_login_at = ? WHERE email = ?", now, tokenRow.email);
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/admin",
          "Set-Cookie": buildSetAdminSessionCookie(sessionId, ADMIN_SESSION_TTL_MS / 1e3)
        }
      });
    }, "onRequestGet");
  }
});

// api/admin/comms/templates/[id].ts
function requireRecruitmentAdmin(role) {
  return role === "super_admin" || role === "recruitment_admin";
}
var PatchBody, onRequestGet5, onRequestPatch, onRequestDelete;
var init_id2 = __esm({
  "api/admin/comms/templates/[id].ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_admin_auth();
    init_zod();
    PatchBody = external_exports.object({
      name: external_exports.string().min(1).max(120).optional(),
      description: external_exports.string().max(500).optional(),
      subject: external_exports.string().min(1).max(300).optional(),
      body_text: external_exports.string().min(1).max(2e4).optional(),
      body_html: external_exports.string().max(4e4).optional(),
      sms_body: external_exports.string().max(320).optional()
    });
    __name(requireRecruitmentAdmin, "requireRecruitmentAdmin");
    onRequestGet5 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      const row = await first(
        env2,
        "SELECT id, name, description, subject, body_text, body_html, sms_body, created_at, updated_at FROM comm_templates WHERE id = ?",
        params.id
      );
      if (!row)
        return json({ error: "not found" }, { status: 404 });
      return json({ data: row });
    }, "onRequestGet");
    onRequestPatch = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      if (!requireRecruitmentAdmin(auth.admin.role)) {
        return json({ error: "recruitment_admin role required" }, { status: 403 });
      }
      const parsed = await parseBody(request, PatchBody);
      if (parsed.kind === "reject")
        return parsed.response;
      const v = parsed.value;
      const now = Date.now();
      await run(
        env2,
        "UPDATE comm_templates SET name = COALESCE(?, name), description = COALESCE(?, description), subject = COALESCE(?, subject), body_text = COALESCE(?, body_text), body_html = COALESCE(?, body_html), sms_body = COALESCE(?, sms_body), updated_at = ?, updated_by = ? WHERE id = ?",
        v.name ?? null,
        v.description ?? null,
        v.subject ?? null,
        v.body_text ?? null,
        v.body_html ?? null,
        v.sms_body ?? null,
        now,
        auth.admin.email,
        params.id
      );
      return json({ data: { id: params.id } });
    }, "onRequestPatch");
    onRequestDelete = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      if (!requireRecruitmentAdmin(auth.admin.role)) {
        return json({ error: "recruitment_admin role required" }, { status: 403 });
      }
      await run(env2, "DELETE FROM comm_templates WHERE id = ?", params.id);
      return json({ data: { id: params.id, deleted: true } });
    }, "onRequestDelete");
  }
});

// _shared/cookies.ts
function readSessionCookie(request) {
  const header = request.headers.get("Cookie");
  if (!header)
    return null;
  for (const part of header.split(";")) {
    const [name, ...rest] = part.trim().split("=");
    if (name === SESSION_COOKIE)
      return rest.join("=");
  }
  return null;
}
function buildSetSessionCookie(sessionId, maxAgeSeconds) {
  return [
    `${SESSION_COOKIE}=${sessionId}`,
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    "Path=/",
    `Max-Age=${maxAgeSeconds}`
  ].join("; ");
}
function buildClearSessionCookie() {
  return [
    `${SESSION_COOKIE}=`,
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    "Path=/",
    "Max-Age=0"
  ].join("; ");
}
var SESSION_COOKIE;
var init_cookies = __esm({
  "_shared/cookies.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    SESSION_COOKIE = "session_id";
    __name(readSessionCookie, "readSessionCookie");
    __name(buildSetSessionCookie, "buildSetSessionCookie");
    __name(buildClearSessionCookie, "buildClearSessionCookie");
  }
});

// _shared/applicant-session.ts
async function requireApplicant(request, env2) {
  const sessionId = readSessionCookie(request);
  if (!sessionId) {
    return {
      kind: "reject",
      response: json({ error: "authentication required", code: "AUTH_MISSING" }, { status: 401 })
    };
  }
  const now = Date.now();
  const row = await first(
    env2,
    "SELECT s.session_id, s.application_id, s.expires_at, a.exercise_id, a.email, a.status FROM application_sessions s JOIN applications a ON a.id = s.application_id WHERE s.session_id = ? AND s.expires_at > ?",
    sessionId,
    now
  );
  if (!row) {
    return {
      kind: "reject",
      response: json({ error: "session expired or invalid", code: "AUTH_SESSION_INVALID" }, { status: 401 })
    };
  }
  const newExpires = now + SESSION_TTL_SECONDS * 1e3;
  await run(
    env2,
    "UPDATE application_sessions SET last_used_at = ?, expires_at = ? WHERE session_id = ?",
    now,
    newExpires,
    sessionId
  );
  return {
    kind: "ok",
    application: {
      id: row.application_id,
      exercise_id: row.exercise_id,
      email: row.email,
      status: row.status
    },
    session: { session_id: row.session_id, expires_at: newExpires }
  };
}
var SESSION_TTL_SECONDS;
var init_applicant_session = __esm({
  "_shared/applicant-session.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_db();
    init_cookies();
    SESSION_TTL_SECONDS = 7 * 24 * 60 * 60;
    __name(requireApplicant, "requireApplicant");
  }
});

// _shared/file-validate.ts
function sniffMime(head) {
  if (head.length >= 4 && head[0] === 37 && head[1] === 80 && head[2] === 68 && head[3] === 70) {
    return "application/pdf";
  }
  if (head.length >= 3 && head[0] === 255 && head[1] === 216 && head[2] === 255) {
    return "image/jpeg";
  }
  if (head.length >= 8 && head[0] === 137 && head[1] === 80 && head[2] === 78 && head[3] === 71 && head[4] === 13 && head[5] === 10 && head[6] === 26 && head[7] === 10) {
    return "image/png";
  }
  return null;
}
function validateFile(input) {
  if (!input.acceptedMimes.includes(input.claimedMime)) {
    return {
      kind: "reject",
      reason: `mime not accepted: ${input.claimedMime}; expected one of ${input.acceptedMimes.join(", ")}`
    };
  }
  if (input.sizeBytes > input.maxBytes) {
    return {
      kind: "reject",
      reason: `file too large: ${input.sizeBytes} bytes (max ${input.maxBytes})`
    };
  }
  const sniffed = sniffMime(input.head);
  if (sniffed && sniffed !== input.claimedMime) {
    return {
      kind: "reject",
      reason: `mime mismatch: claimed ${input.claimedMime}, sniffed ${sniffed}`
    };
  }
  return { kind: "ok" };
}
var init_file_validate = __esm({
  "_shared/file-validate.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(sniffMime, "sniffMime");
    __name(validateFile, "validateFile");
  }
});

// _shared/r2-keys.ts
function extensionForMime(mime) {
  return MIME_TO_EXT[mime] ?? "bin";
}
function applicationDocKey(exerciseId, applicationId, docTypeId, mime) {
  return `${exerciseId}/${applicationId}/${docTypeId}.${extensionForMime(mime)}`;
}
var MIME_TO_EXT;
var init_r2_keys = __esm({
  "_shared/r2-keys.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    MIME_TO_EXT = {
      "application/pdf": "pdf",
      "image/jpeg": "jpg",
      "image/png": "png"
    };
    __name(extensionForMime, "extensionForMime");
    __name(applicationDocKey, "applicationDocKey");
  }
});

// _shared/ai-verify.ts
var ai_verify_exports = {};
__export(ai_verify_exports, {
  PROMPT_VERSION: () => PROMPT_VERSION,
  verifyDocument: () => verifyDocument
});
function parseVerdict(raw) {
  try {
    const trimmed = raw.trim();
    const stripped = trimmed.replace(/^```(?:json)?\s*/, "").replace(/\s*```$/, "");
    const parsed = JSON.parse(stripped);
    if (typeof parsed.is_valid === "boolean" && typeof parsed.confidence === "number" && typeof parsed.reason === "string") {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}
async function verifyDocument(env2, input) {
  const prompt = PROMPTS[input.checkType];
  let verdict;
  let confidence = null;
  let reason = null;
  try {
    const model = input.mimeType === "application/pdf" ? "@cf/meta/llama-3.1-8b-instruct" : "@cf/llava-hf/llava-1.5-7b-hf";
    const aiResultUnknown = await env2.AI.run(model, {
      prompt,
      max_tokens: 256
    });
    const aiResult = aiResultUnknown;
    const parsed = aiResult.response ? parseVerdict(aiResult.response) : null;
    if (!parsed) {
      verdict = "unchecked";
      reason = "AI response did not parse as expected JSON";
    } else if (parsed.is_valid && parsed.confidence >= CONFIDENCE_THRESHOLD) {
      verdict = "passed";
      confidence = parsed.confidence;
      reason = parsed.reason;
    } else {
      verdict = "flagged";
      confidence = parsed.confidence;
      reason = parsed.reason;
    }
  } catch (err) {
    verdict = "unchecked";
    reason = err instanceof Error ? `AI error: ${err.message}` : "AI error";
  }
  await run(
    env2,
    "UPDATE application_documents SET ai_verdict = ?, ai_confidence = ?, ai_reason = ?, ai_prompt_version = ? WHERE application_id = ? AND document_type_id = ?",
    verdict,
    confidence,
    reason,
    PROMPT_VERSION,
    input.applicationId,
    input.documentTypeId
  );
}
var PROMPT_VERSION, CONFIDENCE_THRESHOLD, PROMPTS;
var init_ai_verify = __esm({
  "_shared/ai-verify.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_db();
    PROMPT_VERSION = "v1-2026-04-23";
    CONFIDENCE_THRESHOLD = 0.75;
    PROMPTS = {
      identity: 'You are inspecting an image to verify it is a Ghana National Identity Card (Ghana Card). Answer ONLY in JSON: {"is_valid": boolean, "confidence": 0.0-1.0, "reason": "<one short sentence>"}. Look for: NIA branding, "REPUBLIC OF GHANA" text, photo of holder, NIA number format (GHA-XXXXXXXXX-X), expiry date, hologram patterns.',
      photo: 'You are inspecting an uploaded image to verify it is a passport-style photograph suitable for a government job application. Answer ONLY in JSON: {"is_valid": boolean, "confidence": 0.0-1.0, "reason": "<one short sentence>"}. Criteria: single human face, front-facing, plain light background, head and shoulders visible, no sunglasses, in focus, well-lit.',
      certificate: 'You are inspecting a document to verify it appears to be an official educational or professional certificate. Answer ONLY in JSON: {"is_valid": boolean, "confidence": 0.0-1.0, "reason": "<one short sentence>"}. Look for: institution name/seal, candidate name, qualification awarded, date of award, signature/stamp.'
    };
    __name(parseVerdict, "parseVerdict");
    __name(verifyDocument, "verifyDocument");
  }
});

// api/applications/me/documents/[docTypeId].ts
async function sha256Hex(bytes) {
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
function sanitiseFilename(raw) {
  return raw.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 100) || "upload";
}
var MB, HEAD_BYTES, onRequestPost2, onRequestDelete2;
var init_docTypeId = __esm({
  "api/applications/me/documents/[docTypeId].ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_db();
    init_applicant_session();
    init_file_validate();
    init_r2_keys();
    MB = 1024 * 1024;
    HEAD_BYTES = 16;
    __name(sha256Hex, "sha256Hex");
    __name(sanitiseFilename, "sanitiseFilename");
    onRequestPost2 = /* @__PURE__ */ __name(async ({
      request,
      env: env2,
      params,
      waitUntil
    }) => {
      const auth = await requireApplicant(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      if (auth.application.status !== "draft") {
        return json(
          { error: "application not editable", status: auth.application.status },
          { status: 409 }
        );
      }
      const reqRow = await first(
        env2,
        "SELECT r.is_required, r.max_mb_override, t.accepted_mimes, t.default_max_mb FROM exercise_document_requirements r JOIN document_types t ON t.id = r.document_type_id WHERE r.exercise_id = ? AND r.document_type_id = ?",
        auth.application.exercise_id,
        params.docTypeId
      );
      if (!reqRow)
        return json({ error: "document type not in this exercise" }, { status: 404 });
      let form;
      try {
        form = await request.formData();
      } catch {
        return json({ error: "multipart body expected" }, { status: 400 });
      }
      const file2 = form.get("file");
      if (!(file2 instanceof File)) {
        return json({ error: 'missing "file" field in multipart body' }, { status: 400 });
      }
      const buf = await file2.arrayBuffer();
      const bytes = new Uint8Array(buf);
      const head = bytes.slice(0, HEAD_BYTES);
      const accepted = JSON.parse(reqRow.accepted_mimes);
      const maxMb = reqRow.max_mb_override ?? reqRow.default_max_mb;
      const validated = validateFile({
        claimedMime: file2.type,
        sizeBytes: file2.size,
        acceptedMimes: accepted,
        maxBytes: maxMb * MB,
        head
      });
      if (validated.kind === "reject")
        return json({ error: validated.reason }, { status: 400 });
      const sha = await sha256Hex(buf);
      const key = applicationDocKey(
        auth.application.exercise_id,
        auth.application.id,
        params.docTypeId,
        file2.type
      );
      const originalFilename = sanitiseFilename(file2.name);
      const existing = await first(
        env2,
        "SELECT r2_key FROM application_documents WHERE application_id = ? AND document_type_id = ?",
        auth.application.id,
        params.docTypeId
      );
      if (existing && existing.r2_key !== key) {
        await env2.UPLOADS.delete(existing.r2_key);
      }
      await env2.UPLOADS.put(key, buf, {
        httpMetadata: {
          contentType: file2.type,
          contentDisposition: `attachment; filename="${originalFilename}"`
        },
        customMetadata: {
          application_id: auth.application.id,
          document_type_id: params.docTypeId,
          sha256: sha
        }
      });
      const id = `doc_${auth.application.id}_${params.docTypeId}`;
      const now = Date.now();
      await run(
        env2,
        "INSERT INTO application_documents (id, application_id, document_type_id, r2_key, original_filename, size_bytes, mime_type, sha256, uploaded_at, ai_verdict, applicant_confirmed) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0) ON CONFLICT(application_id, document_type_id) DO UPDATE SET r2_key=excluded.r2_key, original_filename=excluded.original_filename, size_bytes=excluded.size_bytes, mime_type=excluded.mime_type, sha256=excluded.sha256, uploaded_at=excluded.uploaded_at, ai_verdict=excluded.ai_verdict, ai_reason=NULL, ai_confidence=NULL, ai_prompt_version=NULL, manual_flag=NULL, applicant_confirmed=0",
        id,
        auth.application.id,
        params.docTypeId,
        key,
        originalFilename,
        file2.size,
        file2.type,
        sha,
        now,
        "unchecked"
      );
      const docTypeRow = await first(
        env2,
        "SELECT ai_check_type FROM document_types WHERE id = ?",
        params.docTypeId
      );
      if (docTypeRow?.ai_check_type) {
        const { verifyDocument: verifyDocument2 } = await Promise.resolve().then(() => (init_ai_verify(), ai_verify_exports));
        waitUntil(
          verifyDocument2(env2, {
            applicationId: auth.application.id,
            documentTypeId: params.docTypeId,
            checkType: docTypeRow.ai_check_type,
            r2Key: key,
            mimeType: file2.type
          }).catch((err) => console.error("ai-verify failed", err))
        );
      }
      return json(
        {
          data: {
            id,
            document_type_id: params.docTypeId,
            original_filename: originalFilename,
            size_bytes: file2.size,
            mime_type: file2.type,
            sha256: sha,
            uploaded_at: now,
            ai_verdict: "unchecked"
          }
        },
        { status: 201 }
      );
    }, "onRequestPost");
    onRequestDelete2 = /* @__PURE__ */ __name(async ({
      request,
      env: env2,
      params
    }) => {
      const auth = await requireApplicant(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      if (auth.application.status !== "draft") {
        return json(
          { error: "application not editable", status: auth.application.status },
          { status: 409 }
        );
      }
      const existing = await first(
        env2,
        "SELECT r2_key FROM application_documents WHERE application_id = ? AND document_type_id = ?",
        auth.application.id,
        params.docTypeId
      );
      if (existing) {
        await env2.UPLOADS.delete(existing.r2_key);
        await run(
          env2,
          "DELETE FROM application_documents WHERE application_id = ? AND document_type_id = ?",
          auth.application.id,
          params.docTypeId
        );
      }
      return new Response(null, { status: 204 });
    }, "onRequestDelete");
  }
});

// api/portal/auth/magic/[token].ts
var onRequestGet6;
var init_token2 = __esm({
  "api/portal/auth/magic/[token].ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_db();
    init_hash_token();
    init_admin_session();
    init_admin_cookies();
    onRequestGet6 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const tokenHash = await hashToken(params.token);
      const tokenRow = await first(
        env2,
        "SELECT token, email, expires_at, used_at FROM admin_magic_tokens WHERE token = ?",
        tokenHash
      );
      if (!tokenRow)
        return json({ error: { code: "NOT_FOUND", message: "token not found" } }, { status: 404 });
      const now = Date.now();
      if (tokenRow.used_at)
        return json({ error: { code: "TOKEN_USED", message: "token already used" } }, { status: 410 });
      if (tokenRow.expires_at <= now)
        return json({ error: { code: "TOKEN_EXPIRED", message: "token expired" } }, { status: 410 });
      const user = await first(
        env2,
        "SELECT email FROM users WHERE email = ? AND active = 1",
        tokenRow.email
      );
      if (!user)
        return json({ error: { code: "AUTH_FORBIDDEN", message: "no portal account for this email" } }, { status: 403 });
      const ipAddress = request.headers.get("cf-connecting-ip") ?? null;
      const sessionId = await createAdminSession(env2, { email: tokenRow.email, ipAddress });
      await run(env2, "UPDATE admin_magic_tokens SET used_at = ? WHERE token = ?", now, tokenHash);
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/portal",
          "Set-Cookie": buildSetAdminSessionCookie(sessionId, ADMIN_SESSION_TTL_MS / 1e3)
        }
      });
    }, "onRequestGet");
  }
});

// api/public/certificates/verify/[code].ts
var onRequestGet7;
var init_code = __esm({
  "api/public/certificates/verify/[code].ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_db();
    onRequestGet7 = /* @__PURE__ */ __name(async ({ env: env2, params }) => {
      const row = await first(
        env2,
        "SELECT c.title, c.serial, c.issued_at, a.name AS auditor_name FROM certificates c JOIN auditors a ON a.id = c.auditor_id WHERE c.verify_code = ?",
        params.code
      );
      if (!row) {
        return json({ data: { valid: false } });
      }
      return json({
        data: {
          valid: true,
          title: row.title,
          serial: row.serial,
          issuedAt: row.issued_at,
          auditorName: row.auditor_name
        }
      });
    }, "onRequestGet");
  }
});

// api/admin/applications/[id]/claim.ts
var CLAIM_TTL_MS, onRequestPost3, onRequestDelete3;
var init_claim = __esm({
  "api/admin/applications/[id]/claim.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_admin_auth();
    init_db();
    CLAIM_TTL_MS = 30 * 60 * 1e3;
    onRequestPost3 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      const now = Date.now();
      const row = await first(
        env2,
        "SELECT review_claimed_by, review_claimed_at, status FROM applications WHERE id = ?",
        params.id
      );
      if (!row)
        return json({ error: "not found" }, { status: 404 });
      if (row.status !== "submitted" && row.status !== "under_review") {
        return json(
          { error: "application is not in a reviewable state", status: row.status },
          { status: 409 }
        );
      }
      if (row.review_claimed_by && row.review_claimed_by !== auth.admin.email && row.review_claimed_at !== null && now - row.review_claimed_at < CLAIM_TTL_MS) {
        return json(
          {
            error: "already claimed",
            claimed_by: row.review_claimed_by,
            claimed_at: row.review_claimed_at
          },
          { status: 409 }
        );
      }
      await run(
        env2,
        "UPDATE applications SET review_claimed_by = ?, review_claimed_at = ?, status = ? WHERE id = ?",
        auth.admin.email,
        now,
        "under_review",
        params.id
      );
      if (row.status === "submitted") {
        await run(
          env2,
          "INSERT INTO status_transitions (id, application_id, from_status, to_status, actor_email, actor_role, reason, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          `tx_${now}_${Math.random().toString(36).slice(2, 10)}`,
          params.id,
          "submitted",
          "under_review",
          auth.admin.email,
          auth.admin.role,
          "Reviewer claimed application",
          now
        );
      }
      return json({ data: { claimed_by: auth.admin.email, claimed_at: now } });
    }, "onRequestPost");
    onRequestDelete3 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      await run(
        env2,
        "UPDATE applications SET review_claimed_by = NULL, review_claimed_at = NULL WHERE id = ? AND review_claimed_by = ?",
        params.id,
        auth.admin.email
      );
      return new Response(null, { status: 204 });
    }, "onRequestDelete");
  }
});

// api/admin/applications/[id]/vetting.ts
function rollUp(decisions) {
  if (decisions.some((d) => d.decision === "rejected"))
    return "vetting_failed";
  if (decisions.some((d) => d.decision === "needs_better_scan"))
    return "requires_action";
  return "vetting_passed";
}
function genId(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}
var Body2, onRequestPost4;
var init_vetting = __esm({
  "api/admin/applications/[id]/vetting.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_admin_auth();
    init_validate();
    init_db();
    init_email();
    init_sms();
    init_escape_html();
    init_form_data();
    init_zod();
    Body2 = external_exports.object({
      document_decisions: external_exports.array(
        external_exports.object({
          document_type_id: external_exports.string().min(1),
          decision: external_exports.enum(["accepted", "rejected", "needs_better_scan"]),
          reason: external_exports.string().max(2e3).optional()
        })
      ).min(1).refine(
        (arr) => arr.every((d) => d.decision === "accepted" || d.reason && d.reason.trim().length > 0),
        { message: "reason required for non-accepted decisions" }
      ),
      notes: external_exports.string().max(2e3).optional()
    });
    __name(rollUp, "rollUp");
    __name(genId, "genId");
    onRequestPost4 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      const app = await first(
        env2,
        "SELECT status, exercise_id, email, form_data FROM applications WHERE id = ?",
        params.id
      );
      if (!app)
        return json({ error: "not found" }, { status: 404 });
      if (app.status !== "under_review") {
        return json(
          { error: "application is not under review", status: app.status },
          { status: 409 }
        );
      }
      const body = await parseBody(request, Body2);
      if (body.kind === "reject")
        return body.response;
      const v = body.value;
      const outcome = rollUp(v.document_decisions);
      const now = Date.now();
      for (const d of v.document_decisions) {
        await run(
          env2,
          "INSERT INTO document_review_decisions (id, application_id, document_type_id, reviewer_email, decision, reason, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
          genId("drd"),
          params.id,
          d.document_type_id,
          auth.admin.email,
          d.decision,
          d.reason ?? null,
          now
        );
      }
      await run(
        env2,
        "INSERT INTO application_review_decisions (id, application_id, reviewer_email, outcome, notes, created_at) VALUES (?, ?, ?, ?, ?, ?)",
        genId("ard"),
        params.id,
        auth.admin.email,
        outcome,
        v.notes ?? null,
        now
      );
      await run(
        env2,
        "INSERT INTO status_transitions (id, application_id, from_status, to_status, actor_email, actor_role, reason, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        genId("tx"),
        params.id,
        "under_review",
        outcome,
        auth.admin.email,
        auth.admin.role,
        `Vetting decision: ${outcome}`,
        now
      );
      await run(
        env2,
        "UPDATE applications SET status = ?, review_claimed_by = NULL, review_claimed_at = NULL WHERE id = ?",
        outcome,
        params.id
      );
      try {
        if (outcome === "vetting_passed") {
          await sendEmail(env2, {
            to: app.email,
            subject: "OHCS Recruitment \u2014 vetting passed, please pay exam fee",
            html: `<p>Your application <strong>${escapeHtml(params.id)}</strong> has passed initial review.</p><p>To proceed to the examination, please pay the exam fee. The payment portal will open soon.</p>`,
            text: `Your application ${params.id} has passed initial review. Please pay the exam fee to proceed.`
          });
          const phone = extractPhone(app.form_data);
          if (phone) {
            await sendSms(env2, {
              to: phone,
              message: `OHCS: your application ${params.id} has passed vetting. Pay your exam fee to proceed.`
            });
          }
        } else if (outcome === "vetting_failed") {
          const notesHtml = v.notes ? escapeHtml(v.notes) : "(no overall notes)";
          await sendEmail(env2, {
            to: app.email,
            subject: "OHCS Recruitment \u2014 vetting outcome",
            html: `<p>Your application <strong>${escapeHtml(params.id)}</strong> was not successful at vetting.</p><p>Notes: ${notesHtml}</p><p>You may submit an appeal within the appeal window.</p>`,
            text: `Your application ${params.id} was not successful at vetting. Notes: ${v.notes ?? "(none)"}`
          });
        } else {
          const reasonsList = v.document_decisions.filter((d) => d.decision !== "accepted").map(
            (d) => `<li><strong>${escapeHtml(d.document_type_id)}</strong>: ${escapeHtml(d.reason ?? "")}</li>`
          ).join("");
          await sendEmail(env2, {
            to: app.email,
            subject: "OHCS Recruitment \u2014 additional information needed",
            html: `<p>Your application <strong>${escapeHtml(params.id)}</strong> needs additional information before vetting can complete:</p><ul>${reasonsList}</ul>`,
            text: `Your application ${params.id} needs additional information. Please re-upload the indicated documents.`
          });
        }
      } catch (err) {
        console.error("vetting notification failed", err);
      }
      return json({ data: { outcome } });
    }, "onRequestPost");
  }
});

// ../src/types/recruitment.ts
function rowToDocumentType(row) {
  return {
    id: row.id,
    label: row.label,
    description: row.description,
    default_max_mb: row.default_max_mb,
    accepted_mimes: JSON.parse(row.accepted_mimes),
    ai_check_type: row.ai_check_type,
    is_active: row.is_active === 1,
    created_at: row.created_at,
    updated_at: row.updated_at
  };
}
function rowToRequirement(row) {
  return {
    id: row.id,
    exercise_id: row.exercise_id,
    document_type_id: row.document_type_id,
    is_required: row.is_required === 1,
    conditional_on: row.conditional_on ?? null,
    display_order: row.display_order,
    max_mb_override: row.max_mb_override
  };
}
var init_recruitment = __esm({
  "../src/types/recruitment.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(rowToDocumentType, "rowToDocumentType");
    __name(rowToRequirement, "rowToRequirement");
  }
});

// api/admin/exercises/[id]/requirements.ts
var RequirementInput, PutSchema, onRequestGet8, onRequestPut;
var init_requirements = __esm({
  "api/admin/exercises/[id]/requirements.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_admin_auth();
    init_validate();
    init_db();
    init_zod();
    init_recruitment();
    RequirementInput = external_exports.object({
      document_type_id: external_exports.string().min(1),
      is_required: external_exports.boolean(),
      conditional_on: external_exports.enum(["has_professional_qualification", "is_pwd"]).nullable(),
      display_order: external_exports.number().int().nonnegative(),
      max_mb_override: external_exports.number().int().min(1).max(50).nullable()
    });
    PutSchema = external_exports.object({
      requirements: external_exports.array(RequirementInput).max(50).refine(
        (rs) => new Set(rs.map((r) => r.document_type_id)).size === rs.length,
        { message: "duplicate document_type_id in requirements list" }
      )
    });
    onRequestGet8 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      const rows = await all(
        env2,
        "SELECT * FROM exercise_document_requirements WHERE exercise_id = ? ORDER BY display_order ASC",
        params.id
      );
      return json({ data: rows.map(rowToRequirement) });
    }, "onRequestGet");
    onRequestPut = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      const body = await parseBody(request, PutSchema);
      if (body.kind === "reject")
        return body.response;
      const v = body.value;
      const now = Date.now();
      await run(env2, "DELETE FROM exercise_document_requirements WHERE exercise_id = ?", params.id);
      for (const r of v.requirements) {
        const id = `edr_${params.id}_${r.document_type_id}`;
        await run(
          env2,
          "INSERT INTO exercise_document_requirements (id, exercise_id, document_type_id, is_required, conditional_on, display_order, max_mb_override, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
          id,
          params.id,
          r.document_type_id,
          r.is_required ? 1 : 0,
          r.conditional_on,
          r.display_order,
          r.max_mb_override,
          now,
          now
        );
      }
      return json({ data: { count: v.requirements.length, exercise_id: params.id } });
    }, "onRequestPut");
  }
});

// _shared/session-auth.ts
async function readPortalSession(env2, sessionId) {
  const now = Date.now();
  const row = await first(
    env2,
    "SELECT s.session_id, s.created_at, s.expires_at, u.id AS user_id, u.email, u.name, u.role, u.mda_id FROM admin_sessions s JOIN users u ON u.email = s.email WHERE s.session_id = ? AND s.expires_at > ? AND u.active = 1",
    sessionId,
    now
  );
  if (!row)
    return null;
  if (now - row.created_at > ADMIN_SESSION_HARD_CAP_MS) {
    await run(env2, "DELETE FROM admin_sessions WHERE session_id = ?", sessionId);
    return null;
  }
  await run(
    env2,
    "UPDATE admin_sessions SET last_used_at = ?, expires_at = ? WHERE session_id = ?",
    now,
    now + ADMIN_SESSION_TTL_MS,
    sessionId
  );
  return {
    id: row.user_id,
    email: row.email,
    name: row.name,
    role: row.role,
    mdaId: row.mda_id
  };
}
async function requireSession(request, env2, allowedRoles) {
  const sessionId = parseAdminSessionId(request);
  if (!sessionId) {
    return {
      kind: "reject",
      response: json({ error: { code: "AUTH_MISSING", message: "authentication required" } }, { status: 401 })
    };
  }
  const user = await readPortalSession(env2, sessionId);
  if (!user) {
    return {
      kind: "reject",
      response: json({ error: { code: "AUTH_MISSING", message: "authentication required" } }, { status: 401 })
    };
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return {
      kind: "reject",
      response: json({ error: { code: "AUTH_FORBIDDEN", message: "insufficient role" } }, { status: 403 })
    };
  }
  return { kind: "ok", user };
}
var init_session_auth = __esm({
  "_shared/session-auth.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_db();
    init_admin_cookies();
    init_admin_session();
    __name(readPortalSession, "readPortalSession");
    __name(requireSession, "requireSession");
  }
});

// _shared/time.ts
function nowIso() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
var init_time = __esm({
  "_shared/time.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(nowIso, "nowIso");
  }
});

// _shared/audit-log.ts
async function writeAuditLog(env2, entry) {
  await run(
    env2,
    "INSERT INTO audit_log (id, user_id, action, entity, entity_id, meta_json, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
    crypto.randomUUID(),
    entry.userId,
    entry.action,
    entry.entity,
    entry.entityId,
    entry.meta ? JSON.stringify(entry.meta) : null,
    nowIso()
  );
}
var init_audit_log = __esm({
  "_shared/audit-log.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_db();
    init_time();
    __name(writeAuditLog, "writeAuditLog");
  }
});

// api/admin/registry/[id]/certificates.ts
function generateVerifyCode() {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  let code = "";
  for (const b of bytes)
    code += CODE_ALPHABET[b % CODE_ALPHABET.length];
  return code;
}
var ROLES, CODE_ALPHABET, Body3, onRequestPost5;
var init_certificates = __esm({
  "api/admin/registry/[id]/certificates.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_session_auth();
    init_audit_log();
    init_time();
    init_zod();
    ROLES = ["admin", "director"];
    CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    Body3 = external_exports.object({
      title: external_exports.string().min(1).max(300),
      issued_at: external_exports.string().max(40).optional()
    });
    __name(generateVerifyCode, "generateVerifyCode");
    onRequestPost5 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireSession(request, env2, ROLES);
      if (auth.kind === "reject")
        return auth.response;
      const parsed = await parseBody(request, Body3);
      if (parsed.kind === "reject")
        return parsed.response;
      const v = parsed.value;
      const auditor = await first(env2, "SELECT id FROM auditors WHERE id = ?", params.id);
      if (!auditor) {
        return json({ error: { code: "NOT_FOUND", message: "auditor not found" } }, { status: 404 });
      }
      const year = (/* @__PURE__ */ new Date()).getUTCFullYear();
      const seq = await first(
        env2,
        "SELECT COUNT(*) AS n FROM certificates WHERE serial LIKE ?",
        `IAD-CERT-${year}-%`
      );
      const serial = `IAD-CERT-${year}-${String((seq?.n ?? 0) + 1).padStart(4, "0")}`;
      const id = crypto.randomUUID();
      const verifyCode = generateVerifyCode();
      await run(
        env2,
        "INSERT INTO certificates (id, auditor_id, title, serial, verify_code, issued_at) VALUES (?, ?, ?, ?, ?, ?)",
        id,
        params.id,
        v.title,
        serial,
        verifyCode,
        v.issued_at ?? nowIso()
      );
      await writeAuditLog(env2, {
        userId: auth.user.id,
        action: "create",
        entity: "certificate",
        entityId: id,
        meta: { auditor_id: params.id, serial }
      });
      return json({ data: { id, serial, verify_code: verifyCode } }, { status: 201 });
    }, "onRequestPost");
  }
});

// api/admin/registry/[id]/cpd.ts
var ROLES2, Body4, onRequestPost6;
var init_cpd = __esm({
  "api/admin/registry/[id]/cpd.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_session_auth();
    init_audit_log();
    init_zod();
    ROLES2 = ["admin", "director"];
    Body4 = external_exports.object({
      activity: external_exports.string().min(1).max(300),
      points: external_exports.number().int().min(0).max(500),
      year: external_exports.number().int().min(1990).max(2100),
      source: external_exports.string().max(200).optional()
    });
    onRequestPost6 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireSession(request, env2, ROLES2);
      if (auth.kind === "reject")
        return auth.response;
      const parsed = await parseBody(request, Body4);
      if (parsed.kind === "reject")
        return parsed.response;
      const v = parsed.value;
      const auditor = await first(env2, "SELECT id FROM auditors WHERE id = ?", params.id);
      if (!auditor) {
        return json({ error: { code: "NOT_FOUND", message: "auditor not found" } }, { status: 404 });
      }
      const id = crypto.randomUUID();
      await run(
        env2,
        "INSERT INTO cpd_records (id, auditor_id, activity, points, year, source) VALUES (?, ?, ?, ?, ?, ?)",
        id,
        params.id,
        v.activity,
        v.points,
        v.year,
        v.source ?? null
      );
      await writeAuditLog(env2, {
        userId: auth.user.id,
        action: "create",
        entity: "cpd_record",
        entityId: id,
        meta: { auditor_id: params.id, year: v.year, points: v.points }
      });
      return json({ data: { id } }, { status: 201 });
    }, "onRequestPost");
  }
});

// api/admin/registry/[id]/credentials.ts
var ROLES3, Body5, onRequestPost7;
var init_credentials = __esm({
  "api/admin/registry/[id]/credentials.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_session_auth();
    init_audit_log();
    init_zod();
    ROLES3 = ["admin", "director"];
    Body5 = external_exports.object({
      body: external_exports.enum(["FCCA", "ACCA", "IIA", "CITG", "ICA-GH", "OTHER"]),
      designation: external_exports.string().min(1).max(200),
      year: external_exports.number().int().min(1950).max(2100).optional(),
      verified: external_exports.boolean().optional()
    });
    onRequestPost7 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireSession(request, env2, ROLES3);
      if (auth.kind === "reject")
        return auth.response;
      const parsed = await parseBody(request, Body5);
      if (parsed.kind === "reject")
        return parsed.response;
      const v = parsed.value;
      const auditor = await first(env2, "SELECT id FROM auditors WHERE id = ?", params.id);
      if (!auditor) {
        return json({ error: { code: "NOT_FOUND", message: "auditor not found" } }, { status: 404 });
      }
      const id = crypto.randomUUID();
      await run(
        env2,
        "INSERT INTO credentials (id, auditor_id, body, designation, year, verified) VALUES (?, ?, ?, ?, ?, ?)",
        id,
        params.id,
        v.body,
        v.designation,
        v.year ?? null,
        v.verified ? 1 : 0
      );
      await writeAuditLog(env2, {
        userId: auth.user.id,
        action: "create",
        entity: "credential",
        entityId: id,
        meta: { auditor_id: params.id, body: v.body }
      });
      return json({ data: { id } }, { status: 201 });
    }, "onRequestPost");
  }
});

// _shared/portal-access.ts
function hasFullAccess(role) {
  return role === "admin" || role === "director" || role === "manager";
}
async function auditorEngagementIds(env2, userId) {
  const rows = await all(
    env2,
    "SELECT id FROM engagements WHERE lead_auditor_id = ? UNION SELECT engagement_id AS id FROM engagement_team WHERE user_id = ?",
    userId,
    userId
  );
  return new Set(rows.map((r) => r.id));
}
async function canAccessEngagement(env2, user, engagementId) {
  if (hasFullAccess(user.role))
    return true;
  if (user.role === "auditor") {
    return (await auditorEngagementIds(env2, user.id)).has(engagementId);
  }
  return false;
}
async function liaisonOwnsFinding(env2, user, findingId) {
  if (user.role !== "mda_liaison" || !user.mdaId)
    return false;
  const row = await first(
    env2,
    "SELECT f.id FROM findings f JOIN audit_universe au ON au.id = f.universe_id WHERE f.id = ? AND au.mda_name = ?",
    findingId,
    user.mdaId
  );
  return row !== null;
}
async function canAccessFinding(env2, user, finding) {
  if (hasFullAccess(user.role))
    return true;
  if (user.role === "auditor")
    return canAccessEngagement(env2, user, finding.engagement_id);
  return false;
}
var init_portal_access = __esm({
  "_shared/portal-access.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_db();
    __name(hasFullAccess, "hasFullAccess");
    __name(auditorEngagementIds, "auditorEngagementIds");
    __name(canAccessEngagement, "canAccessEngagement");
    __name(liaisonOwnsFinding, "liaisonOwnsFinding");
    __name(canAccessFinding, "canAccessFinding");
  }
});

// api/portal/engagements/[id]/papers.ts
var ROLES4, ACCEPTED_MIMES, MAX_BYTES, onRequestPost8;
var init_papers = __esm({
  "api/portal/engagements/[id]/papers.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_db();
    init_session_auth();
    init_portal_access();
    init_file_validate();
    init_r2_keys();
    init_audit_log();
    init_time();
    ROLES4 = ["admin", "director", "manager", "auditor"];
    ACCEPTED_MIMES = ["application/pdf", "image/jpeg", "image/png"];
    MAX_BYTES = 10 * 1024 * 1024;
    onRequestPost8 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireSession(request, env2, ROLES4);
      if (auth.kind === "reject")
        return auth.response;
      const engagement = await first(
        env2,
        "SELECT id FROM engagements WHERE id = ?",
        params.id
      );
      if (!engagement) {
        return json({ error: { code: "NOT_FOUND", message: "engagement not found" } }, { status: 404 });
      }
      if (!await canAccessEngagement(env2, auth.user, params.id)) {
        return json({ error: { code: "AUTH_FORBIDDEN", message: "no access to this engagement" } }, { status: 403 });
      }
      let form;
      try {
        form = await request.formData();
      } catch {
        return json({ error: { code: "VALIDATION", message: "multipart form-data required" } }, { status: 400 });
      }
      const title2 = form.get("title");
      const file2 = form.get("file");
      if (typeof title2 !== "string" || title2.trim().length === 0 || title2.length > 300) {
        return json({ error: { code: "VALIDATION", message: "title is required (max 300 chars)" } }, { status: 400 });
      }
      if (!(file2 instanceof File)) {
        return json({ error: { code: "VALIDATION", message: "file is required" } }, { status: 400 });
      }
      const buf = new Uint8Array(await file2.arrayBuffer());
      const verdict = validateFile({
        claimedMime: file2.type,
        sizeBytes: buf.byteLength,
        acceptedMimes: ACCEPTED_MIMES,
        maxBytes: MAX_BYTES,
        head: buf.slice(0, 16)
      });
      if (verdict.kind === "reject") {
        return json({ error: { code: "VALIDATION", message: verdict.reason } }, { status: 400 });
      }
      const id = crypto.randomUUID();
      const r2Key = `working-papers/${params.id}/${id}.${extensionForMime(file2.type)}`;
      await env2.UPLOADS.put(r2Key, buf, { httpMetadata: { contentType: file2.type } });
      await run(
        env2,
        "INSERT INTO working_papers (id, engagement_id, title, r2_key, uploaded_by, created_at) VALUES (?, ?, ?, ?, ?, ?)",
        id,
        params.id,
        title2.trim(),
        r2Key,
        auth.user.id,
        nowIso()
      );
      await writeAuditLog(env2, {
        userId: auth.user.id,
        action: "create",
        entity: "working_paper",
        entityId: id,
        meta: { engagement_id: params.id, r2_key: r2Key }
      });
      return json({ data: { id, r2_key: r2Key } }, { status: 201 });
    }, "onRequestPost");
  }
});

// _shared/notify.ts
async function createNotification(env2, userId, type, payload) {
  await run(
    env2,
    "INSERT INTO notifications (id, user_id, type, payload_json, read, created_at) VALUES (?, ?, ?, ?, 0, ?)",
    crypto.randomUUID(),
    userId,
    type,
    JSON.stringify(payload),
    nowIso()
  );
}
async function notifyRoles(env2, roles, type, payload) {
  const placeholders = roles.map(() => "?").join(",");
  const users = await all(
    env2,
    `SELECT id FROM users WHERE active = 1 AND role IN (${placeholders})`,
    ...roles
  );
  for (const u of users) {
    await createNotification(env2, u.id, type, payload);
  }
}
async function notifyEngagementTeam(env2, engagementId, type, payload) {
  const users = await all(
    env2,
    "SELECT lead_auditor_id AS id FROM engagements WHERE id = ? AND lead_auditor_id IS NOT NULL UNION SELECT user_id AS id FROM engagement_team WHERE engagement_id = ?",
    engagementId,
    engagementId
  );
  for (const u of users) {
    await createNotification(env2, u.id, type, payload);
  }
}
async function flipOverdueRecommendations(env2) {
  const today = nowIso().slice(0, 10);
  const due = await all(
    env2,
    "SELECT id, finding_id FROM recommendations WHERE status IN ('open','in_progress') AND due_date < ?",
    today
  );
  for (const rec of due) {
    await run(env2, "UPDATE recommendations SET status = 'overdue' WHERE id = ?", rec.id);
  }
  return due.map((r) => r.id);
}
var init_notify = __esm({
  "_shared/notify.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_db();
    init_time();
    __name(createNotification, "createNotification");
    __name(notifyRoles, "notifyRoles");
    __name(notifyEngagementTeam, "notifyEngagementTeam");
    __name(flipOverdueRecommendations, "flipOverdueRecommendations");
  }
});

// api/portal/engagements/[id]/team.ts
var WRITE_ROLES, Body6, onRequestPost9;
var init_team = __esm({
  "api/portal/engagements/[id]/team.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_session_auth();
    init_notify();
    init_audit_log();
    init_zod();
    WRITE_ROLES = ["admin", "director", "manager"];
    Body6 = external_exports.object({
      user_id: external_exports.string().min(1),
      team_role: external_exports.string().min(1).max(80)
    });
    onRequestPost9 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireSession(request, env2, WRITE_ROLES);
      if (auth.kind === "reject")
        return auth.response;
      const parsed = await parseBody(request, Body6);
      if (parsed.kind === "reject")
        return parsed.response;
      const v = parsed.value;
      const engagement = await first(
        env2,
        "SELECT id, code, title FROM engagements WHERE id = ?",
        params.id
      );
      if (!engagement) {
        return json({ error: { code: "NOT_FOUND", message: "engagement not found" } }, { status: 404 });
      }
      const member = await first(
        env2,
        "SELECT id FROM users WHERE id = ? AND active = 1",
        v.user_id
      );
      if (!member) {
        return json({ error: { code: "NOT_FOUND", message: "user not found" } }, { status: 404 });
      }
      await run(
        env2,
        "INSERT OR IGNORE INTO engagement_team (engagement_id, user_id, team_role) VALUES (?, ?, ?)",
        params.id,
        v.user_id,
        v.team_role
      );
      await createNotification(env2, v.user_id, "engagement_assigned", {
        engagement_id: params.id,
        code: engagement.code,
        title: engagement.title,
        role: v.team_role
      });
      await writeAuditLog(env2, {
        userId: auth.user.id,
        action: "update",
        entity: "engagement_team",
        entityId: params.id,
        meta: { added_user_id: v.user_id, team_role: v.team_role }
      });
      return json({ data: { engagement_id: params.id, user_id: v.user_id } }, { status: 201 });
    }, "onRequestPost");
  }
});

// api/portal/findings/[id]/recommendations.ts
var Body7, onRequestPost10;
var init_recommendations = __esm({
  "api/portal/findings/[id]/recommendations.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_session_auth();
    init_portal_access();
    init_audit_log();
    init_time();
    init_zod();
    Body7 = external_exports.object({
      text: external_exports.string().min(1).max(5e3),
      owner: external_exports.string().min(1).max(200),
      due_date: external_exports.string().min(4).max(40)
    });
    onRequestPost10 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireSession(request, env2, ["admin", "director", "manager", "auditor"]);
      if (auth.kind === "reject")
        return auth.response;
      const parsed = await parseBody(request, Body7);
      if (parsed.kind === "reject")
        return parsed.response;
      const v = parsed.value;
      const finding = await first(
        env2,
        "SELECT id, engagement_id FROM findings WHERE id = ?",
        params.id
      );
      if (!finding) {
        return json({ error: { code: "NOT_FOUND", message: "finding not found" } }, { status: 404 });
      }
      if (!await canAccessFinding(env2, auth.user, finding)) {
        return json({ error: { code: "AUTH_FORBIDDEN", message: "no access to this finding" } }, { status: 403 });
      }
      const id = crypto.randomUUID();
      await run(
        env2,
        `INSERT INTO recommendations (id, finding_id, text, owner, due_date, status, created_at)
     VALUES (?, ?, ?, ?, ?, 'open', ?)`,
        id,
        params.id,
        v.text,
        v.owner,
        v.due_date,
        nowIso()
      );
      await writeAuditLog(env2, {
        userId: auth.user.id,
        action: "create",
        entity: "recommendation",
        entityId: id,
        meta: { finding_id: params.id, due_date: v.due_date }
      });
      return json({ data: { id } }, { status: 201 });
    }, "onRequestPost");
  }
});

// api/portal/findings/[id]/responses.ts
var Body8, onRequestGet9, onRequestPost11;
var init_responses = __esm({
  "api/portal/findings/[id]/responses.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_session_auth();
    init_portal_access();
    init_notify();
    init_audit_log();
    init_time();
    init_zod();
    Body8 = external_exports.object({
      recommendation_id: external_exports.string().optional(),
      respondent_name: external_exports.string().min(1).max(200),
      response_text: external_exports.string().min(1).max(1e4),
      action_plan: external_exports.string().max(1e4).optional(),
      evidence_r2_key: external_exports.string().max(500).optional()
    });
    onRequestGet9 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireSession(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      const finding = await first(
        env2,
        "SELECT id, engagement_id, status, closed_at FROM findings WHERE id = ?",
        params.id
      );
      if (!finding) {
        return json({ error: { code: "NOT_FOUND", message: "finding not found" } }, { status: 404 });
      }
      const allowed = await canAccessFinding(env2, auth.user, finding) || await liaisonOwnsFinding(env2, auth.user, params.id);
      if (!allowed) {
        return json({ error: { code: "AUTH_FORBIDDEN", message: "no access to this finding" } }, { status: 403 });
      }
      const responses = await all(
        env2,
        `SELECT id, finding_id, recommendation_id, respondent_name, mda_name, response_text, action_plan, evidence_r2_key, submitted_at
     FROM management_responses WHERE finding_id = ? ORDER BY submitted_at DESC`,
        params.id
      );
      return json({ data: responses });
    }, "onRequestGet");
    onRequestPost11 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireSession(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      const user = auth.user;
      const parsed = await parseBody(request, Body8);
      if (parsed.kind === "reject")
        return parsed.response;
      const v = parsed.value;
      const finding = await first(
        env2,
        `SELECT f.id, f.engagement_id, f.status, f.closed_at, f.title, au.mda_name
     FROM findings f JOIN audit_universe au ON au.id = f.universe_id
     WHERE f.id = ?`,
        params.id
      );
      if (!finding) {
        return json({ error: { code: "NOT_FOUND", message: "finding not found" } }, { status: 404 });
      }
      const isLiaison = user.role === "mda_liaison";
      if (isLiaison) {
        if (!user.mdaId || user.mdaId !== finding.mda_name) {
          return json(
            { error: { code: "AUTH_FORBIDDEN", message: "this finding does not belong to your MDA" } },
            { status: 403 }
          );
        }
      } else if (!hasFullAccess(user.role)) {
        return json({ error: { code: "AUTH_FORBIDDEN", message: "insufficient role" } }, { status: 403 });
      }
      if (v.recommendation_id) {
        const rec = await first(
          env2,
          "SELECT id FROM recommendations WHERE id = ? AND finding_id = ?",
          v.recommendation_id,
          params.id
        );
        if (!rec) {
          return json(
            { error: { code: "NOT_FOUND", message: "recommendation not found on this finding" } },
            { status: 404 }
          );
        }
      }
      const id = crypto.randomUUID();
      const now = nowIso();
      await run(
        env2,
        `INSERT INTO management_responses
       (id, finding_id, recommendation_id, respondent_name, mda_name, response_text, action_plan, evidence_r2_key, submitted_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        id,
        params.id,
        v.recommendation_id ?? null,
        v.respondent_name,
        finding.mda_name,
        v.response_text,
        v.action_plan ?? null,
        v.evidence_r2_key ?? null,
        now
      );
      if (finding.status === "open") {
        await run(env2, "UPDATE findings SET status = 'responded' WHERE id = ?", params.id);
      }
      await notifyRoles(env2, ["director", "manager"], "response_submitted", {
        finding_id: params.id,
        finding_title: finding.title,
        mda_name: finding.mda_name,
        respondent_name: v.respondent_name
      });
      await writeAuditLog(env2, {
        userId: user.id,
        action: "create",
        entity: "management_response",
        entityId: id,
        meta: { finding_id: params.id, mda_name: finding.mda_name }
      });
      return json({ data: { id } }, { status: 201 });
    }, "onRequestPost");
  }
});

// api/portal/plans/[id]/items.ts
var WRITE_ROLES2, Body9, onRequestPost12;
var init_items = __esm({
  "api/portal/plans/[id]/items.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_session_auth();
    init_audit_log();
    init_zod();
    WRITE_ROLES2 = ["admin", "director", "manager"];
    Body9 = external_exports.object({
      universe_id: external_exports.string().min(1),
      quarter: external_exports.enum(["Q1", "Q2", "Q3", "Q4"]),
      priority: external_exports.enum(["high", "medium", "low"]),
      status: external_exports.enum(["planned", "in_progress", "done", "deferred"]).optional()
    });
    onRequestPost12 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireSession(request, env2, WRITE_ROLES2);
      if (auth.kind === "reject")
        return auth.response;
      const parsed = await parseBody(request, Body9);
      if (parsed.kind === "reject")
        return parsed.response;
      const v = parsed.value;
      const plan = await first(env2, "SELECT id FROM audit_plans WHERE id = ?", params.id);
      if (!plan) {
        return json({ error: { code: "NOT_FOUND", message: "plan not found" } }, { status: 404 });
      }
      const universe = await first(
        env2,
        "SELECT id FROM audit_universe WHERE id = ?",
        v.universe_id
      );
      if (!universe) {
        return json({ error: { code: "NOT_FOUND", message: "universe entry not found" } }, { status: 404 });
      }
      const id = crypto.randomUUID();
      await run(
        env2,
        "INSERT INTO plan_items (id, plan_id, universe_id, quarter, priority, status) VALUES (?, ?, ?, ?, ?, ?)",
        id,
        params.id,
        v.universe_id,
        v.quarter,
        v.priority,
        v.status ?? "planned"
      );
      await writeAuditLog(env2, {
        userId: auth.user.id,
        action: "create",
        entity: "plan_item",
        entityId: id,
        meta: { plan_id: params.id, universe_id: v.universe_id }
      });
      return json({ data: { id } }, { status: 201 });
    }, "onRequestPost");
  }
});

// api/admin/applications/appeals.ts
var onRequestGet10;
var init_appeals = __esm({
  "api/admin/applications/appeals.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_admin_auth();
    init_db();
    onRequestGet10 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      if (auth.admin.role !== "recruitment_admin" && auth.admin.role !== "super_admin") {
        return json({ error: "recruitment_admin role required" }, { status: 403 });
      }
      const rows = await all(
        env2,
        "SELECT a.id, a.exercise_id, a.email, a.status, a.submitted_at, a.appeal_submitted_at FROM applications a WHERE a.status = ? AND NOT EXISTS (SELECT 1 FROM application_review_decisions ard WHERE ard.application_id = a.id AND ard.reviewer_email = ? AND ard.created_at = (SELECT MAX(created_at) FROM application_review_decisions WHERE application_id = a.id)) ORDER BY a.appeal_submitted_at ASC",
        "appeal_under_review",
        auth.admin.email
      );
      return json({ data: rows });
    }, "onRequestGet");
  }
});

// api/admin/auth/logout.ts
var onRequestPost13;
var init_logout = __esm({
  "api/admin/auth/logout.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_admin_cookies();
    init_admin_session();
    init_json();
    onRequestPost13 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const sessionId = parseAdminSessionId(request);
      if (sessionId)
        await deleteAdminSession(env2, sessionId);
      return json({ data: { ok: true } }, {
        headers: {
          "Set-Cookie": buildClearAdminSessionCookie()
        }
      });
    }, "onRequestPost");
  }
});

// api/admin/auth/me.ts
var onRequestGet11;
var init_me = __esm({
  "api/admin/auth/me.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_admin_cookies();
    init_admin_session();
    onRequestGet11 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const sessionId = parseAdminSessionId(request);
      if (!sessionId)
        return json({ error: "unauthenticated" }, { status: 401 });
      const session = await readAdminSession(env2, sessionId);
      if (!session)
        return json({ error: "unauthenticated" }, { status: 401 });
      return json({ data: { email: session.email, role: session.role } });
    }, "onRequestGet");
  }
});

// _shared/admin-magic-link-email.ts
function adminMagicLinkEmail(resumeUrl, ttlMinutes = 15) {
  const subject = "OHCS Admin Sign-In Link \u2014 action required";
  const html = `<!doctype html><html><body style="font-family: Arial, sans-serif; color: #1a1a1a; line-height: 1.5; max-width: 580px; margin: 0 auto; padding: 24px;">
<p style="font-size: 18px; font-weight: bold; color: #1B5E20;">OHCS Admin Sign-In</p>
<p>Click the link below to sign in to the OHCS Admin Portal. This link is valid for <strong>${ttlMinutes} minutes</strong> and can be used <strong>once</strong>.</p>
<p style="margin: 24px 0;"><a href="${resumeUrl}" style="background:#1B5E20;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;">Sign in to OHCS Admin</a></p>
<p style="font-size: 13px; color: #5C5549;">If you did not request this link, please ignore this email and notify the OHCS IT team. No further action is required \u2014 the link will expire automatically.</p>
<hr style="border: none; border-top: 1px solid #E5DDD0; margin: 24px 0;">
<p style="font-size: 12px; color: #5C5549;">Office of the Head of the Civil Service \xB7 Republic of Ghana</p>
</body></html>`;
  const text = `OHCS Admin Sign-In

Click the link below to sign in to the OHCS Admin Portal. Valid for ${ttlMinutes} minutes, single-use.

${resumeUrl}

If you did not request this link, please ignore this email and notify the OHCS IT team.

Office of the Head of the Civil Service \xB7 Republic of Ghana`;
  return { subject, html, text };
}
var init_admin_magic_link_email = __esm({
  "_shared/admin-magic-link-email.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(adminMagicLinkEmail, "adminMagicLinkEmail");
  }
});

// api/admin/auth/start.ts
function generateToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
var TOKEN_TTL_MS, TOKEN_TTL_MIN, RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX, Body10, onRequestPost14;
var init_start = __esm({
  "api/admin/auth/start.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_email();
    init_hash_token();
    init_admin_magic_link_email();
    init_zod();
    TOKEN_TTL_MS = 15 * 60 * 1e3;
    TOKEN_TTL_MIN = 15;
    RATE_LIMIT_WINDOW_MS = 15 * 60 * 1e3;
    RATE_LIMIT_MAX = 3;
    Body10 = external_exports.object({
      email: external_exports.string().email().toLowerCase()
    });
    __name(generateToken, "generateToken");
    onRequestPost14 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const parsed = await parseBody(request, Body10);
      if (parsed.kind === "reject")
        return parsed.response;
      const { email: email3 } = parsed.value;
      const now = Date.now();
      let admin = await first(
        env2,
        "SELECT email FROM admin_users WHERE email = ? AND is_active = 1",
        email3
      );
      if (!admin) {
        admin = await first(
          env2,
          "SELECT email FROM users WHERE email = ? AND active = 1",
          email3
        );
      }
      if (!admin) {
        return json({ data: { sent: true } });
      }
      const recent = await first(
        env2,
        "SELECT COUNT(*) AS n FROM admin_magic_tokens WHERE email = ? AND created_at > ?",
        email3,
        now - RATE_LIMIT_WINDOW_MS
      );
      if (recent && recent.n >= RATE_LIMIT_MAX) {
        return json(
          { error: "too many sign-in requests; please try again later" },
          { status: 429, headers: { "retry-after": String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1e3)) } }
        );
      }
      const token = generateToken();
      const tokenHash = await hashToken(token);
      const ipAddress = request.headers.get("cf-connecting-ip") ?? null;
      await run(
        env2,
        "INSERT INTO admin_magic_tokens (token, email, created_at, expires_at, ip_address) VALUES (?, ?, ?, ?, ?)",
        tokenHash,
        email3,
        now,
        now + TOKEN_TTL_MS,
        ipAddress
      );
      const origin = new URL(request.url).origin;
      const resumeUrl = `${origin}/api/admin/auth/magic/${encodeURIComponent(token)}`;
      const body = adminMagicLinkEmail(resumeUrl, TOKEN_TTL_MIN);
      try {
        await sendEmail(env2, { to: email3, subject: body.subject, html: body.html, text: body.text });
      } catch (err) {
        console.error("admin magic link email failed", err);
        return json({ error: "email send failed" }, { status: 502 });
      }
      return json({ data: { sent: true } });
    }, "onRequestPost");
  }
});

// api/admin/comms/audience-count.ts
var onRequestGet12;
var init_audience_count = __esm({
  "api/admin/comms/audience-count.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_db();
    init_admin_auth();
    onRequestGet12 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      const url2 = new URL(request.url);
      const status = url2.searchParams.get("status");
      if (!status)
        return json({ error: "status required" }, { status: 400 });
      if (status === "single") {
        const applicationId = url2.searchParams.get("application_id");
        if (!applicationId)
          return json({ error: "application_id required for single" }, { status: 400 });
        const row2 = await first(
          env2,
          "SELECT COUNT(*) AS n FROM applications WHERE id = ?",
          applicationId
        );
        return json({ data: { count: row2?.n ?? 0 } });
      }
      const exerciseId = url2.searchParams.get("exercise_id");
      if (!exerciseId)
        return json({ error: "exercise_id required" }, { status: 400 });
      const row = await first(
        env2,
        "SELECT COUNT(*) AS n FROM applications WHERE exercise_id = ? AND status = ?",
        exerciseId,
        status
      );
      return json({ data: { count: row?.n ?? 0 } });
    }, "onRequestGet");
  }
});

// _shared/audience-resolver.ts
async function resolveAudience(env2, filter) {
  if (filter.kind === "single") {
    const row = await first(
      env2,
      "SELECT id, email, form_data FROM applications WHERE id = ?",
      filter.applicationId
    );
    return row ? [toRecipient(row)] : [];
  }
  const rows = await all(
    env2,
    "SELECT id, email, form_data FROM applications WHERE exercise_id = ? AND status = ?",
    filter.exerciseId,
    filter.status
  );
  return rows.map(toRecipient);
}
function toRecipient(row) {
  return {
    applicationId: row.id,
    email: row.email,
    phone: extractPhone(row.form_data),
    fullName: extractFullName(row.form_data)
  };
}
var init_audience_resolver = __esm({
  "_shared/audience-resolver.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_db();
    init_form_data();
    __name(resolveAudience, "resolveAudience");
    __name(toRecipient, "toRecipient");
  }
});

// _shared/placeholder-substitute.ts
function substitutePlaceholders(template, ctx, isHtml) {
  return template.replace(PLACEHOLDER_RE, (match2, key) => {
    if (!(key in ctx))
      return match2;
    const value = ctx[key];
    const str = value === null ? "" : String(value);
    return isHtml ? escapeHtml(str) : str;
  });
}
var PLACEHOLDER_RE;
var init_placeholder_substitute = __esm({
  "_shared/placeholder-substitute.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_escape_html();
    PLACEHOLDER_RE = /\{\{(\w+)\}\}/g;
    __name(substitutePlaceholders, "substitutePlaceholders");
  }
});

// ../src/lib/application-status.ts
function getStatusLabel(status) {
  return APPLICATION_STATUS_LABELS[status] ?? FALLBACK_LABEL(status);
}
var APPLICATION_STATUS_LABELS, FALLBACK_LABEL;
var init_application_status = __esm({
  "../src/lib/application-status.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    APPLICATION_STATUS_LABELS = {
      draft: "Draft",
      submitted: "Submitted",
      under_review: "Under Review",
      vetting_passed: "Vetting Passed",
      vetting_failed: "Vetting Failed",
      requires_action: "Awaiting Resubmit",
      appeal_under_review: "Appeal Under Review",
      appeal_overturned: "Appeal Overturned",
      appeal_upheld: "Appeal Upheld",
      awaiting_payment: "Awaiting Payment",
      paid: "Paid",
      exam_scheduled: "Exam Scheduled",
      exam_completed: "Exam Completed",
      exam_passed: "Exam Passed",
      exam_failed: "Exam Failed",
      interview_scheduled: "Interview Scheduled",
      interview_completed: "Interview Completed",
      shortlisted: "Shortlisted",
      waitlisted: "Waitlisted",
      appointed: "Appointed",
      rejected: "Rejected"
    };
    FALLBACK_LABEL = /* @__PURE__ */ __name((s) => s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), "FALLBACK_LABEL");
    __name(getStatusLabel, "getStatusLabel");
  }
});

// api/admin/comms/campaigns/index.ts
function genId2(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}
function recruitmentAdmin(role) {
  return role === "super_admin" || role === "recruitment_admin";
}
var Body11, AUDIENCE_CAP, RATE_LIMIT_WINDOW_MS2, RATE_LIMIT_MAX2, onRequestPost15, onRequestGet13;
var init_campaigns = __esm({
  "api/admin/comms/campaigns/index.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_admin_auth();
    init_email();
    init_sms();
    init_audience_resolver();
    init_placeholder_substitute();
    init_application_status();
    init_zod();
    Body11 = external_exports.object({
      exercise_id: external_exports.string().optional(),
      application_id: external_exports.string().optional(),
      status: external_exports.string().min(1).max(60),
      send_sms: external_exports.boolean(),
      template_id: external_exports.string().optional(),
      subject: external_exports.string().min(1).max(300),
      body_text: external_exports.string().min(1).max(2e4),
      body_html: external_exports.string().max(4e4).optional(),
      sms_body: external_exports.string().max(320).optional()
    }).refine(
      (v) => v.status === "single" ? !!v.application_id : !!v.exercise_id,
      { message: "exercise_id required (or application_id when status=single)" }
    );
    AUDIENCE_CAP = 50;
    RATE_LIMIT_WINDOW_MS2 = 5 * 60 * 1e3;
    RATE_LIMIT_MAX2 = 3;
    __name(genId2, "genId");
    __name(recruitmentAdmin, "recruitmentAdmin");
    onRequestPost15 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      if (!recruitmentAdmin(auth.admin.role)) {
        return json({ error: "recruitment_admin role required" }, { status: 403 });
      }
      const parsed = await parseBody(request, Body11);
      if (parsed.kind === "reject")
        return parsed.response;
      const v = parsed.value;
      const now = Date.now();
      const recent = await first(
        env2,
        "SELECT COUNT(*) AS n FROM comm_campaigns WHERE sender_email = ? AND created_at > ?",
        auth.admin.email,
        now - RATE_LIMIT_WINDOW_MS2
      );
      if (recent && recent.n >= RATE_LIMIT_MAX2) {
        return json(
          { error: "too many campaigns; please wait 5 minutes" },
          { status: 429, headers: { "retry-after": String(Math.ceil(RATE_LIMIT_WINDOW_MS2 / 1e3)) } }
        );
      }
      let exerciseName = "";
      if (v.status !== "single" && v.exercise_id) {
        const ex = await first(
          env2,
          "SELECT name FROM recruitment_exercises WHERE id = ?",
          v.exercise_id
        );
        exerciseName = ex?.name ?? "";
      }
      const recipients = v.status === "single" ? await resolveAudience(env2, { kind: "single", applicationId: v.application_id }) : await resolveAudience(env2, {
        kind: "status",
        exerciseId: v.exercise_id,
        status: v.status
      });
      if (recipients.length > AUDIENCE_CAP) {
        return json(
          {
            error: `audience too large (${recipients.length}); cap is ${AUDIENCE_CAP}. Narrow the filter.`
          },
          { status: 400 }
        );
      }
      const smsActive = v.send_sms && !!env2.HUBTEL_SMS_API_KEY;
      const campaignId = genId2("camp");
      let sentCount = 0;
      let failedCount = 0;
      let smsSentCount = 0;
      let smsFailedCount = 0;
      for (const r of recipients) {
        const ctx = {
          name: r.fullName ?? r.email.split("@")[0] ?? r.email,
          email: r.email,
          reference_number: r.applicationId,
          exercise_name: exerciseName,
          status: getStatusLabel(v.status),
          appeal_deadline: null
        };
        const subject = substitutePlaceholders(v.subject, ctx, false);
        const bodyText = substitutePlaceholders(v.body_text, ctx, false);
        const bodyHtml = v.body_html ? substitutePlaceholders(v.body_html, ctx, true) : void 0;
        const smsBody = v.sms_body ? substitutePlaceholders(v.sms_body, ctx, false) : void 0;
        let emailStatus = "sent";
        let emailError = null;
        try {
          await sendEmail(env2, {
            to: r.email,
            subject,
            html: bodyHtml ?? `<p>${bodyText.replace(/\n/g, "</p><p>")}</p>`,
            text: bodyText
          });
          sentCount += 1;
        } catch (err) {
          emailStatus = "failed";
          emailError = err instanceof Error ? err.message : String(err);
          failedCount += 1;
        }
        let smsStatus = null;
        let smsError = null;
        if (smsActive && r.phone && smsBody) {
          try {
            await sendSms(env2, { to: r.phone, message: smsBody });
            smsStatus = "sent";
            smsSentCount += 1;
          } catch (err) {
            smsStatus = "failed";
            smsError = err instanceof Error ? err.message : String(err);
            smsFailedCount += 1;
          }
        }
        await run(
          env2,
          "INSERT INTO comm_campaign_recipients (id, campaign_id, application_id, email, phone, email_status, email_error, sms_status, sms_error, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          genId2("crec"),
          campaignId,
          r.applicationId,
          r.email,
          r.phone,
          emailStatus,
          emailError,
          smsStatus,
          smsError,
          now
        );
      }
      await run(
        env2,
        "INSERT INTO comm_campaigns (id, template_id, exercise_id, status_filter, recipient_count, sent_count, failed_count, sms_requested, sms_sent_count, sms_failed_count, subject, body_text, body_html, sms_body, sender_email, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        campaignId,
        v.template_id ?? null,
        v.exercise_id ?? "(single)",
        v.status,
        recipients.length,
        sentCount,
        failedCount,
        smsActive ? 1 : 0,
        smsSentCount,
        smsFailedCount,
        v.subject,
        v.body_text,
        v.body_html ?? null,
        v.sms_body ?? null,
        auth.admin.email,
        now
      );
      return json({
        data: {
          campaign_id: campaignId,
          recipient_count: recipients.length,
          sent_count: sentCount,
          failed_count: failedCount,
          sms_requested: smsActive,
          sms_sent_count: smsSentCount,
          sms_failed_count: smsFailedCount
        }
      });
    }, "onRequestPost");
    onRequestGet13 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      const url2 = new URL(request.url);
      const exerciseId = url2.searchParams.get("exercise_id");
      if (!exerciseId)
        return json({ error: "exercise_id required" }, { status: 400 });
      const rows = await all(
        env2,
        "SELECT id, template_id, exercise_id, status_filter, recipient_count, sent_count, failed_count, sms_requested, sms_sent_count, sms_failed_count, subject, sender_email, created_at FROM comm_campaigns WHERE exercise_id = ? ORDER BY created_at DESC",
        exerciseId
      );
      return json({ data: rows });
    }, "onRequestGet");
  }
});

// api/admin/comms/templates/index.ts
function genId3() {
  return `tpl_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}
var Body12, onRequestGet14, onRequestPost16;
var init_templates = __esm({
  "api/admin/comms/templates/index.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_admin_auth();
    init_zod();
    Body12 = external_exports.object({
      name: external_exports.string().min(1).max(120),
      description: external_exports.string().max(500).optional(),
      subject: external_exports.string().min(1).max(300),
      body_text: external_exports.string().min(1).max(2e4),
      body_html: external_exports.string().max(4e4).optional(),
      sms_body: external_exports.string().max(320).optional()
    });
    __name(genId3, "genId");
    onRequestGet14 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      const rows = await all(
        env2,
        "SELECT id, name, description, subject, body_text, body_html, sms_body, created_at, updated_at FROM comm_templates ORDER BY name ASC"
      );
      return json({ data: rows });
    }, "onRequestGet");
    onRequestPost16 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      if (auth.admin.role !== "super_admin" && auth.admin.role !== "recruitment_admin") {
        return json({ error: "recruitment_admin role required" }, { status: 403 });
      }
      const parsed = await parseBody(request, Body12);
      if (parsed.kind === "reject")
        return parsed.response;
      const v = parsed.value;
      const now = Date.now();
      const id = genId3();
      await run(
        env2,
        "INSERT INTO comm_templates (id, name, description, subject, body_text, body_html, sms_body, created_at, created_by, updated_at, updated_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        id,
        v.name,
        v.description ?? null,
        v.subject,
        v.body_text,
        v.body_html ?? null,
        v.sms_body ?? null,
        now,
        auth.admin.email,
        now,
        auth.admin.email
      );
      return json({ data: { id, name: v.name } }, { status: 201 });
    }, "onRequestPost");
  }
});

// api/admin/dev/test-email.ts
var Body13, onRequestPost17;
var init_test_email = __esm({
  "api/admin/dev/test-email.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_admin_auth();
    init_validate();
    init_email();
    init_zod();
    Body13 = external_exports.object({
      to: external_exports.string().email()
    });
    onRequestPost17 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      const parsed = await parseBody(request, Body13);
      if (parsed.kind === "reject")
        return parsed.response;
      const html = `
    <p>Hello,</p>
    <p>This is a test message from the OHCS Recruitment system, sent via the
    <strong>${env2.EMAIL_PROVIDER ?? "auto"}</strong> email transport
    (<code>${env2.EMAIL_FROM}</code>).</p>
    <p>If you received this, the magic-link delivery path is wired
    correctly and Phase 2 can ship.</p>
    <p>\u2014 OHCS Recruitment</p>
  `;
      try {
        await sendEmail(env2, {
          to: parsed.value.to,
          subject: "OHCS Recruitment \u2014 email pipeline test",
          html,
          text: `OHCS Recruitment email pipeline test. If you received this, the magic-link delivery path is wired correctly. Sent via ${env2.EMAIL_PROVIDER ?? "auto"} from ${env2.EMAIL_FROM}.`
        });
        return json({ data: { sent: true, to: parsed.value.to, provider: env2.EMAIL_PROVIDER ?? "auto" } });
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return json({ error: "send failed", detail: message }, { status: 500 });
      }
    }, "onRequestPost");
  }
});

// api/applications/me/appeals.ts
var APPEALABLE, onRequestPost18;
var init_appeals2 = __esm({
  "api/applications/me/appeals.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_applicant_session();
    init_zod();
    APPEALABLE = /* @__PURE__ */ new Set(["vetting_failed", "exam_failed", "rejected"]);
    onRequestPost18 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireApplicant(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      if (!APPEALABLE.has(auth.application.status)) {
        return json(
          { error: "application is not in an appealable state", status: auth.application.status },
          { status: 409 }
        );
      }
      const Body21 = external_exports.object({ reason: external_exports.string().min(20).max(4e3) });
      const body = await parseBody(request, Body21);
      if (body.kind === "reject")
        return body.response;
      const now = Date.now();
      await run(
        env2,
        "INSERT INTO status_transitions (id, application_id, from_status, to_status, actor_email, actor_role, reason, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        `tx_${now}_${Math.random().toString(36).slice(2, 10)}`,
        auth.application.id,
        auth.application.status,
        "appeal_under_review",
        auth.application.email,
        "applicant",
        "Appeal submitted",
        now
      );
      await run(
        env2,
        "UPDATE applications SET status = ?, appeal_submitted_at = ?, appeal_reason = ? WHERE id = ?",
        "appeal_under_review",
        now,
        body.value.reason,
        auth.application.id
      );
      return json({ data: { status: "appeal_under_review" } });
    }, "onRequestPost");
  }
});

// api/applications/me/logout.ts
var onRequestPost19;
var init_logout2 = __esm({
  "api/applications/me/logout.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_db();
    init_cookies();
    onRequestPost19 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const sid = readSessionCookie(request);
      if (sid) {
        await run(env2, "DELETE FROM application_sessions WHERE session_id = ?", sid);
      }
      const res = json({ data: { logged_out: true } });
      res.headers.set("Set-Cookie", buildClearSessionCookie());
      return res;
    }, "onRequestPost");
  }
});

// api/applications/me/requirements.ts
var onRequestGet15;
var init_requirements2 = __esm({
  "api/applications/me/requirements.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_db();
    init_applicant_session();
    onRequestGet15 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireApplicant(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      const flags2 = await first(
        env2,
        "SELECT has_professional_qualification, is_pwd FROM applications WHERE id = ?",
        auth.application.id
      );
      if (!flags2)
        return json({ error: "application not found" }, { status: 404 });
      const reqs = await all(
        env2,
        "SELECT r.document_type_id, r.is_required, r.conditional_on, r.display_order, r.max_mb_override, t.label, t.description, t.default_max_mb, t.accepted_mimes, t.ai_check_type FROM exercise_document_requirements r JOIN document_types t ON t.id = r.document_type_id WHERE r.exercise_id = ? ORDER BY r.display_order ASC",
        auth.application.exercise_id
      );
      const uploads = await all(
        env2,
        "SELECT id, document_type_id, original_filename, size_bytes, mime_type, sha256, uploaded_at, ai_verdict, ai_reason, applicant_confirmed FROM application_documents WHERE application_id = ?",
        auth.application.id
      );
      const uploadByType = new Map(uploads.map((u) => [u.document_type_id, u]));
      const hasPro = flags2.has_professional_qualification === 1;
      const isPwd = flags2.is_pwd === 1;
      const requirements = reqs.map((r) => {
        const conditional = r.conditional_on ?? null;
        const visible = conditional === null ? true : conditional === "has_professional_qualification" ? hasPro : conditional === "is_pwd" ? isPwd : true;
        const u = uploadByType.get(r.document_type_id);
        return {
          document_type_id: r.document_type_id,
          label: r.label,
          description: r.description,
          is_required: r.is_required === 1,
          conditional_on: conditional,
          display_order: r.display_order,
          max_mb: r.max_mb_override ?? r.default_max_mb,
          accepted_mimes: JSON.parse(r.accepted_mimes),
          ai_check_type: r.ai_check_type,
          upload: u ? {
            id: u.id,
            document_type_id: u.document_type_id,
            original_filename: u.original_filename,
            size_bytes: u.size_bytes,
            mime_type: u.mime_type,
            sha256: u.sha256,
            uploaded_at: u.uploaded_at,
            ai_verdict: u.ai_verdict,
            ai_reason: u.ai_reason,
            applicant_confirmed: u.applicant_confirmed === 1
          } : null,
          visible
        };
      });
      const data = {
        exercise_id: auth.application.exercise_id,
        has_professional_qualification: hasPro,
        is_pwd: isPwd,
        requirements
      };
      return json({ data });
    }, "onRequestGet");
  }
});

// _shared/submit-email.ts
function submitEmail(referenceNumber, trackUrl) {
  const subject = `OHCS Recruitment \u2014 application ${referenceNumber} received`;
  const html = `
    <div style="font-family: system-ui, -apple-system, Segoe UI, sans-serif; color: #1a1a1a; max-width: 560px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #006633; margin: 0 0 16px;">Application received</h2>
      <p>Thank you for applying. We've received your application and it will move into screening shortly.</p>
      <p style="margin: 24px 0;">
        <strong>Reference number:</strong>
        <span style="font-family: ui-monospace, monospace; background: #f3f4f6; padding: 4px 8px; border-radius: 4px;">${referenceNumber}</span>
      </p>
      <p>You can check status any time at:</p>
      <p style="margin: 16px 0;"><a href="${trackUrl}" style="color: #006633;">${trackUrl}</a></p>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;">
      <p style="color: #6b7280; font-size: 13px;">Keep this email for your records. OHCS will contact you on the address you provided if you are shortlisted.</p>
    </div>`;
  const text = `OHCS Recruitment \u2014 application received

Reference number: ${referenceNumber}

Check status: ${trackUrl}

Keep this email for your records. OHCS will contact you on the address you provided if you are shortlisted.`;
  return { subject, html, text };
}
var init_submit_email = __esm({
  "_shared/submit-email.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(submitEmail, "submitEmail");
  }
});

// api/applications/me/submit.ts
var onRequestPost20;
var init_submit = __esm({
  "api/applications/me/submit.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_db();
    init_applicant_session();
    init_email();
    init_submit_email();
    onRequestPost20 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireApplicant(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      if (auth.application.status !== "draft") {
        return json(
          { error: "application is not in draft", status: auth.application.status },
          { status: 409 }
        );
      }
      const row = await first(
        env2,
        "SELECT has_professional_qualification, is_pwd, form_data FROM applications WHERE id = ?",
        auth.application.id
      );
      if (!row)
        return json({ error: "application not found" }, { status: 404 });
      const formData = row.form_data ? JSON.parse(row.form_data) : {};
      const declaration = formData.declaration;
      if (!declaration || declaration.agreed !== true) {
        return json({ error: "declaration must be agreed" }, { status: 400 });
      }
      const reqs = await all(
        env2,
        "SELECT document_type_id, is_required, conditional_on FROM exercise_document_requirements WHERE exercise_id = ? AND is_required = 1",
        auth.application.exercise_id
      );
      const hasPro = row.has_professional_qualification === 1;
      const isPwd = row.is_pwd === 1;
      const requiredNow = reqs.filter((r) => {
        if (r.conditional_on === null)
          return true;
        if (r.conditional_on === "has_professional_qualification")
          return hasPro;
        if (r.conditional_on === "is_pwd")
          return isPwd;
        return true;
      });
      const uploads = await all(
        env2,
        "SELECT document_type_id FROM application_documents WHERE application_id = ?",
        auth.application.id
      );
      const uploaded = new Set(uploads.map((u) => u.document_type_id));
      const missing = requiredNow.filter((r) => !uploaded.has(r.document_type_id)).map((r) => r.document_type_id);
      if (missing.length > 0) {
        return json({ error: "required documents missing", missing }, { status: 400 });
      }
      const now = Date.now();
      await run(
        env2,
        "INSERT INTO status_transitions (id, application_id, from_status, to_status, actor_email, actor_role, reason, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        `tx_${now}_${Math.random().toString(36).slice(2, 10)}`,
        auth.application.id,
        "draft",
        "submitted",
        auth.application.email,
        "applicant",
        "Application submitted",
        now
      );
      await run(
        env2,
        "UPDATE applications SET status = ?, submitted_at = ? WHERE id = ?",
        "submitted",
        now,
        auth.application.id
      );
      try {
        const origin = new URL(request.url).origin;
        const trackUrl = `${origin}/track/?ref=${encodeURIComponent(auth.application.id)}`;
        const body = submitEmail(auth.application.id, trackUrl);
        await sendEmail(env2, {
          to: auth.application.email,
          subject: body.subject,
          html: body.html,
          text: body.text
        });
      } catch (err) {
        console.error("submit confirmation email failed", err);
      }
      return json({
        data: { reference_number: auth.application.id, status: "submitted", submitted_at: now }
      });
    }, "onRequestPost");
  }
});

// api/portal/auth/logout.ts
var onRequestPost21;
var init_logout3 = __esm({
  "api/portal/auth/logout.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_admin_cookies();
    init_admin_session();
    init_json();
    onRequestPost21 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const sessionId = parseAdminSessionId(request);
      if (sessionId)
        await deleteAdminSession(env2, sessionId);
      return json(
        { data: { ok: true } },
        { headers: { "Set-Cookie": buildClearAdminSessionCookie() } }
      );
    }, "onRequestPost");
  }
});

// api/portal/auth/me.ts
var onRequestGet16;
var init_me2 = __esm({
  "api/portal/auth/me.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_session_auth();
    onRequestGet16 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireSession(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      return json({
        data: {
          id: auth.user.id,
          email: auth.user.email,
          name: auth.user.name,
          role: auth.user.role,
          mda_id: auth.user.mdaId
        }
      });
    }, "onRequestGet");
  }
});

// api/portal/auth/start.ts
function generateToken2() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function portalMagicLinkEmail(resumeUrl, ttlMinutes) {
  const subject = "IAD Portal Sign-In Link \u2014 action required";
  const html = `<!doctype html><html><body style="font-family: Arial, sans-serif; color: #1a1a1a; line-height: 1.5; max-width: 580px; margin: 0 auto; padding: 24px;">
<p style="font-size: 18px; font-weight: bold; color: #1B5E20;">IAD Portal Sign-In</p>
<p>Click the link below to sign in to the Internal Audit Department portal. This link is valid for <strong>${ttlMinutes} minutes</strong> and can be used <strong>once</strong>.</p>
<p style="margin: 24px 0;"><a href="${escapeHtml(resumeUrl)}" style="background:#1B5E20;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;">Sign in to the IAD Portal</a></p>
<p style="font-size: 13px; color: #5C5549;">If you did not request this link, please ignore this email. No further action is required \u2014 the link will expire automatically.</p>
<hr style="border: none; border-top: 1px solid #E5DDD0; margin: 24px 0;">
<p style="font-size: 12px; color: #5C5549;">Internal Audit Department \xB7 Office of the Head of the Civil Service \xB7 Republic of Ghana</p>
</body></html>`;
  const text = `IAD Portal Sign-In

Click the link below to sign in to the Internal Audit Department portal. Valid for ${ttlMinutes} minutes, single-use.

${resumeUrl}

If you did not request this link, please ignore this email.

Internal Audit Department \xB7 Office of the Head of the Civil Service \xB7 Republic of Ghana`;
  return { subject, html, text };
}
var TOKEN_TTL_MS2, TOKEN_TTL_MIN2, RATE_LIMIT_WINDOW_MS3, RATE_LIMIT_MAX3, Body14, onRequestPost22;
var init_start2 = __esm({
  "api/portal/auth/start.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_email();
    init_hash_token();
    init_escape_html();
    init_zod();
    TOKEN_TTL_MS2 = 15 * 60 * 1e3;
    TOKEN_TTL_MIN2 = 15;
    RATE_LIMIT_WINDOW_MS3 = 15 * 60 * 1e3;
    RATE_LIMIT_MAX3 = 3;
    Body14 = external_exports.object({
      email: external_exports.string().email().toLowerCase()
    });
    __name(generateToken2, "generateToken");
    __name(portalMagicLinkEmail, "portalMagicLinkEmail");
    onRequestPost22 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const parsed = await parseBody(request, Body14);
      if (parsed.kind === "reject")
        return parsed.response;
      const { email: email3 } = parsed.value;
      const now = Date.now();
      const user = await first(
        env2,
        "SELECT email FROM users WHERE email = ? AND active = 1",
        email3
      );
      if (!user) {
        return json({ data: { sent: true } });
      }
      const recent = await first(
        env2,
        "SELECT COUNT(*) AS n FROM admin_magic_tokens WHERE email = ? AND created_at > ?",
        email3,
        now - RATE_LIMIT_WINDOW_MS3
      );
      if (recent && recent.n >= RATE_LIMIT_MAX3) {
        return json(
          { error: { code: "RATE_LIMITED", message: "too many sign-in requests; please try again later" } },
          { status: 429, headers: { "retry-after": String(Math.ceil(RATE_LIMIT_WINDOW_MS3 / 1e3)) } }
        );
      }
      const token = generateToken2();
      const tokenHash = await hashToken(token);
      const ipAddress = request.headers.get("cf-connecting-ip") ?? null;
      await run(
        env2,
        "INSERT INTO admin_magic_tokens (token, email, created_at, expires_at, ip_address) VALUES (?, ?, ?, ?, ?)",
        tokenHash,
        email3,
        now,
        now + TOKEN_TTL_MS2,
        ipAddress
      );
      const origin = new URL(request.url).origin;
      const resumeUrl = `${origin}/api/portal/auth/magic/${encodeURIComponent(token)}`;
      const body = portalMagicLinkEmail(resumeUrl, TOKEN_TTL_MIN2);
      try {
        await sendEmail(env2, { to: email3, subject: body.subject, html: body.html, text: body.text });
      } catch (err) {
        console.error("portal magic link email failed", err);
        return json({ error: { code: "EMAIL_FAILED", message: "email send failed" } }, { status: 502 });
      }
      return json({ data: { sent: true } });
    }, "onRequestPost");
  }
});

// api/portal/notifications/read.ts
var Body15, onRequestPost23;
var init_read = __esm({
  "api/portal/notifications/read.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_session_auth();
    init_zod();
    Body15 = external_exports.union([
      external_exports.object({ ids: external_exports.array(external_exports.string().min(1)).min(1).max(200) }),
      external_exports.object({ all: external_exports.literal(true) })
    ]);
    onRequestPost23 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireSession(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      const parsed = await parseBody(request, Body15);
      if (parsed.kind === "reject")
        return parsed.response;
      if ("all" in parsed.value) {
        await run(env2, "UPDATE notifications SET read = 1 WHERE user_id = ? AND read = 0", auth.user.id);
      } else {
        const placeholders = parsed.value.ids.map(() => "?").join(",");
        await run(
          env2,
          `UPDATE notifications SET read = 1 WHERE user_id = ? AND id IN (${placeholders})`,
          auth.user.id,
          ...parsed.value.ids
        );
      }
      return json({ data: { ok: true } });
    }, "onRequestPost");
  }
});

// api/public/transparency/by-mda.ts
var CACHE_HEADERS, onRequestGet17;
var init_by_mda = __esm({
  "api/public/transparency/by-mda.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_db();
    CACHE_HEADERS = { "cache-control": "public, max-age=300" };
    onRequestGet17 = /* @__PURE__ */ __name(async ({ env: env2 }) => {
      const rows = await all(
        env2,
        `SELECT
       au.mda_name AS mda_name,
       COUNT(f.id) AS findings,
       SUM(CASE WHEN f.status IN ('closed','verified') THEN 1 ELSE 0 END) AS closed,
       SUM(CASE WHEN f.severity = 'high' AND f.status NOT IN ('closed','verified') THEN 1 ELSE 0 END) AS open_high
     FROM findings f
     JOIN audit_universe au ON au.id = f.universe_id
     GROUP BY au.mda_name
     ORDER BY findings DESC`
      );
      return json(
        {
          data: rows.map((r) => ({
            mda_name: r.mda_name,
            findings: r.findings,
            closed: r.closed,
            resolutionRate: r.findings > 0 ? Math.round(r.closed / r.findings * 1e3) / 10 : 0,
            openHigh: r.open_high
          }))
        },
        { headers: CACHE_HEADERS }
      );
    }, "onRequestGet");
  }
});

// api/public/transparency/summary.ts
var CACHE_HEADERS2, onRequestGet18;
var init_summary = __esm({
  "api/public/transparency/summary.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_db();
    CACHE_HEADERS2 = { "cache-control": "public, max-age=300" };
    onRequestGet18 = /* @__PURE__ */ __name(async ({ env: env2 }) => {
      const totals = await first(
        env2,
        `SELECT
       (SELECT COUNT(*) FROM findings) AS findings,
       (SELECT COUNT(*) FROM findings WHERE status IN ('closed','verified')) AS closed,
       (SELECT COUNT(*) FROM engagements) AS engagements`
      );
      const mdas = await first(
        env2,
        "SELECT COUNT(DISTINCT au.mda_name) AS n FROM engagements e JOIN audit_universe au ON au.id = e.universe_id"
      );
      const bySeverity = await all(
        env2,
        "SELECT severity, COUNT(*) AS count FROM findings GROUP BY severity"
      );
      const byCategory = await all(
        env2,
        "SELECT category, COUNT(*) AS count FROM findings GROUP BY category"
      );
      const byStatus = await all(
        env2,
        "SELECT status, COUNT(*) AS count FROM findings GROUP BY status"
      );
      const trend = await all(
        env2,
        `WITH RECURSIVE months(m, n) AS (
       SELECT strftime('%Y-%m', 'now'), 1
       UNION ALL
       SELECT strftime('%Y-%m', 'now', '-' || n || ' months'), n + 1
       FROM months WHERE n < 12
     )
     SELECT m AS month,
       (SELECT COUNT(*) FROM findings WHERE substr(created_at, 1, 7) = m) AS raised,
       (SELECT COUNT(*) FROM findings WHERE closed_at IS NOT NULL AND substr(closed_at, 1, 7) = m) AS closed
     FROM months
     ORDER BY m`
      );
      const riskHeat = await all(
        env2,
        "SELECT risk_likelihood AS likelihood, risk_impact AS impact, COUNT(*) AS count FROM audit_universe GROUP BY risk_likelihood, risk_impact"
      );
      const findings = totals?.findings ?? 0;
      const closed = totals?.closed ?? 0;
      return json(
        {
          data: {
            totals: {
              findings,
              open: findings - closed,
              closed,
              resolutionRate: findings > 0 ? Math.round(closed / findings * 1e3) / 10 : 0,
              engagements: totals?.engagements ?? 0,
              mdasCovered: mdas?.n ?? 0
            },
            bySeverity,
            byCategory,
            byStatus,
            trend,
            riskHeat
          }
        },
        { headers: CACHE_HEADERS2 }
      );
    }, "onRequestGet");
  }
});

// api/admin/applications/[id].ts
var onRequestGet19;
var init_id3 = __esm({
  "api/admin/applications/[id].ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_admin_auth();
    init_db();
    onRequestGet19 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      const app = await first(
        env2,
        "SELECT id, exercise_id, email, status, has_professional_qualification, is_pwd, form_data, appeal_reason FROM applications WHERE id = ?",
        params.id
      );
      if (!app)
        return json({ error: "application not found" }, { status: 404 });
      const documents = await all(
        env2,
        "SELECT id, document_type_id, original_filename, size_bytes, mime_type, sha256, uploaded_at, ai_verdict, ai_reason, applicant_confirmed FROM application_documents WHERE application_id = ?",
        params.id
      );
      const reqs = await all(
        env2,
        "SELECT r.document_type_id, r.is_required, r.conditional_on, r.display_order, r.max_mb_override, t.label, t.description, t.default_max_mb, t.accepted_mimes, t.ai_check_type FROM exercise_document_requirements r JOIN document_types t ON t.id = r.document_type_id WHERE r.exercise_id = ? ORDER BY r.display_order ASC",
        app.exercise_id
      );
      const decisions = await all(
        env2,
        "SELECT document_type_id, decision, reason, reviewer_email, created_at FROM document_review_decisions WHERE application_id = ? ORDER BY created_at DESC",
        params.id
      );
      const reviews = await all(
        env2,
        "SELECT outcome, notes, reviewer_email, created_at FROM application_review_decisions WHERE application_id = ? ORDER BY created_at DESC",
        params.id
      );
      const history = await all(
        env2,
        "SELECT from_status, to_status, actor_email, actor_role, reason, created_at FROM status_transitions WHERE application_id = ? ORDER BY created_at ASC",
        params.id
      );
      const latestPerDoc = /* @__PURE__ */ new Map();
      for (const d of decisions) {
        if (!latestPerDoc.has(d.document_type_id))
          latestPerDoc.set(d.document_type_id, d);
      }
      const hasPro = app.has_professional_qualification === 1;
      const isPwd = app.is_pwd === 1;
      const requirements = reqs.map((r) => {
        const conditional = r.conditional_on ?? null;
        const visible = conditional === null ? true : conditional === "has_professional_qualification" ? hasPro : conditional === "is_pwd" ? isPwd : true;
        const upload = documents.find((d) => d.document_type_id === r.document_type_id) ?? null;
        return {
          document_type_id: r.document_type_id,
          label: r.label,
          description: r.description,
          is_required: r.is_required === 1,
          conditional_on: conditional,
          display_order: r.display_order,
          max_mb: r.max_mb_override ?? r.default_max_mb,
          accepted_mimes: JSON.parse(r.accepted_mimes),
          ai_check_type: r.ai_check_type,
          upload: upload ? {
            id: upload.id,
            document_type_id: upload.document_type_id,
            original_filename: upload.original_filename,
            size_bytes: upload.size_bytes,
            mime_type: upload.mime_type,
            sha256: upload.sha256,
            uploaded_at: upload.uploaded_at,
            ai_verdict: upload.ai_verdict,
            ai_reason: upload.ai_reason,
            applicant_confirmed: upload.applicant_confirmed === 1
          } : null,
          visible
        };
      });
      return json({
        data: {
          id: app.id,
          exercise_id: app.exercise_id,
          email: app.email,
          status: app.status,
          has_professional_qualification: hasPro,
          is_pwd: isPwd,
          form_data: app.form_data ? JSON.parse(app.form_data) : {},
          documents: documents.map((d) => ({
            id: d.id,
            document_type_id: d.document_type_id,
            original_filename: d.original_filename,
            size_bytes: d.size_bytes,
            mime_type: d.mime_type,
            sha256: d.sha256,
            uploaded_at: d.uploaded_at,
            ai_verdict: d.ai_verdict,
            ai_reason: d.ai_reason,
            applicant_confirmed: d.applicant_confirmed === 1
          })),
          requirements,
          decisions: Array.from(latestPerDoc.values()),
          reviews,
          history,
          appeal_reason: app.appeal_reason
        }
      });
    }, "onRequestGet");
  }
});

// api/admin/document-types/[id].ts
var PatchSchema, onRequestGet20, onRequestPatch2, onRequestDelete4;
var init_id4 = __esm({
  "api/admin/document-types/[id].ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_admin_auth();
    init_validate();
    init_db();
    init_zod();
    init_recruitment();
    PatchSchema = external_exports.object({
      label: external_exports.string().min(1).max(200).optional(),
      description: external_exports.string().max(500).nullable().optional(),
      default_max_mb: external_exports.number().int().min(1).max(50).optional(),
      accepted_mimes: external_exports.array(external_exports.string().min(1)).min(1).optional(),
      ai_check_type: external_exports.enum(["certificate", "photo", "identity"]).nullable().optional()
    }).refine((v) => Object.keys(v).length > 0, { message: "at least one field is required" });
    onRequestGet20 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      const row = await first(env2, "SELECT * FROM document_types WHERE id = ?", params.id);
      if (!row)
        return json({ error: "not found" }, { status: 404 });
      return json({ data: rowToDocumentType(row) });
    }, "onRequestGet");
    onRequestPatch2 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      const body = await parseBody(request, PatchSchema);
      if (body.kind === "reject")
        return body.response;
      const v = body.value;
      const now = Date.now();
      const sets = [];
      const binds = [];
      if (v.label !== void 0) {
        sets.push("label = ?");
        binds.push(v.label);
      }
      if (v.description !== void 0) {
        sets.push("description = ?");
        binds.push(v.description);
      }
      if (v.default_max_mb !== void 0) {
        sets.push("default_max_mb = ?");
        binds.push(v.default_max_mb);
      }
      if (v.accepted_mimes !== void 0) {
        sets.push("accepted_mimes = ?");
        binds.push(JSON.stringify(v.accepted_mimes));
      }
      if (v.ai_check_type !== void 0) {
        sets.push("ai_check_type = ?");
        binds.push(v.ai_check_type);
      }
      sets.push("updated_at = ?");
      binds.push(now);
      binds.push(params.id);
      await run(env2, `UPDATE document_types SET ${sets.join(", ")} WHERE id = ?`, ...binds);
      return json({ data: { id: params.id, updated_at: now } });
    }, "onRequestPatch");
    onRequestDelete4 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      await run(env2, "UPDATE document_types SET is_active = 0, updated_at = ? WHERE id = ?", Date.now(), params.id);
      return new Response(null, { status: 204 });
    }, "onRequestDelete");
  }
});

// api/admin/exercises/[id].ts
var PatchSchema2, onRequestPatch3;
var init_id5 = __esm({
  "api/admin/exercises/[id].ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_admin_auth();
    init_validate();
    init_db();
    init_zod();
    PatchSchema2 = external_exports.object({
      status: external_exports.enum(["draft", "active", "closed", "completed"]).optional(),
      name: external_exports.string().min(1).max(200).optional(),
      description: external_exports.string().max(1e3).nullable().optional(),
      start_date: external_exports.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
      end_date: external_exports.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
      positions: external_exports.number().int().min(0).max(1e4).optional()
    }).refine((v) => Object.keys(v).length > 0, { message: "at least one field is required" });
    onRequestPatch3 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      const body = await parseBody(request, PatchSchema2);
      if (body.kind === "reject")
        return body.response;
      const v = body.value;
      const now = Date.now();
      if (v.status === "active") {
        await run(
          env2,
          "UPDATE recruitment_exercises SET status = 'closed', updated_at = ? WHERE status = 'active' AND id != ?",
          now,
          params.id
        );
      }
      const sets = [];
      const binds = [];
      if (v.status !== void 0) {
        sets.push("status = ?");
        binds.push(v.status);
      }
      if (v.name !== void 0) {
        sets.push("name = ?");
        binds.push(v.name);
      }
      if (v.description !== void 0) {
        sets.push("description = ?");
        binds.push(v.description);
      }
      if (v.start_date !== void 0) {
        sets.push("start_date = ?");
        binds.push(v.start_date);
      }
      if (v.end_date !== void 0) {
        sets.push("end_date = ?");
        binds.push(v.end_date);
      }
      if (v.positions !== void 0) {
        sets.push("positions = ?");
        binds.push(v.positions);
      }
      sets.push("updated_at = ?");
      binds.push(now);
      binds.push(params.id);
      await run(env2, `UPDATE recruitment_exercises SET ${sets.join(", ")} WHERE id = ?`, ...binds);
      return json({ data: { id: params.id, updated_at: now } });
    }, "onRequestPatch");
  }
});

// api/admin/registry/[id].ts
var ROLES5, PatchBody2, onRequestGet21, onRequestPatch4;
var init_id6 = __esm({
  "api/admin/registry/[id].ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_session_auth();
    init_audit_log();
    init_zod();
    ROLES5 = ["admin", "director"];
    PatchBody2 = external_exports.object({
      name: external_exports.string().min(1).max(200),
      grade: external_exports.string().max(80).nullable(),
      mda_name: external_exports.string().max(200).nullable(),
      public_slug: external_exports.string().min(1).max(120).regex(/^[a-z0-9-]+$/),
      verified: external_exports.boolean()
    }).partial();
    onRequestGet21 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireSession(request, env2, ROLES5);
      if (auth.kind === "reject")
        return auth.response;
      const auditor = await first(
        env2,
        "SELECT id, staff_id, name, grade, mda_name, public_slug, verified, created_at FROM auditors WHERE id = ?",
        params.id
      );
      if (!auditor) {
        return json({ error: { code: "NOT_FOUND", message: "auditor not found" } }, { status: 404 });
      }
      const credentials = await all(
        env2,
        "SELECT id, body, designation, year, verified FROM credentials WHERE auditor_id = ? ORDER BY year ASC",
        params.id
      );
      const cpd = await all(
        env2,
        "SELECT id, activity, points, year, source FROM cpd_records WHERE auditor_id = ? ORDER BY year DESC",
        params.id
      );
      const certificates = await all(
        env2,
        "SELECT id, title, serial, verify_code, issued_at FROM certificates WHERE auditor_id = ? ORDER BY issued_at DESC",
        params.id
      );
      return json({ data: { ...auditor, credentials, cpd_records: cpd, certificates } });
    }, "onRequestGet");
    onRequestPatch4 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireSession(request, env2, ROLES5);
      if (auth.kind === "reject")
        return auth.response;
      const parsed = await parseBody(request, PatchBody2);
      if (parsed.kind === "reject")
        return parsed.response;
      const v = parsed.value;
      const existing = await first(
        env2,
        "SELECT id, verified FROM auditors WHERE id = ?",
        params.id
      );
      if (!existing) {
        return json({ error: { code: "NOT_FOUND", message: "auditor not found" } }, { status: 404 });
      }
      const entries = [];
      if (v.name !== void 0)
        entries.push(["name", v.name]);
      if (v.grade !== void 0)
        entries.push(["grade", v.grade]);
      if (v.mda_name !== void 0)
        entries.push(["mda_name", v.mda_name]);
      if (v.public_slug !== void 0)
        entries.push(["public_slug", v.public_slug]);
      if (v.verified !== void 0)
        entries.push(["verified", v.verified ? 1 : 0]);
      if (entries.length === 0) {
        return json({ error: { code: "VALIDATION", message: "no fields to update" } }, { status: 400 });
      }
      if (v.public_slug !== void 0) {
        const clash = await first(
          env2,
          "SELECT id FROM auditors WHERE public_slug = ? AND id != ?",
          v.public_slug,
          params.id
        );
        if (clash) {
          return json({ error: { code: "CONFLICT", message: "public_slug already in use" } }, { status: 409 });
        }
      }
      const sets = entries.map(([k]) => `${k} = ?`).join(", ");
      await run(env2, `UPDATE auditors SET ${sets} WHERE id = ?`, ...entries.map(([, val]) => val), params.id);
      await writeAuditLog(env2, {
        userId: auth.user.id,
        action: v.verified !== void 0 && (v.verified ? 1 : 0) !== existing.verified ? "verify" : "update",
        entity: "auditor",
        entityId: params.id,
        meta: { fields: entries.map(([k]) => k) }
      });
      return json({ data: { id: params.id } });
    }, "onRequestPatch");
  }
});

// api/admin/site-config/[key].ts
var Body16, onRequestPut2;
var init_key = __esm({
  "api/admin/site-config/[key].ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_admin_auth();
    init_zod();
    Body16 = external_exports.object({ value: external_exports.string().min(1).max(2e3) });
    onRequestPut2 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      if (auth.admin.role !== "super_admin") {
        return json({ error: "super_admin role required" }, { status: 403 });
      }
      const parsed = await parseBody(request, Body16);
      if (parsed.kind === "reject")
        return parsed.response;
      const now = Date.now();
      await run(
        env2,
        "INSERT INTO site_config (key, value, updated_at, updated_by) VALUES (?, ?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at, updated_by = excluded.updated_by",
        params.key,
        parsed.value.value,
        now,
        auth.admin.email
      );
      return json({ data: { key: params.key, value: parsed.value.value } });
    }, "onRequestPut");
  }
});

// api/admin/users/[email].ts
var ROLES6, PatchBody3, onRequestPatch5, onRequestDelete5;
var init_email2 = __esm({
  "api/admin/users/[email].ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_admin_auth();
    init_zod();
    ROLES6 = ["super_admin", "recruitment_admin", "content_manager", "viewer"];
    PatchBody3 = external_exports.object({
      role: external_exports.enum(ROLES6).optional(),
      display_name: external_exports.string().min(1).max(120).optional(),
      is_active: external_exports.boolean().optional()
    });
    onRequestPatch5 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      if (auth.admin.role !== "super_admin") {
        return json({ error: "super_admin role required" }, { status: 403 });
      }
      const parsed = await parseBody(request, PatchBody3);
      if (parsed.kind === "reject")
        return parsed.response;
      const v = parsed.value;
      const now = Date.now();
      await run(
        env2,
        "UPDATE admin_users SET role = COALESCE(?, role), display_name = COALESCE(?, display_name), is_active = COALESCE(?, is_active), updated_at = ? WHERE email = ?",
        v.role ?? null,
        v.display_name ?? null,
        v.is_active === void 0 ? null : v.is_active ? 1 : 0,
        now,
        params.email
      );
      if (v.role || v.is_active === false) {
        await run(env2, "DELETE FROM admin_sessions WHERE email = ?", params.email);
      }
      return json({ data: { email: params.email } });
    }, "onRequestPatch");
    onRequestDelete5 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      if (auth.admin.role !== "super_admin") {
        return json({ error: "super_admin role required" }, { status: 403 });
      }
      if (params.email === auth.admin.email) {
        return json({ error: "cannot deactivate yourself" }, { status: 409 });
      }
      const now = Date.now();
      await run(
        env2,
        "UPDATE admin_users SET is_active = 0, updated_at = ? WHERE email = ?",
        now,
        params.email
      );
      await run(env2, "DELETE FROM admin_sessions WHERE email = ?", params.email);
      return json({ data: { email: params.email, deactivated: true } });
    }, "onRequestDelete");
  }
});

// _shared/reference-number.ts
function formatReference(year, seq) {
  return `OHCS-${year}-${String(seq).padStart(5, "0")}`;
}
async function generateReference(env2, exerciseId, year) {
  const key = `app_${exerciseId}_${year}`;
  await run(env2, "INSERT OR IGNORE INTO sequences (key, last) VALUES (?, 0)", key);
  const row = await first(
    env2,
    "UPDATE sequences SET last = last + 1 WHERE key = ? RETURNING last",
    key
  );
  if (!row) {
    throw new Error(`reference-number: sequence row for ${key} disappeared after INSERT OR IGNORE`);
  }
  return formatReference(year, row.last);
}
var init_reference_number = __esm({
  "_shared/reference-number.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_db();
    __name(formatReference, "formatReference");
    __name(generateReference, "generateReference");
  }
});

// api/applications/magic/[token].ts
function generateSessionId2() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
var SESSION_TTL_SECONDS2, onRequestGet22;
var init_token3 = __esm({
  "api/applications/magic/[token].ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_db();
    init_cookies();
    init_reference_number();
    init_hash_token();
    SESSION_TTL_SECONDS2 = 7 * 24 * 60 * 60;
    __name(generateSessionId2, "generateSessionId");
    onRequestGet22 = /* @__PURE__ */ __name(async ({ env: env2, params }) => {
      const tokenHash = await hashToken(params.token);
      const tokenRow = await first(
        env2,
        "SELECT * FROM magic_link_tokens WHERE token = ?",
        tokenHash
      );
      if (!tokenRow)
        return json({ error: "token not found" }, { status: 404 });
      const now = Date.now();
      if (tokenRow.used_at)
        return json({ error: "token already used" }, { status: 410 });
      if (tokenRow.expires_at <= now)
        return json({ error: "token expired" }, { status: 410 });
      let applicationId;
      const existing = await first(
        env2,
        "SELECT id FROM applications WHERE exercise_id = ? AND email = ?",
        tokenRow.exercise_id,
        tokenRow.email
      );
      if (existing) {
        applicationId = existing.id;
      } else {
        const year = new Date(now).getFullYear();
        applicationId = await generateReference(env2, tokenRow.exercise_id, year);
        await run(
          env2,
          "INSERT INTO applications (id, exercise_id, email, status, form_data, created_at, last_saved_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
          applicationId,
          tokenRow.exercise_id,
          tokenRow.email,
          "draft",
          "{}",
          now,
          now
        );
      }
      const sessionId = generateSessionId2();
      const sessionExpires = now + SESSION_TTL_SECONDS2 * 1e3;
      await run(
        env2,
        "INSERT INTO application_sessions (session_id, application_id, created_at, expires_at, last_used_at) VALUES (?, ?, ?, ?, ?)",
        sessionId,
        applicationId,
        now,
        sessionExpires,
        now
      );
      await run(
        env2,
        "UPDATE magic_link_tokens SET used_at = ?, application_id = ? WHERE token = ?",
        now,
        applicationId,
        tokenHash
      );
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/apply/form/?step=1",
          "Set-Cookie": buildSetSessionCookie(sessionId, SESSION_TTL_SECONDS2)
        }
      });
    }, "onRequestGet");
  }
});

// api/portal/engagements/[id].ts
var READ_ROLES, WRITE_ROLES3, PatchBody4, onRequestGet23, onRequestPatch6;
var init_id7 = __esm({
  "api/portal/engagements/[id].ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_session_auth();
    init_portal_access();
    init_audit_log();
    init_time();
    init_zod();
    READ_ROLES = ["admin", "director", "manager", "auditor"];
    WRITE_ROLES3 = ["admin", "director", "manager"];
    PatchBody4 = external_exports.object({
      title: external_exports.string().min(1).max(300),
      phase: external_exports.enum(["planning", "fieldwork", "reporting", "follow_up", "closed"]),
      lead_auditor_id: external_exports.string().nullable(),
      start_date: external_exports.string().min(4).max(40),
      end_date: external_exports.string().max(40).nullable(),
      overall_rating: external_exports.string().max(120).nullable()
    }).partial();
    onRequestGet23 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireSession(request, env2, READ_ROLES);
      if (auth.kind === "reject")
        return auth.response;
      if (!await canAccessEngagement(env2, auth.user, params.id)) {
        return json({ error: { code: "AUTH_FORBIDDEN", message: "no access to this engagement" } }, { status: 403 });
      }
      const engagement = await first(
        env2,
        `SELECT e.id, e.code, e.title, e.universe_id, e.plan_item_id, e.phase,
            e.lead_auditor_id, e.start_date, e.end_date, e.overall_rating, e.created_at,
            au.mda_name, au.unit_name, u.name AS lead_auditor_name
     FROM engagements e
     JOIN audit_universe au ON au.id = e.universe_id
     LEFT JOIN users u ON u.id = e.lead_auditor_id
     WHERE e.id = ?`,
        params.id
      );
      if (!engagement) {
        return json({ error: { code: "NOT_FOUND", message: "engagement not found" } }, { status: 404 });
      }
      const team = await all(
        env2,
        `SELECT et.user_id, et.team_role, u.name, u.email
     FROM engagement_team et JOIN users u ON u.id = et.user_id
     WHERE et.engagement_id = ?`,
        params.id
      );
      const papers = await all(
        env2,
        "SELECT id, title, r2_key, uploaded_by, created_at FROM working_papers WHERE engagement_id = ? ORDER BY created_at DESC",
        params.id
      );
      return json({ data: { ...engagement, team, papers } });
    }, "onRequestGet");
    onRequestPatch6 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireSession(request, env2, WRITE_ROLES3);
      if (auth.kind === "reject")
        return auth.response;
      const parsed = await parseBody(request, PatchBody4);
      if (parsed.kind === "reject")
        return parsed.response;
      const v = parsed.value;
      const existing = await first(
        env2,
        "SELECT id, phase, end_date FROM engagements WHERE id = ?",
        params.id
      );
      if (!existing) {
        return json({ error: { code: "NOT_FOUND", message: "engagement not found" } }, { status: 404 });
      }
      const entries = Object.entries(v).filter(([, val]) => val !== void 0);
      if (entries.length === 0) {
        return json({ error: { code: "VALIDATION", message: "no fields to update" } }, { status: 400 });
      }
      if (v.phase === "closed" && existing.phase !== "closed" && v.end_date === void 0 && !existing.end_date) {
        entries.push(["end_date", nowIso()]);
      }
      const sets = entries.map(([k]) => `${k} = ?`).join(", ");
      await run(env2, `UPDATE engagements SET ${sets} WHERE id = ?`, ...entries.map(([, val]) => val), params.id);
      await writeAuditLog(env2, {
        userId: auth.user.id,
        action: "update",
        entity: "engagement",
        entityId: params.id,
        meta: { fields: entries.map(([k]) => k) }
      });
      return json({ data: { id: params.id } });
    }, "onRequestPatch");
  }
});

// api/portal/findings/[id].ts
async function loadFinding(env2, id) {
  return first(
    env2,
    `SELECT f.id, f.engagement_id, f.universe_id, f.title, f.description, f.category,
            f.severity, f.condition, f.criteria, f.cause, f.effect, f.status, f.closed_at, f.created_at,
            au.mda_name, au.unit_name, e.code AS engagement_code, e.title AS engagement_title
     FROM findings f
     JOIN audit_universe au ON au.id = f.universe_id
     JOIN engagements e ON e.id = f.engagement_id
     WHERE f.id = ?`,
    id
  );
}
var PatchBody5, CLOSED_STATUSES, onRequestGet24, onRequestPatch7;
var init_id8 = __esm({
  "api/portal/findings/[id].ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_session_auth();
    init_portal_access();
    init_audit_log();
    init_time();
    init_zod();
    PatchBody5 = external_exports.object({
      title: external_exports.string().min(1).max(300),
      description: external_exports.string().min(1).max(1e4),
      category: external_exports.string().min(1).max(120),
      severity: external_exports.enum(["high", "medium", "low"]),
      condition: external_exports.string().max(5e3).nullable(),
      criteria: external_exports.string().max(5e3).nullable(),
      cause: external_exports.string().max(5e3).nullable(),
      effect: external_exports.string().max(5e3).nullable(),
      status: external_exports.enum(["open", "responded", "in_progress", "closed", "verified"])
    }).partial();
    CLOSED_STATUSES = /* @__PURE__ */ new Set(["closed", "verified"]);
    __name(loadFinding, "loadFinding");
    onRequestGet24 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireSession(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      const finding = await loadFinding(env2, params.id);
      if (!finding) {
        return json({ error: { code: "NOT_FOUND", message: "finding not found" } }, { status: 404 });
      }
      const allowed = await canAccessFinding(env2, auth.user, finding) || await liaisonOwnsFinding(env2, auth.user, params.id);
      if (!allowed) {
        return json({ error: { code: "AUTH_FORBIDDEN", message: "no access to this finding" } }, { status: 403 });
      }
      const recommendations = await all(
        env2,
        "SELECT id, finding_id, text, owner, due_date, status, created_at FROM recommendations WHERE finding_id = ? ORDER BY due_date ASC",
        params.id
      );
      const responses = await all(
        env2,
        `SELECT id, finding_id, recommendation_id, respondent_name, mda_name, response_text, action_plan, evidence_r2_key, submitted_at
     FROM management_responses WHERE finding_id = ? ORDER BY submitted_at DESC`,
        params.id
      );
      return json({ data: { ...finding, recommendations, responses } });
    }, "onRequestGet");
    onRequestPatch7 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireSession(request, env2, ["admin", "director", "manager", "auditor"]);
      if (auth.kind === "reject")
        return auth.response;
      const parsed = await parseBody(request, PatchBody5);
      if (parsed.kind === "reject")
        return parsed.response;
      const v = parsed.value;
      const existing = await first(
        env2,
        "SELECT id, engagement_id, status, closed_at FROM findings WHERE id = ?",
        params.id
      );
      if (!existing) {
        return json({ error: { code: "NOT_FOUND", message: "finding not found" } }, { status: 404 });
      }
      if (!await canAccessFinding(env2, auth.user, existing)) {
        return json({ error: { code: "AUTH_FORBIDDEN", message: "no access to this finding" } }, { status: 403 });
      }
      const entries = Object.entries(v).filter(([, val]) => val !== void 0);
      if (entries.length === 0) {
        return json({ error: { code: "VALIDATION", message: "no fields to update" } }, { status: 400 });
      }
      if (v.status !== void 0) {
        const closing = CLOSED_STATUSES.has(v.status);
        const wasClosed = CLOSED_STATUSES.has(existing.status);
        if (closing && !wasClosed && !existing.closed_at) {
          entries.push(["closed_at", nowIso()]);
        } else if (!closing && wasClosed) {
          entries.push(["closed_at", null]);
        }
      }
      const sets = entries.map(([k]) => `${k} = ?`).join(", ");
      await run(env2, `UPDATE findings SET ${sets} WHERE id = ?`, ...entries.map(([, val]) => val), params.id);
      await writeAuditLog(env2, {
        userId: auth.user.id,
        action: "update",
        entity: "finding",
        entityId: params.id,
        meta: { fields: entries.map(([k]) => k) }
      });
      return json({ data: { id: params.id } });
    }, "onRequestPatch");
  }
});

// api/portal/plan-items/[id].ts
var WRITE_ROLES4, PatchBody6, onRequestPatch8;
var init_id9 = __esm({
  "api/portal/plan-items/[id].ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_session_auth();
    init_audit_log();
    init_zod();
    WRITE_ROLES4 = ["admin", "director", "manager"];
    PatchBody6 = external_exports.object({
      quarter: external_exports.enum(["Q1", "Q2", "Q3", "Q4"]),
      priority: external_exports.enum(["high", "medium", "low"]),
      status: external_exports.enum(["planned", "in_progress", "done", "deferred"])
    }).partial();
    onRequestPatch8 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireSession(request, env2, WRITE_ROLES4);
      if (auth.kind === "reject")
        return auth.response;
      const parsed = await parseBody(request, PatchBody6);
      if (parsed.kind === "reject")
        return parsed.response;
      const entries = Object.entries(parsed.value).filter(([, v]) => v !== void 0);
      if (entries.length === 0) {
        return json({ error: { code: "VALIDATION", message: "no fields to update" } }, { status: 400 });
      }
      const existing = await first(env2, "SELECT id FROM plan_items WHERE id = ?", params.id);
      if (!existing) {
        return json({ error: { code: "NOT_FOUND", message: "plan item not found" } }, { status: 404 });
      }
      const sets = entries.map(([k]) => `${k} = ?`).join(", ");
      await run(env2, `UPDATE plan_items SET ${sets} WHERE id = ?`, ...entries.map(([, v]) => v), params.id);
      await writeAuditLog(env2, {
        userId: auth.user.id,
        action: "update",
        entity: "plan_item",
        entityId: params.id,
        meta: { fields: entries.map(([k]) => k) }
      });
      return json({ data: { id: params.id } });
    }, "onRequestPatch");
  }
});

// api/portal/plans/[id].ts
var READ_ROLES2, WRITE_ROLES5, PatchBody7, onRequestGet25, onRequestPatch9;
var init_id10 = __esm({
  "api/portal/plans/[id].ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_session_auth();
    init_audit_log();
    init_zod();
    READ_ROLES2 = ["admin", "director", "manager", "auditor"];
    WRITE_ROLES5 = ["admin", "director", "manager"];
    PatchBody7 = external_exports.object({
      year: external_exports.number().int().min(2e3).max(2100),
      title: external_exports.string().min(1).max(300),
      status: external_exports.enum(["draft", "submitted", "approved"])
    }).partial();
    onRequestGet25 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireSession(request, env2, READ_ROLES2);
      if (auth.kind === "reject")
        return auth.response;
      const plan = await first(
        env2,
        "SELECT id, year, title, status, created_by, created_at FROM audit_plans WHERE id = ?",
        params.id
      );
      if (!plan) {
        return json({ error: { code: "NOT_FOUND", message: "plan not found" } }, { status: 404 });
      }
      const items = await all(
        env2,
        `SELECT pi.id, pi.plan_id, pi.universe_id, pi.quarter, pi.priority, pi.status,
            au.mda_name, au.unit_name, au.risk_likelihood, au.risk_impact,
            au.risk_likelihood * au.risk_impact AS risk_score
     FROM plan_items pi
     JOIN audit_universe au ON au.id = pi.universe_id
     WHERE pi.plan_id = ?
     ORDER BY pi.quarter ASC, risk_score DESC`,
        params.id
      );
      return json({ data: { ...plan, items } });
    }, "onRequestGet");
    onRequestPatch9 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireSession(request, env2, WRITE_ROLES5);
      if (auth.kind === "reject")
        return auth.response;
      const parsed = await parseBody(request, PatchBody7);
      if (parsed.kind === "reject")
        return parsed.response;
      const entries = Object.entries(parsed.value).filter(([, v]) => v !== void 0);
      if (entries.length === 0) {
        return json({ error: { code: "VALIDATION", message: "no fields to update" } }, { status: 400 });
      }
      const existing = await first(
        env2,
        "SELECT id FROM audit_plans WHERE id = ?",
        params.id
      );
      if (!existing) {
        return json({ error: { code: "NOT_FOUND", message: "plan not found" } }, { status: 404 });
      }
      const sets = entries.map(([k]) => `${k} = ?`).join(", ");
      await run(env2, `UPDATE audit_plans SET ${sets} WHERE id = ?`, ...entries.map(([, v]) => v), params.id);
      await writeAuditLog(env2, {
        userId: auth.user.id,
        action: "update",
        entity: "audit_plan",
        entityId: params.id,
        meta: { fields: entries.map(([k]) => k) }
      });
      return json({ data: { id: params.id } });
    }, "onRequestPatch");
  }
});

// api/portal/recommendations/[id].ts
var PatchBody8, onRequestPatch10;
var init_id11 = __esm({
  "api/portal/recommendations/[id].ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_session_auth();
    init_portal_access();
    init_audit_log();
    init_zod();
    PatchBody8 = external_exports.object({
      text: external_exports.string().min(1).max(5e3),
      owner: external_exports.string().min(1).max(200),
      due_date: external_exports.string().min(4).max(40),
      status: external_exports.enum(["open", "in_progress", "implemented", "verified", "overdue"])
    }).partial();
    onRequestPatch10 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireSession(request, env2, ["admin", "director", "manager", "auditor"]);
      if (auth.kind === "reject")
        return auth.response;
      const parsed = await parseBody(request, PatchBody8);
      if (parsed.kind === "reject")
        return parsed.response;
      const rec = await first(
        env2,
        "SELECT r.id, r.finding_id, f.engagement_id FROM recommendations r JOIN findings f ON f.id = r.finding_id WHERE r.id = ?",
        params.id
      );
      if (!rec) {
        return json({ error: { code: "NOT_FOUND", message: "recommendation not found" } }, { status: 404 });
      }
      if (!await canAccessFinding(env2, auth.user, rec)) {
        return json({ error: { code: "AUTH_FORBIDDEN", message: "no access to this recommendation" } }, { status: 403 });
      }
      const entries = Object.entries(parsed.value).filter(([, val]) => val !== void 0);
      if (entries.length === 0) {
        return json({ error: { code: "VALIDATION", message: "no fields to update" } }, { status: 400 });
      }
      const sets = entries.map(([k]) => `${k} = ?`).join(", ");
      await run(env2, `UPDATE recommendations SET ${sets} WHERE id = ?`, ...entries.map(([, val]) => val), params.id);
      await writeAuditLog(env2, {
        userId: auth.user.id,
        action: "update",
        entity: "recommendation",
        entityId: params.id,
        meta: { fields: entries.map(([k]) => k) }
      });
      return json({ data: { id: params.id } });
    }, "onRequestPatch");
  }
});

// api/portal/universe/[id].ts
var WRITE_ROLES6, PatchBody9, COLUMN_MAP, onRequestPatch11, onRequestDelete6;
var init_id12 = __esm({
  "api/portal/universe/[id].ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_session_auth();
    init_audit_log();
    init_zod();
    WRITE_ROLES6 = ["admin", "director", "manager"];
    PatchBody9 = external_exports.object({
      mda_name: external_exports.string().min(1).max(200),
      unit_name: external_exports.string().min(1).max(200),
      category: external_exports.string().min(1).max(120),
      risk_likelihood: external_exports.number().int().min(1).max(5),
      risk_impact: external_exports.number().int().min(1).max(5),
      last_audited_at: external_exports.string().max(40).nullable(),
      notes: external_exports.string().max(2e3).nullable()
    }).partial();
    COLUMN_MAP = {
      mda_name: "mda_name",
      unit_name: "unit_name",
      category: "category",
      risk_likelihood: "risk_likelihood",
      risk_impact: "risk_impact",
      last_audited_at: "last_audited_at",
      notes: "notes"
    };
    onRequestPatch11 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireSession(request, env2, WRITE_ROLES6);
      if (auth.kind === "reject")
        return auth.response;
      const parsed = await parseBody(request, PatchBody9);
      if (parsed.kind === "reject")
        return parsed.response;
      const entries = Object.entries(parsed.value).filter(([, v]) => v !== void 0);
      if (entries.length === 0) {
        return json({ error: { code: "VALIDATION", message: "no fields to update" } }, { status: 400 });
      }
      const existing = await first(
        env2,
        "SELECT id FROM audit_universe WHERE id = ?",
        params.id
      );
      if (!existing) {
        return json({ error: { code: "NOT_FOUND", message: "universe entry not found" } }, { status: 404 });
      }
      const sets = entries.map(([k]) => `${COLUMN_MAP[k]} = ?`).join(", ");
      await run(env2, `UPDATE audit_universe SET ${sets} WHERE id = ?`, ...entries.map(([, v]) => v), params.id);
      await writeAuditLog(env2, {
        userId: auth.user.id,
        action: "update",
        entity: "audit_universe",
        entityId: params.id,
        meta: { fields: entries.map(([k]) => k) }
      });
      return json({ data: { id: params.id } });
    }, "onRequestPatch");
    onRequestDelete6 = /* @__PURE__ */ __name(async ({ request, env: env2, params }) => {
      const auth = await requireSession(request, env2, WRITE_ROLES6);
      if (auth.kind === "reject")
        return auth.response;
      const existing = await first(
        env2,
        "SELECT id FROM audit_universe WHERE id = ?",
        params.id
      );
      if (!existing) {
        return json({ error: { code: "NOT_FOUND", message: "universe entry not found" } }, { status: 404 });
      }
      const used = await first(
        env2,
        "SELECT COUNT(*) AS n FROM engagements WHERE universe_id = ?",
        params.id
      );
      if (used && used.n > 0) {
        return json(
          { error: { code: "CONFLICT", message: "universe entry is referenced by engagements" } },
          { status: 409 }
        );
      }
      await run(env2, "DELETE FROM audit_universe WHERE id = ?", params.id);
      await writeAuditLog(env2, {
        userId: auth.user.id,
        action: "delete",
        entity: "audit_universe",
        entityId: params.id
      });
      return json({ data: { id: params.id } });
    }, "onRequestDelete");
  }
});

// api/public/registry/[slug].ts
var onRequestGet26;
var init_slug = __esm({
  "api/public/registry/[slug].ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_db();
    onRequestGet26 = /* @__PURE__ */ __name(async ({ env: env2, params }) => {
      const auditor = await first(
        env2,
        "SELECT id, name, grade, mda_name, verified, created_at FROM auditors WHERE public_slug = ? AND verified = 1",
        params.slug
      );
      if (!auditor) {
        return json({ error: { code: "NOT_FOUND", message: "auditor not found" } }, { status: 404 });
      }
      const credentials = await all(
        env2,
        "SELECT body, designation, year FROM credentials WHERE auditor_id = ? AND verified = 1 ORDER BY year ASC",
        auditor.id
      );
      const cpd = await first(
        env2,
        "SELECT COALESCE(SUM(points), 0) AS points FROM cpd_records WHERE auditor_id = ?",
        auditor.id
      );
      const certificates = await all(
        env2,
        "SELECT title, serial, verify_code, issued_at FROM certificates WHERE auditor_id = ? ORDER BY issued_at DESC",
        auditor.id
      );
      return json(
        {
          data: {
            name: auditor.name,
            grade: auditor.grade,
            mda_name: auditor.mda_name,
            verified: auditor.verified === 1,
            credentials,
            cpdPoints: cpd?.points ?? 0,
            memberSince: auditor.created_at,
            certificates
          }
        },
        { headers: { "cache-control": "public, max-age=300" } }
      );
    }, "onRequestGet");
  }
});

// api/admin/applications/index.ts
var onRequestGet27;
var init_applications = __esm({
  "api/admin/applications/index.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_admin_auth();
    init_db();
    onRequestGet27 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      const url2 = new URL(request.url);
      const status = url2.searchParams.get("status");
      const exerciseId = url2.searchParams.get("exercise_id");
      const search = url2.searchParams.get("search");
      const claimedByMe = url2.searchParams.get("claimed_by_me") === "1";
      const wheres = ["a.status != ?"];
      const binds = ["flagged", "draft"];
      if (status) {
        wheres[0] = "a.status = ?";
        binds[1] = status;
      }
      if (exerciseId) {
        wheres.push("a.exercise_id = ?");
        binds.push(exerciseId);
      }
      if (search) {
        wheres.push("(a.id LIKE ? OR a.email LIKE ?)");
        binds.push(`%${search}%`, `%${search}%`);
      }
      if (claimedByMe) {
        wheres.push("a.review_claimed_by = ?");
        binds.push(auth.admin.email);
      }
      const sql = `SELECT a.id, a.exercise_id, a.email, a.status, a.submitted_at, a.review_claimed_by, (SELECT COUNT(*) FROM application_documents WHERE application_id = a.id) AS doc_count, (SELECT COUNT(*) FROM exercise_document_requirements WHERE exercise_id = a.exercise_id AND is_required = 1) AS doc_required_count, (SELECT COUNT(*) FROM application_documents WHERE application_id = a.id AND ai_verdict = ?) AS ai_flag_count FROM applications a WHERE ${wheres.join(" AND ")} ORDER BY a.submitted_at DESC LIMIT 50`;
      const rows = await all(env2, sql, ...binds);
      return json({ data: rows });
    }, "onRequestGet");
  }
});

// api/admin/document-types/index.ts
var CreateSchema, onRequestGet28, onRequestPost24;
var init_document_types = __esm({
  "api/admin/document-types/index.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_admin_auth();
    init_validate();
    init_db();
    init_zod();
    init_recruitment();
    CreateSchema = external_exports.object({
      id: external_exports.string().min(1).max(64).regex(/^[a-z0-9_]+$/, "lowercase letters, numbers, underscores only"),
      label: external_exports.string().min(1).max(200),
      description: external_exports.string().max(500).nullable().optional(),
      default_max_mb: external_exports.number().int().min(1).max(50),
      accepted_mimes: external_exports.array(external_exports.string().min(1)).min(1),
      ai_check_type: external_exports.enum(["certificate", "photo", "identity"]).nullable().optional()
    });
    onRequestGet28 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      const rows = await all(env2, "SELECT * FROM document_types ORDER BY label");
      return json({ data: rows.map(rowToDocumentType) });
    }, "onRequestGet");
    onRequestPost24 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      const body = await parseBody(request, CreateSchema);
      if (body.kind === "reject")
        return body.response;
      const v = body.value;
      const now = Date.now();
      await run(
        env2,
        "INSERT INTO document_types (id, label, description, default_max_mb, accepted_mimes, ai_check_type, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?)",
        v.id,
        v.label,
        v.description ?? null,
        v.default_max_mb,
        JSON.stringify(v.accepted_mimes),
        v.ai_check_type ?? null,
        now,
        now
      );
      return json(
        {
          data: {
            id: v.id,
            label: v.label,
            description: v.description ?? null,
            default_max_mb: v.default_max_mb,
            accepted_mimes: v.accepted_mimes,
            ai_check_type: v.ai_check_type ?? null,
            is_active: true,
            created_at: now,
            updated_at: now
          }
        },
        { status: 201 }
      );
    }, "onRequestPost");
  }
});

// api/admin/exercises/index.ts
var CreateSchema2, onRequestGet29, onRequestPost25;
var init_exercises = __esm({
  "api/admin/exercises/index.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_admin_auth();
    init_validate();
    init_db();
    init_zod();
    CreateSchema2 = external_exports.object({
      name: external_exports.string().min(1).max(200),
      description: external_exports.string().max(1e3).optional(),
      start_date: external_exports.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      end_date: external_exports.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      positions: external_exports.number().int().min(0).max(1e4).optional()
    });
    onRequestGet29 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      const rows = await all(
        env2,
        "SELECT e.id, e.name, e.description, e.start_date, e.end_date, e.status, e.positions, (SELECT COUNT(*) FROM applications WHERE exercise_id = e.id) AS applications FROM recruitment_exercises e ORDER BY e.created_at DESC"
      );
      return json({ data: rows });
    }, "onRequestGet");
    onRequestPost25 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      const body = await parseBody(request, CreateSchema2);
      if (body.kind === "reject")
        return body.response;
      const v = body.value;
      const now = Date.now();
      const id = `ex-${String(now).slice(-9)}`;
      await run(
        env2,
        "INSERT INTO recruitment_exercises (id, name, description, start_date, end_date, status, positions, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        id,
        v.name,
        v.description ?? null,
        v.start_date,
        v.end_date,
        "draft",
        v.positions ?? 0,
        now,
        now
      );
      return json(
        {
          data: {
            id,
            name: v.name,
            description: v.description ?? null,
            start_date: v.start_date,
            end_date: v.end_date,
            status: "draft",
            positions: v.positions ?? 0,
            applications: 0
          }
        },
        { status: 201 }
      );
    }, "onRequestPost");
  }
});

// api/admin/registry/index.ts
var ROLES7, CreateBody, onRequestGet30, onRequestPost26;
var init_registry = __esm({
  "api/admin/registry/index.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_session_auth();
    init_audit_log();
    init_time();
    init_zod();
    ROLES7 = ["admin", "director"];
    CreateBody = external_exports.object({
      staff_id: external_exports.string().min(1).max(60),
      name: external_exports.string().min(1).max(200),
      grade: external_exports.string().max(80).optional(),
      mda_name: external_exports.string().max(200).optional(),
      public_slug: external_exports.string().min(1).max(120).regex(/^[a-z0-9-]+$/, "slug must be lowercase letters, digits and hyphens"),
      verified: external_exports.boolean().optional()
    });
    onRequestGet30 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireSession(request, env2, ROLES7);
      if (auth.kind === "reject")
        return auth.response;
      const rows = await all(
        env2,
        `SELECT a.id, a.staff_id, a.name, a.grade, a.mda_name, a.public_slug, a.verified, a.created_at,
            (SELECT COUNT(*) FROM credentials c WHERE c.auditor_id = a.id) AS credential_count,
            (SELECT COALESCE(SUM(p.points), 0) FROM cpd_records p WHERE p.auditor_id = a.id) AS cpd_points
     FROM auditors a
     ORDER BY a.created_at DESC`
      );
      return json({ data: rows });
    }, "onRequestGet");
    onRequestPost26 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireSession(request, env2, ROLES7);
      if (auth.kind === "reject")
        return auth.response;
      const parsed = await parseBody(request, CreateBody);
      if (parsed.kind === "reject")
        return parsed.response;
      const v = parsed.value;
      const clash = await first(
        env2,
        "SELECT id FROM auditors WHERE staff_id = ? OR public_slug = ?",
        v.staff_id,
        v.public_slug
      );
      if (clash) {
        return json(
          { error: { code: "CONFLICT", message: "staff_id or public_slug already registered" } },
          { status: 409 }
        );
      }
      const id = crypto.randomUUID();
      await run(
        env2,
        "INSERT INTO auditors (id, staff_id, name, grade, mda_name, public_slug, verified, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        id,
        v.staff_id,
        v.name,
        v.grade ?? null,
        v.mda_name ?? null,
        v.public_slug,
        v.verified ? 1 : 0,
        nowIso()
      );
      await writeAuditLog(env2, {
        userId: auth.user.id,
        action: "create",
        entity: "auditor",
        entityId: id,
        meta: { staff_id: v.staff_id, name: v.name }
      });
      return json({ data: { id } }, { status: 201 });
    }, "onRequestPost");
  }
});

// api/admin/site-config/index.ts
var onRequestGet31;
var init_site_config = __esm({
  "api/admin/site-config/index.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_db();
    init_admin_auth();
    onRequestGet31 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      if (auth.admin.role !== "super_admin") {
        return json({ error: "super_admin role required" }, { status: 403 });
      }
      const rows = await all(
        env2,
        "SELECT key, value, updated_at, updated_by FROM site_config ORDER BY key ASC"
      );
      return json({ data: rows });
    }, "onRequestGet");
  }
});

// api/admin/users/index.ts
function generateToken3() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
var ROLES8, Body17, TOKEN_TTL_MS3, TOKEN_TTL_MIN3, onRequestGet32, onRequestPost27;
var init_users = __esm({
  "api/admin/users/index.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_admin_auth();
    init_email();
    init_hash_token();
    init_admin_magic_link_email();
    init_zod();
    ROLES8 = ["super_admin", "recruitment_admin", "content_manager", "viewer"];
    Body17 = external_exports.object({
      email: external_exports.string().email().toLowerCase(),
      role: external_exports.enum(ROLES8),
      display_name: external_exports.string().min(1).max(120).optional()
    });
    TOKEN_TTL_MS3 = 15 * 60 * 1e3;
    TOKEN_TTL_MIN3 = 15;
    __name(generateToken3, "generateToken");
    onRequestGet32 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      if (auth.admin.role !== "super_admin") {
        return json({ error: "super_admin role required" }, { status: 403 });
      }
      const rows = await all(
        env2,
        "SELECT email, role, display_name, is_active, created_at, last_login_at FROM admin_users ORDER BY created_at ASC"
      );
      return json({ data: rows });
    }, "onRequestGet");
    onRequestPost27 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireAdmin(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      if (auth.admin.role !== "super_admin") {
        return json({ error: "super_admin role required" }, { status: 403 });
      }
      const parsed = await parseBody(request, Body17);
      if (parsed.kind === "reject")
        return parsed.response;
      const v = parsed.value;
      const now = Date.now();
      await run(
        env2,
        "INSERT INTO admin_users (email, role, display_name, is_active, created_at, created_by, updated_at) VALUES (?, ?, ?, 1, ?, ?, ?)",
        v.email,
        v.role,
        v.display_name ?? null,
        now,
        auth.admin.email,
        now
      );
      const token = generateToken3();
      const tokenHash = await hashToken(token);
      await run(
        env2,
        "INSERT INTO admin_magic_tokens (token, email, created_at, expires_at, ip_address) VALUES (?, ?, ?, ?, ?)",
        tokenHash,
        v.email,
        now,
        now + TOKEN_TTL_MS3,
        null
      );
      const origin = new URL(request.url).origin;
      const resumeUrl = `${origin}/api/admin/auth/magic/${encodeURIComponent(token)}`;
      const body = adminMagicLinkEmail(resumeUrl, TOKEN_TTL_MIN3);
      try {
        await sendEmail(env2, { to: v.email, subject: body.subject, html: body.html, text: body.text });
      } catch (err) {
        console.error("admin welcome email failed", err);
      }
      return json({ data: { email: v.email, role: v.role } }, { status: 201 });
    }, "onRequestPost");
  }
});

// api/applications/me.ts
var PatchSchema3, onRequestGet33, onRequestPatch12;
var init_me3 = __esm({
  "api/applications/me.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_applicant_session();
    init_zod();
    PatchSchema3 = external_exports.object({
      form_patch: external_exports.record(external_exports.string(), external_exports.unknown()).optional(),
      has_professional_qualification: external_exports.boolean().optional(),
      is_pwd: external_exports.boolean().optional()
    }).refine((v) => Object.keys(v).length > 0, { message: "at least one field required" });
    onRequestGet33 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireApplicant(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      const row = await first(
        env2,
        "SELECT id, exercise_id, email, status, has_professional_qualification, is_pwd, form_data, created_at, submitted_at, last_saved_at FROM applications WHERE id = ?",
        auth.application.id
      );
      if (!row)
        return json({ error: "application not found" }, { status: 404 });
      return json({
        data: {
          id: row.id,
          exercise_id: row.exercise_id,
          email: row.email,
          status: row.status,
          has_professional_qualification: row.has_professional_qualification === 1,
          is_pwd: row.is_pwd === 1,
          form_data: row.form_data ? JSON.parse(row.form_data) : {},
          created_at: row.created_at,
          submitted_at: row.submitted_at,
          last_saved_at: row.last_saved_at
        }
      });
    }, "onRequestGet");
    onRequestPatch12 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireApplicant(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      if (auth.application.status !== "draft") {
        return json(
          { error: "application is not editable", code: "NOT_DRAFT", status: auth.application.status },
          { status: 409 }
        );
      }
      const parsed = await parseBody(request, PatchSchema3);
      if (parsed.kind === "reject")
        return parsed.response;
      const v = parsed.value;
      const sets = [];
      const binds = [];
      if (v.form_patch) {
        const cur = await first(
          env2,
          "SELECT form_data FROM applications WHERE id = ?",
          auth.application.id
        );
        const curObj = cur?.form_data ? JSON.parse(cur.form_data) : {};
        const merged = { ...curObj, ...v.form_patch };
        sets.push("form_data = ?");
        binds.push(JSON.stringify(merged));
      }
      if (v.has_professional_qualification !== void 0) {
        sets.push("has_professional_qualification = ?");
        binds.push(v.has_professional_qualification ? 1 : 0);
      }
      if (v.is_pwd !== void 0) {
        sets.push("is_pwd = ?");
        binds.push(v.is_pwd ? 1 : 0);
      }
      const now = Date.now();
      sets.push("last_saved_at = ?");
      binds.push(now);
      binds.push(auth.application.id);
      await run(env2, `UPDATE applications SET ${sets.join(", ")} WHERE id = ?`, ...binds);
      return json({ data: { last_saved_at: now } });
    }, "onRequestPatch");
  }
});

// _shared/magic-link-email.ts
function magicLinkEmail(resumeUrl) {
  const subject = "Continue your OHCS Recruitment application";
  const html = `
    <div style="font-family: system-ui, -apple-system, Segoe UI, sans-serif; color: #1a1a1a; max-width: 560px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #006633; margin: 0 0 16px;">OHCS Recruitment</h2>
      <p>Click the button below to continue or resume your application. The link expires in 30 minutes.</p>
      <p style="margin: 32px 0;">
        <a href="${resumeUrl}" style="display: inline-block; padding: 12px 24px; background: #006633; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
          Continue Application
        </a>
      </p>
      <p style="color: #6b7280; font-size: 14px;">If the button doesn't work, copy this link into your browser:</p>
      <p style="word-break: break-all; color: #6b7280; font-size: 13px;">${resumeUrl}</p>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;">
      <p style="color: #6b7280; font-size: 13px;">If you didn't request this email, you can safely ignore it. OHCS will never ask for your password or payment.</p>
    </div>
  `;
  const text = `OHCS Recruitment

Click the link below to continue or resume your application. The link expires in 30 minutes.

${resumeUrl}

If you didn't request this email, you can safely ignore it. OHCS will never ask for your password or payment.`;
  return { subject, html, text };
}
var init_magic_link_email = __esm({
  "_shared/magic-link-email.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(magicLinkEmail, "magicLinkEmail");
  }
});

// api/applications/start.ts
function generateToken4() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
var TOKEN_TTL_MS4, RATE_LIMIT_WINDOW_MS4, RATE_LIMIT_MAX_PER_EMAIL, Body18, onRequestPost28;
var init_start3 = __esm({
  "api/applications/start.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_email();
    init_magic_link_email();
    init_hash_token();
    init_zod();
    TOKEN_TTL_MS4 = 30 * 60 * 1e3;
    RATE_LIMIT_WINDOW_MS4 = 5 * 60 * 1e3;
    RATE_LIMIT_MAX_PER_EMAIL = 3;
    Body18 = external_exports.object({
      email: external_exports.string().email().toLowerCase(),
      exercise_id: external_exports.string().min(1)
    });
    __name(generateToken4, "generateToken");
    onRequestPost28 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const parsed = await parseBody(request, Body18);
      if (parsed.kind === "reject")
        return parsed.response;
      const { email: email3, exercise_id } = parsed.value;
      const exercise = await first(
        env2,
        "SELECT status FROM recruitment_exercises WHERE id = ?",
        exercise_id
      );
      if (!exercise) {
        return json({ error: "unknown exercise", code: "EXERCISE_NOT_FOUND" }, { status: 404 });
      }
      if (exercise.status !== "active") {
        return json(
          { error: "exercise is not accepting applications", status: exercise.status },
          { status: 409 }
        );
      }
      const now = Date.now();
      const recent = await first(
        env2,
        "SELECT COUNT(*) AS n FROM magic_link_tokens WHERE email = ? AND created_at > ?",
        email3,
        now - RATE_LIMIT_WINDOW_MS4
      );
      if (recent && recent.n >= RATE_LIMIT_MAX_PER_EMAIL) {
        return json(
          { error: "too many magic-link requests; please try again later" },
          { status: 429, headers: { "retry-after": String(Math.ceil(RATE_LIMIT_WINDOW_MS4 / 1e3)) } }
        );
      }
      const token = generateToken4();
      const tokenHash = await hashToken(token);
      const expires = now + TOKEN_TTL_MS4;
      await run(
        env2,
        "INSERT INTO magic_link_tokens (token, email, exercise_id, created_at, expires_at) VALUES (?, ?, ?, ?, ?)",
        tokenHash,
        email3,
        exercise_id,
        now,
        expires
      );
      const origin = new URL(request.url).origin;
      const resumeUrl = `${origin}/api/applications/magic/${encodeURIComponent(token)}`;
      const body = magicLinkEmail(resumeUrl);
      try {
        await sendEmail(env2, { to: email3, subject: body.subject, html: body.html, text: body.text });
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return json({ error: "email send failed", detail: message }, { status: 502 });
      }
      return json({ data: { sent: true, exercise_id } });
    }, "onRequestPost");
  }
});

// api/applications/track.ts
var onRequestGet34;
var init_track = __esm({
  "api/applications/track.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_db();
    onRequestGet34 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const url2 = new URL(request.url);
      const ref = url2.searchParams.get("ref")?.trim() ?? "";
      const email3 = url2.searchParams.get("email")?.trim().toLowerCase() ?? "";
      if (!ref || !email3) {
        return json({ error: "ref and email query params required" }, { status: 400 });
      }
      const row = await first(
        env2,
        "SELECT id, exercise_id, status, submitted_at, created_at FROM applications WHERE id = ? AND email = ?",
        ref,
        email3
      );
      if (!row) {
        return json({ error: "no application found for that reference and email" }, { status: 404 });
      }
      return json({
        data: {
          reference_number: row.id,
          exercise_id: row.exercise_id,
          status: row.status,
          submitted_at: row.submitted_at,
          created_at: row.created_at
        }
      });
    }, "onRequestGet");
  }
});

// api/exercises/active.ts
var onRequestGet35;
var init_active = __esm({
  "api/exercises/active.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_db();
    onRequestGet35 = /* @__PURE__ */ __name(async ({ env: env2 }) => {
      const row = await first(
        env2,
        "SELECT id, name, description, start_date, end_date, status, positions FROM recruitment_exercises WHERE status = 'active' LIMIT 1"
      );
      if (!row) {
        return json({ error: "no active exercise", code: "NO_ACTIVE_EXERCISE" }, { status: 404 });
      }
      return json({ data: row });
    }, "onRequestGet");
  }
});

// api/portal/dashboard.ts
function findingsScope(user) {
  if (user.role === "auditor") {
    return {
      where: "f.engagement_id IN (SELECT id FROM engagements WHERE lead_auditor_id = ? UNION SELECT engagement_id FROM engagement_team WHERE user_id = ?)",
      binds: [user.id, user.id]
    };
  }
  if (user.role === "mda_liaison") {
    return {
      where: "f.universe_id IN (SELECT id FROM audit_universe WHERE mda_name = ?)",
      binds: [user.mdaId ?? ""]
    };
  }
  return { where: "1=1", binds: [] };
}
var onRequestGet36;
var init_dashboard = __esm({
  "api/portal/dashboard.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_db();
    init_session_auth();
    init_notify();
    __name(findingsScope, "findingsScope");
    onRequestGet36 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireSession(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      const user = auth.user;
      const flipped = await flipOverdueRecommendations(env2);
      for (const recId of flipped) {
        await notifyRoles(env2, ["director", "manager"], "recommendation_overdue", {
          recommendation_id: recId
        });
      }
      const scope = findingsScope(user);
      const totals = await first(
        env2,
        `SELECT COUNT(*) AS findings,
            SUM(CASE WHEN f.status IN ('closed','verified') THEN 1 ELSE 0 END) AS closed
     FROM findings f WHERE ${scope.where}`,
        ...scope.binds
      );
      const bySeverity = await all(
        env2,
        `SELECT f.severity AS severity, COUNT(*) AS count FROM findings f WHERE ${scope.where} GROUP BY f.severity`,
        ...scope.binds
      );
      const byStatus = await all(
        env2,
        `SELECT f.status AS status, COUNT(*) AS count FROM findings f WHERE ${scope.where} GROUP BY f.status`,
        ...scope.binds
      );
      const trend = await all(
        env2,
        `WITH RECURSIVE months(m, n) AS (
       SELECT strftime('%Y-%m', 'now'), 1
       UNION ALL
       SELECT strftime('%Y-%m', 'now', '-' || n || ' months'), n + 1
       FROM months WHERE n < 12
     )
     SELECT m AS month,
       (SELECT COUNT(*) FROM findings f WHERE substr(f.created_at, 1, 7) = m AND ${scope.where}) AS raised,
       (SELECT COUNT(*) FROM findings f WHERE f.closed_at IS NOT NULL AND substr(f.closed_at, 1, 7) = m AND ${scope.where}) AS closed
     FROM months
     ORDER BY m`,
        ...scope.binds,
        ...scope.binds
      );
      const overdue = await first(
        env2,
        `SELECT COUNT(*) AS n FROM recommendations r
     JOIN findings f ON f.id = r.finding_id
     WHERE r.status = 'overdue' AND ${scope.where}`,
        ...scope.binds
      );
      const engagements = await first(
        env2,
        user.role === "auditor" ? `SELECT COUNT(*) AS n, SUM(CASE WHEN phase != 'closed' THEN 1 ELSE 0 END) AS active
         FROM engagements WHERE lead_auditor_id = ?
            OR id IN (SELECT engagement_id FROM engagement_team WHERE user_id = ?)` : user.role === "mda_liaison" ? `SELECT COUNT(*) AS n, SUM(CASE WHEN e.phase != 'closed' THEN 1 ELSE 0 END) AS active
           FROM engagements e JOIN audit_universe au ON au.id = e.universe_id
           WHERE au.mda_name = ?` : `SELECT COUNT(*) AS n, SUM(CASE WHEN phase != 'closed' THEN 1 ELSE 0 END) AS active FROM engagements`,
        ...user.role === "auditor" ? [user.id, user.id] : user.role === "mda_liaison" ? [user.mdaId ?? ""] : []
      );
      const recentActivity = await all(
        env2,
        "SELECT id, action, entity, entity_id, created_at FROM audit_log ORDER BY created_at DESC LIMIT 10"
      );
      const findings = totals?.findings ?? 0;
      const closed = totals?.closed ?? 0;
      return json({
        data: {
          kpis: {
            findings,
            open: findings - closed,
            closed,
            resolutionRate: findings > 0 ? Math.round(closed / findings * 1e3) / 10 : 0,
            overdueRecommendations: overdue?.n ?? 0,
            engagements: engagements?.n ?? 0,
            activeEngagements: engagements?.active ?? 0
          },
          bySeverity,
          byStatus,
          trend,
          recentActivity
        }
      });
    }, "onRequestGet");
  }
});

// api/portal/engagements/index.ts
var READ_ROLES3, WRITE_ROLES7, LIST_SELECT, CreateBody2, onRequestGet37, onRequestPost29;
var init_engagements = __esm({
  "api/portal/engagements/index.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_session_auth();
    init_audit_log();
    init_notify();
    init_time();
    init_zod();
    READ_ROLES3 = ["admin", "director", "manager", "auditor"];
    WRITE_ROLES7 = ["admin", "director", "manager"];
    LIST_SELECT = `
  SELECT e.id, e.code, e.title, e.universe_id, e.plan_item_id, e.phase,
         e.lead_auditor_id, e.start_date, e.end_date, e.overall_rating, e.created_at,
         au.mda_name, au.unit_name, u.name AS lead_auditor_name
  FROM engagements e
  JOIN audit_universe au ON au.id = e.universe_id
  LEFT JOIN users u ON u.id = e.lead_auditor_id`;
    CreateBody2 = external_exports.object({
      title: external_exports.string().min(1).max(300),
      universe_id: external_exports.string().min(1),
      plan_item_id: external_exports.string().optional(),
      lead_auditor_id: external_exports.string().optional(),
      start_date: external_exports.string().min(4).max(40)
    });
    onRequestGet37 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireSession(request, env2, READ_ROLES3);
      if (auth.kind === "reject")
        return auth.response;
      const rows = auth.user.role === "auditor" ? await all(
        env2,
        `${LIST_SELECT}
           WHERE e.lead_auditor_id = ?
              OR e.id IN (SELECT engagement_id FROM engagement_team WHERE user_id = ?)
           ORDER BY e.created_at DESC`,
        auth.user.id,
        auth.user.id
      ) : await all(env2, `${LIST_SELECT} ORDER BY e.created_at DESC`);
      return json({ data: rows });
    }, "onRequestGet");
    onRequestPost29 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireSession(request, env2, WRITE_ROLES7);
      if (auth.kind === "reject")
        return auth.response;
      const parsed = await parseBody(request, CreateBody2);
      if (parsed.kind === "reject")
        return parsed.response;
      const v = parsed.value;
      const universe = await first(
        env2,
        "SELECT id FROM audit_universe WHERE id = ?",
        v.universe_id
      );
      if (!universe) {
        return json({ error: { code: "NOT_FOUND", message: "universe entry not found" } }, { status: 404 });
      }
      const year = Number(v.start_date.slice(0, 4)) || (/* @__PURE__ */ new Date()).getFullYear();
      const seq = await first(
        env2,
        "SELECT COUNT(*) AS n FROM engagements WHERE code LIKE ?",
        `ENG-${year}-%`
      );
      const code = `ENG-${year}-${String((seq?.n ?? 0) + 1).padStart(3, "0")}`;
      const id = crypto.randomUUID();
      await run(
        env2,
        `INSERT INTO engagements (id, code, title, universe_id, plan_item_id, phase, lead_auditor_id, start_date, created_at)
     VALUES (?, ?, ?, ?, ?, 'planning', ?, ?, ?)`,
        id,
        code,
        v.title,
        v.universe_id,
        v.plan_item_id ?? null,
        v.lead_auditor_id ?? null,
        v.start_date,
        nowIso()
      );
      if (v.lead_auditor_id) {
        await createNotification(env2, v.lead_auditor_id, "engagement_assigned", {
          engagement_id: id,
          code,
          title: v.title,
          role: "lead"
        });
      }
      await writeAuditLog(env2, {
        userId: auth.user.id,
        action: "create",
        entity: "engagement",
        entityId: id,
        meta: { code, title: v.title }
      });
      return json({ data: { id, code } }, { status: 201 });
    }, "onRequestPost");
  }
});

// api/portal/findings/index.ts
var LIST_SELECT2, CreateBody3, onRequestGet38, onRequestPost30;
var init_findings = __esm({
  "api/portal/findings/index.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_session_auth();
    init_portal_access();
    init_notify();
    init_audit_log();
    init_time();
    init_zod();
    LIST_SELECT2 = `
  SELECT f.id, f.engagement_id, f.universe_id, f.title, f.description, f.category,
         f.severity, f.condition, f.criteria, f.cause, f.effect, f.status, f.closed_at, f.created_at,
         au.mda_name, au.unit_name, e.code AS engagement_code
  FROM findings f
  JOIN audit_universe au ON au.id = f.universe_id
  JOIN engagements e ON e.id = f.engagement_id`;
    CreateBody3 = external_exports.object({
      engagement_id: external_exports.string().min(1),
      title: external_exports.string().min(1).max(300),
      description: external_exports.string().min(1).max(1e4),
      category: external_exports.string().min(1).max(120),
      severity: external_exports.enum(["high", "medium", "low"]),
      condition: external_exports.string().max(5e3).optional(),
      criteria: external_exports.string().max(5e3).optional(),
      cause: external_exports.string().max(5e3).optional(),
      effect: external_exports.string().max(5e3).optional()
    });
    onRequestGet38 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireSession(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      const user = auth.user;
      let rows;
      if (user.role === "auditor") {
        rows = await all(
          env2,
          `${LIST_SELECT2}
       WHERE f.engagement_id IN (
         SELECT id FROM engagements WHERE lead_auditor_id = ?
         UNION SELECT engagement_id FROM engagement_team WHERE user_id = ?)
       ORDER BY f.created_at DESC`,
          user.id,
          user.id
        );
      } else if (user.role === "mda_liaison") {
        rows = await all(
          env2,
          `${LIST_SELECT2} WHERE au.mda_name = ? ORDER BY f.created_at DESC`,
          user.mdaId ?? ""
        );
      } else {
        rows = await all(env2, `${LIST_SELECT2} ORDER BY f.created_at DESC`);
      }
      return json({ data: rows });
    }, "onRequestGet");
    onRequestPost30 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireSession(request, env2, ["admin", "director", "manager", "auditor"]);
      if (auth.kind === "reject")
        return auth.response;
      const parsed = await parseBody(request, CreateBody3);
      if (parsed.kind === "reject")
        return parsed.response;
      const v = parsed.value;
      const engagement = await first(
        env2,
        "SELECT id, universe_id FROM engagements WHERE id = ?",
        v.engagement_id
      );
      if (!engagement) {
        return json({ error: { code: "NOT_FOUND", message: "engagement not found" } }, { status: 404 });
      }
      if (!await canAccessEngagement(env2, auth.user, v.engagement_id)) {
        return json({ error: { code: "AUTH_FORBIDDEN", message: "no access to this engagement" } }, { status: 403 });
      }
      const id = crypto.randomUUID();
      await run(
        env2,
        `INSERT INTO findings (id, engagement_id, universe_id, title, description, category, severity,
                           condition, criteria, cause, effect, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'open', ?)`,
        id,
        v.engagement_id,
        engagement.universe_id,
        v.title,
        v.description,
        v.category,
        v.severity,
        v.condition ?? null,
        v.criteria ?? null,
        v.cause ?? null,
        v.effect ?? null,
        nowIso()
      );
      await notifyEngagementTeam(env2, v.engagement_id, "finding_assigned", {
        finding_id: id,
        engagement_id: v.engagement_id,
        title: v.title,
        severity: v.severity
      });
      await writeAuditLog(env2, {
        userId: auth.user.id,
        action: "create",
        entity: "finding",
        entityId: id,
        meta: { engagement_id: v.engagement_id, severity: v.severity }
      });
      return json({ data: { id } }, { status: 201 });
    }, "onRequestPost");
  }
});

// api/portal/notifications/index.ts
var onRequestGet39;
var init_notifications = __esm({
  "api/portal/notifications/index.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_db();
    init_session_auth();
    onRequestGet39 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireSession(request, env2);
      if (auth.kind === "reject")
        return auth.response;
      const rows = await all(
        env2,
        "SELECT id, type, payload_json, read, created_at FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 100",
        auth.user.id
      );
      return json({
        data: rows.map(
          (r) => ({
            id: r.id,
            type: r.type,
            payload: JSON.parse(r.payload_json),
            read: r.read === 1,
            created_at: r.created_at
          })
        )
      });
    }, "onRequestGet");
  }
});

// api/portal/plans/index.ts
var READ_ROLES4, WRITE_ROLES8, CreateBody4, onRequestGet40, onRequestPost31;
var init_plans = __esm({
  "api/portal/plans/index.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_session_auth();
    init_audit_log();
    init_time();
    init_zod();
    READ_ROLES4 = ["admin", "director", "manager", "auditor"];
    WRITE_ROLES8 = ["admin", "director", "manager"];
    CreateBody4 = external_exports.object({
      year: external_exports.number().int().min(2e3).max(2100),
      title: external_exports.string().min(1).max(300),
      status: external_exports.enum(["draft", "submitted", "approved"]).optional()
    });
    onRequestGet40 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireSession(request, env2, READ_ROLES4);
      if (auth.kind === "reject")
        return auth.response;
      const rows = await all(
        env2,
        `SELECT p.id, p.year, p.title, p.status, p.created_by, p.created_at,
            (SELECT COUNT(*) FROM plan_items pi WHERE pi.plan_id = p.id) AS item_count
     FROM audit_plans p
     ORDER BY p.year DESC, p.created_at DESC`
      );
      return json({ data: rows });
    }, "onRequestGet");
    onRequestPost31 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireSession(request, env2, WRITE_ROLES8);
      if (auth.kind === "reject")
        return auth.response;
      const parsed = await parseBody(request, CreateBody4);
      if (parsed.kind === "reject")
        return parsed.response;
      const v = parsed.value;
      const id = crypto.randomUUID();
      await run(
        env2,
        "INSERT INTO audit_plans (id, year, title, status, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?)",
        id,
        v.year,
        v.title,
        v.status ?? "draft",
        auth.user.id,
        nowIso()
      );
      await writeAuditLog(env2, {
        userId: auth.user.id,
        action: "create",
        entity: "audit_plan",
        entityId: id,
        meta: { year: v.year, title: v.title }
      });
      return json({ data: { id } }, { status: 201 });
    }, "onRequestPost");
  }
});

// api/portal/universe/index.ts
var READ_ROLES5, WRITE_ROLES9, CreateBody5, onRequestGet41, onRequestPost32;
var init_universe = __esm({
  "api/portal/universe/index.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_session_auth();
    init_audit_log();
    init_time();
    init_zod();
    READ_ROLES5 = ["admin", "director", "manager", "auditor"];
    WRITE_ROLES9 = ["admin", "director", "manager"];
    CreateBody5 = external_exports.object({
      mda_name: external_exports.string().min(1).max(200),
      unit_name: external_exports.string().min(1).max(200),
      category: external_exports.string().min(1).max(120),
      risk_likelihood: external_exports.number().int().min(1).max(5),
      risk_impact: external_exports.number().int().min(1).max(5),
      last_audited_at: external_exports.string().max(40).optional(),
      notes: external_exports.string().max(2e3).optional()
    });
    onRequestGet41 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireSession(request, env2, READ_ROLES5);
      if (auth.kind === "reject")
        return auth.response;
      const rows = await all(
        env2,
        `SELECT id, mda_name, unit_name, category, risk_likelihood, risk_impact,
            risk_likelihood * risk_impact AS risk_score,
            last_audited_at, notes, created_at
     FROM audit_universe
     ORDER BY risk_score DESC, mda_name ASC`
      );
      return json({ data: rows });
    }, "onRequestGet");
    onRequestPost32 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireSession(request, env2, WRITE_ROLES9);
      if (auth.kind === "reject")
        return auth.response;
      const parsed = await parseBody(request, CreateBody5);
      if (parsed.kind === "reject")
        return parsed.response;
      const v = parsed.value;
      const id = crypto.randomUUID();
      await run(
        env2,
        `INSERT INTO audit_universe (id, mda_name, unit_name, category, risk_likelihood, risk_impact, last_audited_at, notes, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        id,
        v.mda_name,
        v.unit_name,
        v.category,
        v.risk_likelihood,
        v.risk_impact,
        v.last_audited_at ?? null,
        v.notes ?? null,
        nowIso()
      );
      await writeAuditLog(env2, {
        userId: auth.user.id,
        action: "create",
        entity: "audit_universe",
        entityId: id,
        meta: { mda_name: v.mda_name, unit_name: v.unit_name }
      });
      return json({ data: { id } }, { status: 201 });
    }, "onRequestPost");
  }
});

// api/portal/users.ts
var ROLES9, onRequestGet42;
var init_users2 = __esm({
  "api/portal/users.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_db();
    init_session_auth();
    ROLES9 = ["admin", "director", "manager"];
    onRequestGet42 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const auth = await requireSession(request, env2, ROLES9);
      if (auth.kind === "reject")
        return auth.response;
      const rows = await all(
        env2,
        "SELECT id, name, email, role, mda_id FROM users WHERE active = 1 ORDER BY name ASC"
      );
      return json({ data: rows });
    }, "onRequestGet");
  }
});

// api/public/registry/index.ts
function toResponse(rows) {
  return rows.map((r) => ({
    name: r.name,
    grade: r.grade,
    mda_name: r.mda_name,
    public_slug: r.public_slug,
    verified: true,
    credentials: r.credential_bodies ? r.credential_bodies.split(",") : []
  }));
}
var SELECT, onRequestGet43;
var init_registry2 = __esm({
  "api/public/registry/index.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_db();
    __name(toResponse, "toResponse");
    SELECT = `
  SELECT a.name, a.grade, a.mda_name, a.public_slug,
         (SELECT GROUP_CONCAT(c.body) FROM credentials c
          WHERE c.auditor_id = a.id AND c.verified = 1) AS credential_bodies
  FROM auditors a`;
    onRequestGet43 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const q = (new URL(request.url).searchParams.get("q") ?? "").trim();
      const rows = q ? await all(
        env2,
        `${SELECT}
         WHERE a.verified = 1 AND (a.name LIKE ? OR a.mda_name LIKE ?)
         ORDER BY a.name ASC LIMIT 50`,
        `%${q}%`,
        `%${q}%`
      ) : await all(
        env2,
        `${SELECT} WHERE a.verified = 1 ORDER BY a.name ASC LIMIT 50`
      );
      return json(
        { data: toResponse(rows) },
        { headers: { "cache-control": "public, max-age=300" } }
      );
    }, "onRequestGet");
  }
});

// api/system/run-deadlines.ts
var STALE_CLAIM_MS, onRequestPost33;
var init_run_deadlines = __esm({
  "api/system/run-deadlines.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_db();
    init_hmac();
    STALE_CLAIM_MS = 30 * 60 * 1e3;
    onRequestPost33 = /* @__PURE__ */ __name(async ({
      request,
      env: env2
    }) => {
      const auth = request.headers.get("Authorization") ?? "";
      if (!env2.SYSTEM_CRON_SECRET) {
        return json({ error: "unauthorized" }, { status: 401 });
      }
      const expected = `Bearer ${env2.SYSTEM_CRON_SECRET}`;
      if (!constantTimeEquals(auth, expected)) {
        return json({ error: "unauthorized" }, { status: 401 });
      }
      const now = Date.now();
      await run(
        env2,
        "UPDATE applications SET review_claimed_by = NULL, review_claimed_at = NULL WHERE review_claimed_at IS NOT NULL AND review_claimed_at < ?",
        now - STALE_CLAIM_MS
      );
      const expired = await all(
        env2,
        "SELECT a.id FROM applications a JOIN application_review_decisions ard ON ard.application_id = a.id JOIN recruitment_exercises e ON e.id = a.exercise_id WHERE a.status = 'requires_action' AND ard.outcome = 'requires_action' AND ard.created_at + (e.vetting_window_days * 86400000) < ?",
        now
      );
      for (const row of expired) {
        await run(
          env2,
          "INSERT INTO status_transitions (id, application_id, from_status, to_status, actor_email, actor_role, reason, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          `tx_${now}_${Math.random().toString(36).slice(2, 10)}`,
          row.id,
          "requires_action",
          "vetting_failed",
          null,
          "system",
          "Resubmission deadline expired",
          now
        );
        await run(
          env2,
          "UPDATE applications SET status = 'vetting_failed' WHERE id = ? AND status = 'requires_action'",
          row.id
        );
      }
      return json({ data: { ran_at: now, expired_count: expired.length } });
    }, "onRequestPost");
  }
});

// api/v1/submissions.ts
function generateReference2(type) {
  const prefix = TYPE_PREFIX[type] ?? "GEN";
  const d = /* @__PURE__ */ new Date();
  const ymd = String(d.getUTCFullYear()) + String(d.getUTCMonth() + 1).padStart(2, "0") + String(d.getUTCDate()).padStart(2, "0");
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  let suffix = "";
  for (const b of bytes)
    suffix += SUFFIX_ALPHABET[b % SUFFIX_ALPHABET.length];
  return `OHCS-${prefix}-${ymd}-${suffix}`;
}
var Body19, TYPE_PREFIX, RATE_LIMIT_WINDOW_MS5, RATE_LIMIT_MAX4, SUFFIX_ALPHABET, onRequestPost34;
var init_submissions = __esm({
  "api/v1/submissions.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_time();
    init_zod();
    Body19 = external_exports.object({
      type: external_exports.enum(["special_audit", "consultancy", "fraud_report", "rti", "complaint", "feedback"]),
      name: external_exports.string().max(200).optional(),
      email: external_exports.string().email().max(320).optional().or(external_exports.literal("")),
      phone: external_exports.string().max(20).optional(),
      subject: external_exports.string().max(500).optional(),
      body: external_exports.string().min(10).max(5e3)
    });
    TYPE_PREFIX = {
      special_audit: "AUD",
      consultancy: "CON",
      fraud_report: "FRD",
      rti: "RTI",
      complaint: "CMP",
      feedback: "FDB"
    };
    RATE_LIMIT_WINDOW_MS5 = 60 * 60 * 1e3;
    RATE_LIMIT_MAX4 = 20;
    SUFFIX_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    __name(generateReference2, "generateReference");
    onRequestPost34 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const parsed = await parseBody(request, Body19);
      if (parsed.kind === "reject")
        return parsed.response;
      const v = parsed.value;
      const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
      const recent = await first(
        env2,
        "SELECT COUNT(*) AS n FROM audit_log WHERE action = 'public_submission' AND entity_id = ? AND created_at > ?",
        ip,
        new Date(Date.now() - RATE_LIMIT_WINDOW_MS5).toISOString()
      );
      if (recent && recent.n >= RATE_LIMIT_MAX4) {
        return json(
          { error: { code: "RATE_LIMITED", message: "too many submissions; please try again later" } },
          { status: 429, headers: { "retry-after": "3600" } }
        );
      }
      const id = crypto.randomUUID();
      const reference = generateReference2(v.type);
      const now = nowIso();
      await run(
        env2,
        `INSERT INTO submissions (id, reference_number, type, status, name, email, phone, subject, body, created_at, updated_at)
     VALUES (?, ?, ?, 'received', ?, ?, ?, ?, ?, ?, ?)`,
        id,
        reference,
        v.type,
        v.name?.trim() || null,
        v.email?.trim() || null,
        v.phone?.trim() || null,
        v.subject?.trim() || null,
        v.body,
        now,
        now
      );
      await run(
        env2,
        "INSERT INTO submission_status_history (id, submission_id, status, note, created_at) VALUES (?, ?, ?, ?, ?)",
        crypto.randomUUID(),
        id,
        "received",
        "Submission received",
        now
      );
      await run(
        env2,
        "INSERT INTO audit_log (id, user_id, action, entity, entity_id, meta_json, created_at) VALUES (?, NULL, ?, ?, ?, ?, ?)",
        crypto.randomUUID(),
        "public_submission",
        "submission",
        ip,
        JSON.stringify({ reference_number: reference, type: v.type }),
        now
      );
      return json(
        {
          data: {
            referenceNumber: reference,
            status: "received",
            message: "Your submission has been received. Keep your reference number to track progress."
          }
        },
        { status: 201 }
      );
    }, "onRequestPost");
  }
});

// api/v1/track.ts
var Body20, onRequestPost35;
var init_track2 = __esm({
  "api/v1/track.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_validate();
    init_db();
    init_zod();
    Body20 = external_exports.object({
      referenceNumber: external_exports.string().regex(/^OHCS-[A-Z]{3}-\d{8}-[A-Z0-9]{4}$/),
      contact: external_exports.string().min(1).max(320)
    });
    onRequestPost35 = /* @__PURE__ */ __name(async ({ request, env: env2 }) => {
      const parsed = await parseBody(request, Body20);
      if (parsed.kind === "reject")
        return parsed.response;
      const { referenceNumber, contact } = parsed.value;
      const c = contact.trim().toLowerCase();
      const submission = await first(
        env2,
        `SELECT id, reference_number, type, status, subject, created_at, updated_at
     FROM submissions
     WHERE reference_number = ?
       AND (LOWER(email) = ? OR phone = ?)`,
        referenceNumber,
        c,
        contact.trim()
      );
      if (!submission) {
        return json(
          { error: { code: "NOT_FOUND", message: "no submission found for that reference and contact" } },
          { status: 404 }
        );
      }
      const timeline = await all(
        env2,
        "SELECT id, status, note, created_at FROM submission_status_history WHERE submission_id = ? ORDER BY created_at ASC",
        submission.id
      );
      return json({
        data: {
          referenceNumber: submission.reference_number,
          type: submission.type,
          status: submission.status,
          subject: submission.subject,
          createdAt: submission.created_at,
          updatedAt: submission.updated_at,
          timeline
        }
      });
    }, "onRequestPost");
  }
});

// api/auth-mode.ts
var onRequestGet44;
var init_auth_mode = __esm({
  "api/auth-mode.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    init_db();
    onRequestGet44 = /* @__PURE__ */ __name(async ({ env: env2 }) => {
      if (env2.APP_ENV === "production") {
        return json({ data: { demo_mode_enabled: false } });
      }
      const row = await first(
        env2,
        "SELECT value FROM site_config WHERE key = ?",
        "admin_demo_mode_enabled"
      );
      return json({ data: { demo_mode_enabled: row?.value === "true" } });
    }, "onRequestGet");
  }
});

// api/health.ts
async function checkD1(env2) {
  try {
    await env2.DB.prepare("SELECT 1 as ok").first();
    return "ok";
  } catch {
    return "error";
  }
}
async function checkR2(env2) {
  try {
    await env2.UPLOADS.head("__healthcheck__");
    return "ok";
  } catch {
    return "error";
  }
}
async function checkAI(env2) {
  try {
    await env2.AI.run("@cf/meta/llama-3.1-8b-instruct", {
      prompt: "ok",
      max_tokens: 1
    });
    return "ok";
  } catch {
    return "error";
  }
}
var onRequestGet45;
var init_health = __esm({
  "api/health.ts"() {
    "use strict";
    init_functionsRoutes_0_2375173483313784();
    init_strip_cf_connecting_ip_header();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_json();
    __name(checkD1, "checkD1");
    __name(checkR2, "checkR2");
    __name(checkAI, "checkAI");
    onRequestGet45 = /* @__PURE__ */ __name(async ({ env: env2 }) => {
      const [d1, r2, workers_ai] = await Promise.all([
        checkD1(env2),
        checkR2(env2),
        checkAI(env2)
      ]);
      const allOk = d1 === "ok" && r2 === "ok" && workers_ai === "ok";
      return json(
        {
          status: allOk ? "ok" : "degraded",
          checks: { d1, r2, workers_ai },
          app: env2.APP_NAME,
          env: env2.APP_ENV,
          version: "1.0.0",
          ts: Date.now()
        },
        { status: allOk ? 200 : 503 }
      );
    }, "onRequestGet");
  }
});

// ../.wrangler/tmp/pages-P8X8Oz/functionsRoutes-0.2375173483313784.mjs
var routes;
var init_functionsRoutes_0_2375173483313784 = __esm({
  "../.wrangler/tmp/pages-P8X8Oz/functionsRoutes-0.2375173483313784.mjs"() {
    "use strict";
    init_file();
    init_url();
    init_recipients();
    init_resolve();
    init_token();
    init_id2();
    init_id2();
    init_id2();
    init_docTypeId();
    init_docTypeId();
    init_token2();
    init_code();
    init_claim();
    init_claim();
    init_vetting();
    init_requirements();
    init_requirements();
    init_certificates();
    init_cpd();
    init_credentials();
    init_papers();
    init_team();
    init_recommendations();
    init_responses();
    init_responses();
    init_items();
    init_appeals();
    init_logout();
    init_me();
    init_start();
    init_audience_count();
    init_campaigns();
    init_campaigns();
    init_templates();
    init_templates();
    init_test_email();
    init_appeals2();
    init_logout2();
    init_requirements2();
    init_submit();
    init_logout3();
    init_me2();
    init_start2();
    init_read();
    init_by_mda();
    init_summary();
    init_id3();
    init_id4();
    init_id4();
    init_id4();
    init_id5();
    init_id6();
    init_id6();
    init_key();
    init_email2();
    init_email2();
    init_token3();
    init_id7();
    init_id7();
    init_id8();
    init_id8();
    init_id9();
    init_id10();
    init_id10();
    init_id11();
    init_id12();
    init_id12();
    init_slug();
    init_applications();
    init_document_types();
    init_document_types();
    init_exercises();
    init_exercises();
    init_registry();
    init_registry();
    init_site_config();
    init_users();
    init_users();
    init_me3();
    init_me3();
    init_start3();
    init_track();
    init_active();
    init_dashboard();
    init_engagements();
    init_engagements();
    init_findings();
    init_findings();
    init_notifications();
    init_plans();
    init_plans();
    init_universe();
    init_universe();
    init_users2();
    init_registry2();
    init_run_deadlines();
    init_submissions();
    init_track2();
    init_auth_mode();
    init_health();
    routes = [
      {
        routePath: "/api/admin/applications/:id/documents/:docTypeId/file",
        mountPath: "/api/admin/applications/:id/documents/:docTypeId",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet]
      },
      {
        routePath: "/api/admin/applications/:id/documents/:docTypeId/url",
        mountPath: "/api/admin/applications/:id/documents/:docTypeId",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet2]
      },
      {
        routePath: "/api/admin/comms/campaigns/:id/recipients",
        mountPath: "/api/admin/comms/campaigns/:id",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet3]
      },
      {
        routePath: "/api/admin/applications/:id/appeals/resolve",
        mountPath: "/api/admin/applications/:id/appeals",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost]
      },
      {
        routePath: "/api/admin/auth/magic/:token",
        mountPath: "/api/admin/auth/magic",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet4]
      },
      {
        routePath: "/api/admin/comms/templates/:id",
        mountPath: "/api/admin/comms/templates",
        method: "DELETE",
        middlewares: [],
        modules: [onRequestDelete]
      },
      {
        routePath: "/api/admin/comms/templates/:id",
        mountPath: "/api/admin/comms/templates",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet5]
      },
      {
        routePath: "/api/admin/comms/templates/:id",
        mountPath: "/api/admin/comms/templates",
        method: "PATCH",
        middlewares: [],
        modules: [onRequestPatch]
      },
      {
        routePath: "/api/applications/me/documents/:docTypeId",
        mountPath: "/api/applications/me/documents",
        method: "DELETE",
        middlewares: [],
        modules: [onRequestDelete2]
      },
      {
        routePath: "/api/applications/me/documents/:docTypeId",
        mountPath: "/api/applications/me/documents",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost2]
      },
      {
        routePath: "/api/portal/auth/magic/:token",
        mountPath: "/api/portal/auth/magic",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet6]
      },
      {
        routePath: "/api/public/certificates/verify/:code",
        mountPath: "/api/public/certificates/verify",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet7]
      },
      {
        routePath: "/api/admin/applications/:id/claim",
        mountPath: "/api/admin/applications/:id",
        method: "DELETE",
        middlewares: [],
        modules: [onRequestDelete3]
      },
      {
        routePath: "/api/admin/applications/:id/claim",
        mountPath: "/api/admin/applications/:id",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost3]
      },
      {
        routePath: "/api/admin/applications/:id/vetting",
        mountPath: "/api/admin/applications/:id",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost4]
      },
      {
        routePath: "/api/admin/exercises/:id/requirements",
        mountPath: "/api/admin/exercises/:id",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet8]
      },
      {
        routePath: "/api/admin/exercises/:id/requirements",
        mountPath: "/api/admin/exercises/:id",
        method: "PUT",
        middlewares: [],
        modules: [onRequestPut]
      },
      {
        routePath: "/api/admin/registry/:id/certificates",
        mountPath: "/api/admin/registry/:id",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost5]
      },
      {
        routePath: "/api/admin/registry/:id/cpd",
        mountPath: "/api/admin/registry/:id",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost6]
      },
      {
        routePath: "/api/admin/registry/:id/credentials",
        mountPath: "/api/admin/registry/:id",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost7]
      },
      {
        routePath: "/api/portal/engagements/:id/papers",
        mountPath: "/api/portal/engagements/:id",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost8]
      },
      {
        routePath: "/api/portal/engagements/:id/team",
        mountPath: "/api/portal/engagements/:id",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost9]
      },
      {
        routePath: "/api/portal/findings/:id/recommendations",
        mountPath: "/api/portal/findings/:id",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost10]
      },
      {
        routePath: "/api/portal/findings/:id/responses",
        mountPath: "/api/portal/findings/:id",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet9]
      },
      {
        routePath: "/api/portal/findings/:id/responses",
        mountPath: "/api/portal/findings/:id",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost11]
      },
      {
        routePath: "/api/portal/plans/:id/items",
        mountPath: "/api/portal/plans/:id",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost12]
      },
      {
        routePath: "/api/admin/applications/appeals",
        mountPath: "/api/admin/applications",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet10]
      },
      {
        routePath: "/api/admin/auth/logout",
        mountPath: "/api/admin/auth",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost13]
      },
      {
        routePath: "/api/admin/auth/me",
        mountPath: "/api/admin/auth",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet11]
      },
      {
        routePath: "/api/admin/auth/start",
        mountPath: "/api/admin/auth",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost14]
      },
      {
        routePath: "/api/admin/comms/audience-count",
        mountPath: "/api/admin/comms",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet12]
      },
      {
        routePath: "/api/admin/comms/campaigns",
        mountPath: "/api/admin/comms/campaigns",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet13]
      },
      {
        routePath: "/api/admin/comms/campaigns",
        mountPath: "/api/admin/comms/campaigns",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost15]
      },
      {
        routePath: "/api/admin/comms/templates",
        mountPath: "/api/admin/comms/templates",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet14]
      },
      {
        routePath: "/api/admin/comms/templates",
        mountPath: "/api/admin/comms/templates",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost16]
      },
      {
        routePath: "/api/admin/dev/test-email",
        mountPath: "/api/admin/dev",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost17]
      },
      {
        routePath: "/api/applications/me/appeals",
        mountPath: "/api/applications/me",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost18]
      },
      {
        routePath: "/api/applications/me/logout",
        mountPath: "/api/applications/me",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost19]
      },
      {
        routePath: "/api/applications/me/requirements",
        mountPath: "/api/applications/me",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet15]
      },
      {
        routePath: "/api/applications/me/submit",
        mountPath: "/api/applications/me",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost20]
      },
      {
        routePath: "/api/portal/auth/logout",
        mountPath: "/api/portal/auth",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost21]
      },
      {
        routePath: "/api/portal/auth/me",
        mountPath: "/api/portal/auth",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet16]
      },
      {
        routePath: "/api/portal/auth/start",
        mountPath: "/api/portal/auth",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost22]
      },
      {
        routePath: "/api/portal/notifications/read",
        mountPath: "/api/portal/notifications",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost23]
      },
      {
        routePath: "/api/public/transparency/by-mda",
        mountPath: "/api/public/transparency",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet17]
      },
      {
        routePath: "/api/public/transparency/summary",
        mountPath: "/api/public/transparency",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet18]
      },
      {
        routePath: "/api/admin/applications/:id",
        mountPath: "/api/admin/applications",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet19]
      },
      {
        routePath: "/api/admin/document-types/:id",
        mountPath: "/api/admin/document-types",
        method: "DELETE",
        middlewares: [],
        modules: [onRequestDelete4]
      },
      {
        routePath: "/api/admin/document-types/:id",
        mountPath: "/api/admin/document-types",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet20]
      },
      {
        routePath: "/api/admin/document-types/:id",
        mountPath: "/api/admin/document-types",
        method: "PATCH",
        middlewares: [],
        modules: [onRequestPatch2]
      },
      {
        routePath: "/api/admin/exercises/:id",
        mountPath: "/api/admin/exercises",
        method: "PATCH",
        middlewares: [],
        modules: [onRequestPatch3]
      },
      {
        routePath: "/api/admin/registry/:id",
        mountPath: "/api/admin/registry",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet21]
      },
      {
        routePath: "/api/admin/registry/:id",
        mountPath: "/api/admin/registry",
        method: "PATCH",
        middlewares: [],
        modules: [onRequestPatch4]
      },
      {
        routePath: "/api/admin/site-config/:key",
        mountPath: "/api/admin/site-config",
        method: "PUT",
        middlewares: [],
        modules: [onRequestPut2]
      },
      {
        routePath: "/api/admin/users/:email",
        mountPath: "/api/admin/users",
        method: "DELETE",
        middlewares: [],
        modules: [onRequestDelete5]
      },
      {
        routePath: "/api/admin/users/:email",
        mountPath: "/api/admin/users",
        method: "PATCH",
        middlewares: [],
        modules: [onRequestPatch5]
      },
      {
        routePath: "/api/applications/magic/:token",
        mountPath: "/api/applications/magic",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet22]
      },
      {
        routePath: "/api/portal/engagements/:id",
        mountPath: "/api/portal/engagements",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet23]
      },
      {
        routePath: "/api/portal/engagements/:id",
        mountPath: "/api/portal/engagements",
        method: "PATCH",
        middlewares: [],
        modules: [onRequestPatch6]
      },
      {
        routePath: "/api/portal/findings/:id",
        mountPath: "/api/portal/findings",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet24]
      },
      {
        routePath: "/api/portal/findings/:id",
        mountPath: "/api/portal/findings",
        method: "PATCH",
        middlewares: [],
        modules: [onRequestPatch7]
      },
      {
        routePath: "/api/portal/plan-items/:id",
        mountPath: "/api/portal/plan-items",
        method: "PATCH",
        middlewares: [],
        modules: [onRequestPatch8]
      },
      {
        routePath: "/api/portal/plans/:id",
        mountPath: "/api/portal/plans",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet25]
      },
      {
        routePath: "/api/portal/plans/:id",
        mountPath: "/api/portal/plans",
        method: "PATCH",
        middlewares: [],
        modules: [onRequestPatch9]
      },
      {
        routePath: "/api/portal/recommendations/:id",
        mountPath: "/api/portal/recommendations",
        method: "PATCH",
        middlewares: [],
        modules: [onRequestPatch10]
      },
      {
        routePath: "/api/portal/universe/:id",
        mountPath: "/api/portal/universe",
        method: "DELETE",
        middlewares: [],
        modules: [onRequestDelete6]
      },
      {
        routePath: "/api/portal/universe/:id",
        mountPath: "/api/portal/universe",
        method: "PATCH",
        middlewares: [],
        modules: [onRequestPatch11]
      },
      {
        routePath: "/api/public/registry/:slug",
        mountPath: "/api/public/registry",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet26]
      },
      {
        routePath: "/api/admin/applications",
        mountPath: "/api/admin/applications",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet27]
      },
      {
        routePath: "/api/admin/document-types",
        mountPath: "/api/admin/document-types",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet28]
      },
      {
        routePath: "/api/admin/document-types",
        mountPath: "/api/admin/document-types",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost24]
      },
      {
        routePath: "/api/admin/exercises",
        mountPath: "/api/admin/exercises",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet29]
      },
      {
        routePath: "/api/admin/exercises",
        mountPath: "/api/admin/exercises",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost25]
      },
      {
        routePath: "/api/admin/registry",
        mountPath: "/api/admin/registry",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet30]
      },
      {
        routePath: "/api/admin/registry",
        mountPath: "/api/admin/registry",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost26]
      },
      {
        routePath: "/api/admin/site-config",
        mountPath: "/api/admin/site-config",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet31]
      },
      {
        routePath: "/api/admin/users",
        mountPath: "/api/admin/users",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet32]
      },
      {
        routePath: "/api/admin/users",
        mountPath: "/api/admin/users",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost27]
      },
      {
        routePath: "/api/applications/me",
        mountPath: "/api/applications",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet33]
      },
      {
        routePath: "/api/applications/me",
        mountPath: "/api/applications",
        method: "PATCH",
        middlewares: [],
        modules: [onRequestPatch12]
      },
      {
        routePath: "/api/applications/start",
        mountPath: "/api/applications",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost28]
      },
      {
        routePath: "/api/applications/track",
        mountPath: "/api/applications",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet34]
      },
      {
        routePath: "/api/exercises/active",
        mountPath: "/api/exercises",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet35]
      },
      {
        routePath: "/api/portal/dashboard",
        mountPath: "/api/portal",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet36]
      },
      {
        routePath: "/api/portal/engagements",
        mountPath: "/api/portal/engagements",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet37]
      },
      {
        routePath: "/api/portal/engagements",
        mountPath: "/api/portal/engagements",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost29]
      },
      {
        routePath: "/api/portal/findings",
        mountPath: "/api/portal/findings",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet38]
      },
      {
        routePath: "/api/portal/findings",
        mountPath: "/api/portal/findings",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost30]
      },
      {
        routePath: "/api/portal/notifications",
        mountPath: "/api/portal/notifications",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet39]
      },
      {
        routePath: "/api/portal/plans",
        mountPath: "/api/portal/plans",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet40]
      },
      {
        routePath: "/api/portal/plans",
        mountPath: "/api/portal/plans",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost31]
      },
      {
        routePath: "/api/portal/universe",
        mountPath: "/api/portal/universe",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet41]
      },
      {
        routePath: "/api/portal/universe",
        mountPath: "/api/portal/universe",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost32]
      },
      {
        routePath: "/api/portal/users",
        mountPath: "/api/portal",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet42]
      },
      {
        routePath: "/api/public/registry",
        mountPath: "/api/public/registry",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet43]
      },
      {
        routePath: "/api/system/run-deadlines",
        mountPath: "/api/system",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost33]
      },
      {
        routePath: "/api/v1/submissions",
        mountPath: "/api/v1",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost34]
      },
      {
        routePath: "/api/v1/track",
        mountPath: "/api/v1",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost35]
      },
      {
        routePath: "/api/auth-mode",
        mountPath: "/api",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet44]
      },
      {
        routePath: "/api/health",
        mountPath: "/api",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet45]
      }
    ];
  }
});

// ../.wrangler/tmp/bundle-FYeu1P/middleware-loader.entry.ts
init_functionsRoutes_0_2375173483313784();
init_strip_cf_connecting_ip_header();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// ../.wrangler/tmp/bundle-FYeu1P/middleware-insertion-facade.js
init_functionsRoutes_0_2375173483313784();
init_strip_cf_connecting_ip_header();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// ../node_modules/wrangler/templates/pages-template-worker.ts
init_functionsRoutes_0_2375173483313784();
init_strip_cf_connecting_ip_header();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// ../node_modules/wrangler/node_modules/path-to-regexp/dist.es2015/index.js
init_functionsRoutes_0_2375173483313784();
init_strip_cf_connecting_ip_header();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count3 = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count3--;
          if (count3 === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count3++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count3)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
function parse3(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a2 = options.prefixes, prefixes = _a2 === void 0 ? "./" : _a2, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a3 = tokens[i], nextType = _a3.type, index = _a3.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse3, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a2 = options.decode, decode3 = _a2 === void 0 ? function(x) {
    return x;
  } : _a2;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode3(value, key);
        });
      } else {
        params[key.name] = decode3(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse3(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a2 = options.strict, strict = _a2 === void 0 ? false : _a2, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode3 = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode3(token));
    } else {
      var prefix = escapeString(encode3(token.prefix));
      var suffix = escapeString(encode3(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");

// ../node_modules/wrangler/templates/pages-template-worker.ts
var escapeRegex2 = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex2, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex2, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex2, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex2, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env2, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name(async (input, init) => {
      if (input !== void 0) {
        let url2 = input;
        if (typeof input === "string") {
          url2 = new URL(input, request.url).toString();
        }
        request = new Request(url2, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context2 = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env: env2,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: () => {
            isFailOpen = true;
          }
        };
        const response = await handler(context2);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env2["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error50) {
      if (isFailOpen) {
        const response = await env2["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error50;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");

// ../node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_functionsRoutes_0_2375173483313784();
init_strip_cf_connecting_ip_header();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var drainBody = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_functionsRoutes_0_2375173483313784();
init_strip_cf_connecting_ip_header();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } catch (e) {
    const error50 = reduceError(e);
    return Response.json(error50, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// ../.wrangler/tmp/bundle-FYeu1P/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_template_worker_default;

// ../node_modules/wrangler/templates/middleware/common.ts
init_functionsRoutes_0_2375173483313784();
init_strip_cf_connecting_ip_header();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env2, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env2, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env2, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env2, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// ../.wrangler/tmp/bundle-FYeu1P/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env2, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env2, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env2, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env2, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env2, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env2, ctx) => {
      this.env = env2;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=functionsWorker-0.7994545379154132.mjs.map
