import React, {useContext, useState, createContext, useEffect} from "react";
import * as telemetryApi from "./telemetryApi.js";

export function withTelemetryExecutionTimeProfiler(componentName, callback = ()=>{}) {
    return((...props)=>{
        telemetryApi.trace("execution time start", componentName);
        callback(...props);
        telemetryApi.trace("execution time end", componentName);
    });
}

export function useTelemetryTraceMountUnmount(componentName, deps = []) {
    // hook that starts a trace on mount of the component
    // and stops the trace on unmount of the component
    useEffect(()=>{
        // start trace
        telemetryApi.trace("component mounted", componentName)
        return ()=>{
            // cleanup
            telemetryApi.trace("component unmounted", componentName);
        }
    }, deps)
}

export function telemetryActionReduce(action, componentName) {
    telemetryApi.trace("ActionReduced: " + action.type, componentName);
}