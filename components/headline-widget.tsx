"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Copy,
  Sparkles,
  Type,
  RotateCcw,
  Palette,
  Zap,
} from "lucide-react";
import {
  DEFAULT_SETTINGS,
  DEFAULT_TEMPLATES,
  FONT_FAMILIES,
  FONT_WEIGHTS,
  UNDERLINE_STYLES,
} from "@/constans/constance";
import { IHeadlineSettings } from "@/types/style.type";

const gradientDirections = [
  { value: "to-r", label: "→ Right" },
  { value: "to-l", label: "← Left" },
  { value: "to-b", label: "↓ Down" },
  { value: "to-t", label: "↑ Up" },
];

export function HeadlineWidget() {
  // Local state
  const [settings, setSettings] = useState<IHeadlineSettings>(DEFAULT_SETTINGS);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
      {/* Controls Panel */}
      <div className="lg:col-span-1 space-y-4">
        <Card className="p-4 bg-sidebar border-sidebar-border">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-sidebar-foreground flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Quick Start
            </h2>
            <Button
              variant="outline"
              size="sm"
              className="border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/10 bg-transparent"
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Reset
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {DEFAULT_TEMPLATES.map((preset, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/10 h-auto py-2 px-3"
              >
                {preset.name}
              </Button>
            ))}
          </div>
        </Card>

        <Card className="p-4 bg-sidebar border-sidebar-border">
          <h2 className="text-lg font-semibold text-sidebar-foreground">
            Typography Controls
          </h2>

          <div className="space-y-3">
            <div>
              <Label
                htmlFor="headline-text"
                className="text-sidebar-foreground text-sm"
              >
                Headline Text
              </Label>
              <Input
                id="headline-text"
                value={settings.text}
                className="mt-1 bg-input border-border text-sm"
                placeholder="Enter your headline..."
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sidebar-foreground text-sm">
                  Font Size: {settings.fontSize}px
                </Label>
                <Slider
                  value={[settings.fontSize]}
                  min={12}
                  max={120}
                  step={1}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sidebar-foreground text-sm">
                  Letter Spacing: {settings.letterSpacing}px
                </Label>
                <Slider
                  value={[settings.letterSpacing]}
                  min={-2}
                  max={10}
                  step={0.1}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sidebar-foreground text-sm">
                  Font Family
                </Label>
                <Select value={settings.fontFamily}>
                  <SelectTrigger className="mt-1 w-full bg-input border-border text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FONT_FAMILIES.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sidebar-foreground text-sm">
                  Font Weight
                </Label>
                <Select value={settings.fontWeight}>
                  <SelectTrigger className="mt-1 w-full bg-input border-border text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FONT_WEIGHTS.map((weight) => (
                      <SelectItem key={weight.value} value={weight.value}>
                        {weight.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-sidebar-foreground text-sm">
                Line Height: {settings.lineHeight}
              </Label>
              <Slider
                value={[settings.lineHeight]}
                min={0.8}
                max={2}
                step={0.1}
                className="mt-1"
              />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-sidebar border-sidebar-border">
          <h2 className="text-lg font-semibold text-sidebar-foreground flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Color & Gradient
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sidebar-foreground text-sm">
                Enable Gradient
              </Label>
              <Switch checked={settings.hasGradient} />
            </div>

            {!settings.hasGradient ? (
              <div>
                <Label className="text-sidebar-foreground text-sm">
                  Text Color
                </Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input
                    type="color"
                    value={settings.color}
                    className="w-10 h-8 p-1 border-border"
                  />
                  <Input
                    value={settings.color}
                    className="flex-1 bg-input border-border text-sm"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <Label className="text-sidebar-foreground text-sm">
                    Gradient Direction
                  </Label>
                  <Select value={settings.gradientDirection}>
                    <SelectTrigger className="mt-1 bg-input border-border text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {gradientDirections.map((direction) => (
                        <SelectItem
                          key={direction.value}
                          value={direction.value}
                        >
                          {direction.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sidebar-foreground text-sm">
                      Start Color
                    </Label>
                    <div className="flex items-center gap-1 mt-1">
                      <Input
                        type="color"
                        value={settings.gradientStart}
                        className="w-8 h-8 p-1 border-border"
                      />
                      <Input
                        value={settings.gradientStart}
                        className="flex-1 bg-input border-border text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sidebar-foreground text-sm">
                      End Color
                    </Label>
                    <div className="flex items-center gap-1 mt-1">
                      <Input
                        type="color"
                        value={settings.gradientEnd}
                        className="w-8 h-8 p-1 border-border"
                      />
                      <Input
                        value={settings.gradientEnd}
                        className="flex-1 bg-input border-border text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <Label className="text-sidebar-foreground text-sm">
                Text Shadow
              </Label>
              <Switch checked={settings.textShadow} />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-sidebar border-sidebar-border">
          <h2 className="text-lg font-semibold mb-3 text-sidebar-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Advanced Effects
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sidebar-foreground text-sm">
                Text Stroke
              </Label>
              <Switch checked={settings.textStroke} />
            </div>

            {settings.textStroke && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sidebar-foreground text-xs">
                    Width: {settings.strokeWidth}px
                  </Label>
                  <Slider
                    value={[settings.strokeWidth]}
                    min={0.5}
                    max={5}
                    step={0.5}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sidebar-foreground text-xs">
                    Color
                  </Label>
                  <div className="flex items-center gap-1 mt-1">
                    <Input
                      type="color"
                      value={settings.strokeColor}
                      className="w-6 h-6 p-0 border-border"
                    />
                    <Input
                      value={settings.strokeColor}
                      className="flex-1 bg-input border-border text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <Label className="text-sidebar-foreground text-sm">
                Hover Glow
              </Label>
              <Switch checked={settings.hoverGlow} />
            </div>

            {settings.hoverGlow && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sidebar-foreground text-xs">
                    Intensity: {settings.glowIntensity}px
                  </Label>
                  <Slider
                    value={[settings.glowIntensity]}
                    min={5}
                    max={30}
                    step={1}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sidebar-foreground text-xs">
                    Color
                  </Label>
                  <div className="flex items-center gap-1 mt-1">
                    <Input
                      type="color"
                      value={settings.glowColor}
                      className="w-6 h-6 p-0 border-border"
                    />
                    <Input
                      value={settings.glowColor}
                      className="flex-1 bg-input border-border text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <Label className="text-sidebar-foreground text-sm">
                Per-Letter Animation
              </Label>
              <Switch checked={settings.perLetterAnimation} />
            </div>

            {settings.perLetterAnimation && (
              <div>
                <Label className="text-sidebar-foreground text-xs">
                  Animation Delay: {settings.animationDelay}s
                </Label>
                <Slider
                  value={[settings.animationDelay]}
                  min={0.05}
                  max={0.3}
                  step={0.05}
                  className="mt-1"
                />
              </div>
            )}
          </div>
        </Card>

        <Card className="p-4 bg-sidebar border-sidebar-border">
          <h2 className="text-lg font-semibold mb-3 text-sidebar-foreground flex items-center gap-2">
            <Type className="w-4 h-4" />
            Word Styling
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sidebar-foreground text-sm">
                Background Highlight
              </Label>
              <Switch checked={settings.backgroundHighlight} />
            </div>

            {settings.backgroundHighlight && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sidebar-foreground text-xs">
                    Color
                  </Label>
                  <div className="flex items-center gap-1 mt-1">
                    <Input
                      type="color"
                      value={settings.highlightColor}
                      className="w-6 h-6 p-0 border-border"
                    />
                    <Input
                      value={settings.highlightColor}
                      className="flex-1 bg-input border-border text-xs"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sidebar-foreground text-xs">
                    Padding: {settings.highlightPadding}px
                  </Label>
                  <Slider
                    value={[settings.highlightPadding]}
                    min={4}
                    max={20}
                    step={2}
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            <div>
              <Label className="text-sidebar-foreground text-sm">
                Underline Style
              </Label>
              <Select value={settings.underlineStyle}>
                <SelectTrigger className="mt-1 bg-input border-border text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {UNDERLINE_STYLES.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      {style.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {settings.underlineStyle !== "none" && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sidebar-foreground text-xs">
                    Color
                  </Label>
                  <div className="flex items-center gap-1 mt-1">
                    <Input
                      type="color"
                      value={settings.underlineColor}
                      className="w-6 h-6 p-0 border-border"
                    />
                    <Input
                      value={settings.underlineColor}
                      className="flex-1 bg-input border-border text-xs"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sidebar-foreground text-xs">
                    Thickness: {settings.underlineThickness}px
                  </Label>
                  <Slider
                    value={[settings.underlineThickness]}
                    min={1}
                    max={8}
                    step={1}
                    className="mt-1"
                  />
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-4 bg-sidebar border-sidebar-border">
          <h2 className="text-lg font-semibold mb-3 text-sidebar-foreground">
            Export
          </h2>

          <div className="space-y-2">
            <Button className="w-full bg-sidebar-accent hover:bg-sidebar-accent/90 text-sidebar-accent-foreground text-sm">
              <Download className="w-3 h-3 mr-2" />
              Export JSON
            </Button>
            <Button
              variant="outline"
              className="w-full border-sidebar-border text-sidebar-foreground hover:bg-sidebar-accent/10 bg-transparent text-sm"
            >
              <Copy className="w-3 h-3 mr-2" />
              Copy CSS & HTML
            </Button>
          </div>
        </Card>
      </div>

      {/* Preview Area */}
      <div className="lg:col-span-2">
        <Card className="p-6 bg-card border-border min-h-[600px] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-card-foreground">
              Live Preview
            </h2>
            <div className="flex gap-2">
              {settings.hasGradient && (
                <Badge variant="secondary" className="text-xs">
                  Gradient
                </Badge>
              )}
              {settings.textStroke && (
                <Badge variant="secondary" className="text-xs">
                  Stroke
                </Badge>
              )}
              {settings.hoverGlow && (
                <Badge variant="secondary" className="text-xs">
                  Glow
                </Badge>
              )}
              {settings.perLetterAnimation && (
                <Badge variant="secondary" className="text-xs">
                  Animation
                </Badge>
              )}
              {settings.backgroundHighlight && (
                <Badge variant="secondary" className="text-xs">
                  Highlight
                </Badge>
              )}
              {settings.underlineStyle !== "none" && (
                <Badge variant="secondary" className="text-xs">
                  Underline
                </Badge>
              )}
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-full">
              <motion.h1
                className={`${settings.fontFamily} ${settings.fontWeight} text-balance`}
              >
                {settings.text}
              </motion.h1>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-muted-foreground">
              <div>
                <span className="font-medium">Font:</span>{" "}
                {
                  FONT_FAMILIES.find((f) => f.value === settings.fontFamily)
                    ?.label
                }
              </div>
              <div>
                <span className="font-medium">Size:</span> {settings.fontSize}px
              </div>
              <div>
                <span className="font-medium">Weight:</span>{" "}
                {
                  FONT_WEIGHTS.find((w) => w.value === settings.fontWeight)
                    ?.label
                }
              </div>
              <div>
                <span className="font-medium">Spacing:</span>{" "}
                {settings.letterSpacing}px
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
