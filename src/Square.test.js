import React from "react";
import {create, act} from 'react-test-renderer';

import { CurrentGameContext } from "./CurrentGameContext";
import Square from "./Square.jsx";

describe("Square Component", function(){
    describe("click handler", function(){
        test("has no click handler when clickable is false", function(){
            let testRendererInstance;
            act(()=>{
                testRendererInstance = create(
                    <Square isClickable={false} />
                );
            });

            const root = testRendererInstance.root.children[0];
            expect(root.props.onClick).toBeFalsy();
        });

        test("has click handler when clickable is true", function(){
            let testRendererInstance;
            const mockFunction = ()=>{};
            act(()=>{
                testRendererInstance = create(
                    <Square isClickable={true} onClick={mockFunction} />
                );
            });

            const root = testRendererInstance.root.children[0];
            expect(root.props.onClick).toBeTruthy();
        });
    });

    describe("isWinning", function(){
        it("displays style class for winning when isWinning is true", function(){
            let testRendererInstance;
            const mockFunction = ()=>{};
            act(()=>{
                testRendererInstance = create(
                    <Square isWinning={true} onClick={mockFunction} />
                );
            });

            const root = testRendererInstance.root.children[0];
            expect(root.props.className).toContain("square--winning");
        });
        it("does not display style class for winning when isWinning is false", function(){
            let testRendererInstance;
            const mockFunction = ()=>{};
            act(()=>{
                testRendererInstance = create(
                    <Square isWinning={false} onClick={mockFunction} />
                );
            });

            const root = testRendererInstance.root.children[0];
            expect(root.props.className).not.toContain("square--winning");
        });
    });
    describe("isClickable", function(){
        it("displays style class for clickable square when isClickable is true", function(){
            let testRendererInstance;
            const mockFunction = ()=>{};
            act(()=>{
                testRendererInstance = create(
                    <Square isClickable={true} onClick={mockFunction} />
                );
            });

            const root = testRendererInstance.root.children[0];
            expect(root.props.className).toContain("square--clickable");
        });
        it("does not display style class for clickable square when isClickable is false", function(){
            let testRendererInstance;
            const mockFunction = ()=>{};
            act(()=>{
                testRendererInstance = create(
                    <Square isClickable={false} onClick={mockFunction} />
                );
            });

            const root = testRendererInstance.root.children[0];
            expect(root.props.className).not.toContain("square--clickable");
        });
    });
});