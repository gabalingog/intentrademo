import { useState } from 'react';

const categories = [
  { id: 'wintersports', label: 'Wintersports' },
  { id: 'mountains', label: 'Mountains/Outdoors' },
  { id: 'running', label: 'Running' },
  { id: 'biking', label: 'Biking' },
  { id: 'other', label: 'Other' },
];

// Define the winter sports question tree
const winterSportsTree: Record<string, any> = {
  skiing: {
    question: 'What kind of skiing?',
    options: [
      { id: 'resort', label: 'Resort' },
      { id: 'freeride', label: 'Freeride' },
      { id: 'ski-mountaineering', label: 'Ski Mountaineering' },
      { id: 'cross-country', label: 'Cross-Country' },
    ],
    children: {
      resort: {
        question: 'What snow terrain should we plan for?',
        options: [
          { id: 'groomed', label: 'Groomed' },
          { id: 'ungroomed', label: 'Ungroomed' },
          { id: 'mixed', label: 'Mixed' },
          { id: 'not-sure', label: 'Not sure' },
        ],
        children: {
          groomed: {
            question: 'What snow surface should we plan for?',
            options: [
              { id: 'soft-snow-powder', label: 'Soft snow/powder' },
              { id: 'firm-icy', label: 'Firm/Icy' },
              { id: 'mixed-conditions', label: 'Mixed conditions' },
              { id: 'not-sure', label: 'Not sure' },
            ],
          },
          ungroomed: {
            question: 'What snow surface should we plan for?',
            options: [
              { id: 'soft-snow-powder', label: 'Soft snow/powder' },
              { id: 'firm-icy', label: 'Firm/Icy' },
              { id: 'mixed-conditions', label: 'Mixed conditions' },
              { id: 'not-sure', label: 'Not sure' },
            ],
          },
          mixed: {
            question: 'What snow surface should we plan for?',
            options: [
              { id: 'soft-snow-powder', label: 'Soft snow/powder' },
              { id: 'firm-icy', label: 'Firm/Icy' },
              { id: 'mixed-conditions', label: 'Mixed conditions' },
              { id: 'not-sure', label: 'Not sure' },
            ],
          },
          'not-sure': {
            question: 'What snow surface should we plan for?',
            options: [
              { id: 'soft-snow-powder', label: 'Soft snow/powder' },
              { id: 'firm-icy', label: 'Firm/Icy' },
              { id: 'mixed-conditions', label: 'Mixed conditions' },
              { id: 'not-sure', label: 'Not sure' },
            ],
          },
        },
      },
      freeride: {
        question: 'What snow terrain should we plan for?',
        options: [
          { id: 'ungroomed', label: 'Ungroomed' },
          { id: 'backcountry', label: 'Backcountry' },
          { id: 'mixed', label: 'Mixed' },
          { id: 'not-sure', label: 'Not sure' },
        ],
        children: {
          ungroomed: {
            question: 'What snow surface should we plan for?',
            options: [
              { id: 'soft-snow-powder', label: 'Soft snow/powder' },
              { id: 'firm-icy', label: 'Firm/Icy' },
              { id: 'mixed-conditions', label: 'Mixed conditions' },
              { id: 'not-sure', label: 'Not sure' },
            ],
          },
          backcountry: {
            question: 'What snow surface should we plan for?',
            options: [
              { id: 'soft-snow-powder', label: 'Soft snow/powder' },
              { id: 'firm-icy', label: 'Firm/Icy' },
              { id: 'mixed-conditions', label: 'Mixed conditions' },
              { id: 'not-sure', label: 'Not sure' },
            ],
          },
          mixed: {
            question: 'What snow surface should we plan for?',
            options: [
              { id: 'soft-snow-powder', label: 'Soft snow/powder' },
              { id: 'firm-icy', label: 'Firm/Icy' },
              { id: 'mixed-conditions', label: 'Mixed conditions' },
              { id: 'not-sure', label: 'Not sure' },
            ],
          },
          'not-sure': {
            question: 'What snow surface should we plan for?',
            options: [
              { id: 'soft-snow-powder', label: 'Soft snow/powder' },
              { id: 'firm-icy', label: 'Firm/Icy' },
              { id: 'mixed-conditions', label: 'Mixed conditions' },
              { id: 'not-sure', label: 'Not sure' },
            ],
          },
        },
      },
      'ski-mountaineering': {
        question: 'What snow terrain should we plan for?',
        options: [
          { id: 'backcountry', label: 'Backcountry' },
          { id: 'high-alpine', label: 'High Alpine' },
          { id: 'mixed-alpine', label: 'Mixed Alpine' },
          { id: 'not-sure', label: 'Not sure' },
        ],
        children: {
          backcountry: {
            question: 'What snow surface should we plan for?',
            options: [
              { id: 'stable-snow', label: 'Stable snow' },
              { id: 'firm-icy', label: 'Firm/Icy' },
              { id: 'mixed-conditions', label: 'Mixed conditions' },
              { id: 'not-sure', label: 'Not sure' },
            ],
            children: {
              'stable-snow': {
                question: 'How technical is the terrain?',
                options: [
                  { id: 'skinning-skiing', label: 'Skinning and skiing' },
                  { id: 'bootpacking', label: 'Bootpacking' },
                  { id: 'technical-alpine', label: 'Technical alpine' },
                  { id: 'not-sure', label: 'Not sure' },
                ],
              },
              'firm-icy': {
                question: 'How technical is the terrain?',
                options: [
                  { id: 'skinning-skiing', label: 'Skinning and skiing' },
                  { id: 'bootpacking', label: 'Bootpacking' },
                  { id: 'technical-alpine', label: 'Technical alpine' },
                  { id: 'not-sure', label: 'Not sure' },
                ],
              },
              'mixed-conditions': {
                question: 'How technical is the terrain?',
                options: [
                  { id: 'skinning-skiing', label: 'Skinning and skiing' },
                  { id: 'bootpacking', label: 'Bootpacking' },
                  { id: 'technical-alpine', label: 'Technical alpine' },
                  { id: 'not-sure', label: 'Not sure' },
                ],
              },
              'not-sure': {
                question: 'How technical is the terrain?',
                options: [
                  { id: 'skinning-skiing', label: 'Skinning and skiing' },
                  { id: 'bootpacking', label: 'Bootpacking' },
                  { id: 'technical-alpine', label: 'Technical alpine' },
                  { id: 'not-sure', label: 'Not sure' },
                ],
              },
            },
          },
          'high-alpine': {
            question: 'What snow surface should we plan for?',
            options: [
              { id: 'stable-snow', label: 'Stable snow' },
              { id: 'firm-icy', label: 'Firm/Icy' },
              { id: 'mixed-conditions', label: 'Mixed conditions' },
              { id: 'not-sure', label: 'Not sure' },
            ],
            children: {
              'stable-snow': {
                question: 'How technical is the terrain?',
                options: [
                  { id: 'skinning-skiing', label: 'Skinning and skiing' },
                  { id: 'bootpacking', label: 'Bootpacking' },
                  { id: 'technical-alpine', label: 'Technical alpine' },
                  { id: 'not-sure', label: 'Not sure' },
                ],
              },
              'firm-icy': {
                question: 'How technical is the terrain?',
                options: [
                  { id: 'skinning-skiing', label: 'Skinning and skiing' },
                  { id: 'bootpacking', label: 'Bootpacking' },
                  { id: 'technical-alpine', label: 'Technical alpine' },
                  { id: 'not-sure', label: 'Not sure' },
                ],
              },
              'mixed-conditions': {
                question: 'How technical is the terrain?',
                options: [
                  { id: 'skinning-skiing', label: 'Skinning and skiing' },
                  { id: 'bootpacking', label: 'Bootpacking' },
                  { id: 'technical-alpine', label: 'Technical alpine' },
                  { id: 'not-sure', label: 'Not sure' },
                ],
              },
              'not-sure': {
                question: 'How technical is the terrain?',
                options: [
                  { id: 'skinning-skiing', label: 'Skinning and skiing' },
                  { id: 'bootpacking', label: 'Bootpacking' },
                  { id: 'technical-alpine', label: 'Technical alpine' },
                  { id: 'not-sure', label: 'Not sure' },
                ],
              },
            },
          },
          'mixed-alpine': {
            question: 'What snow surface should we plan for?',
            options: [
              { id: 'stable-snow', label: 'Stable snow' },
              { id: 'firm-icy', label: 'Firm/Icy' },
              { id: 'mixed-conditions', label: 'Mixed conditions' },
              { id: 'not-sure', label: 'Not sure' },
            ],
            children: {
              'stable-snow': {
                question: 'How technical is the terrain?',
                options: [
                  { id: 'skinning-skiing', label: 'Skinning and skiing' },
                  { id: 'bootpacking', label: 'Bootpacking' },
                  { id: 'technical-alpine', label: 'Technical alpine' },
                  { id: 'not-sure', label: 'Not sure' },
                ],
              },
              'firm-icy': {
                question: 'How technical is the terrain?',
                options: [
                  { id: 'skinning-skiing', label: 'Skinning and skiing' },
                  { id: 'bootpacking', label: 'Bootpacking' },
                  { id: 'technical-alpine', label: 'Technical alpine' },
                  { id: 'not-sure', label: 'Not sure' },
                ],
              },
              'mixed-conditions': {
                question: 'How technical is the terrain?',
                options: [
                  { id: 'skinning-skiing', label: 'Skinning and skiing' },
                  { id: 'bootpacking', label: 'Bootpacking' },
                  { id: 'technical-alpine', label: 'Technical alpine' },
                  { id: 'not-sure', label: 'Not sure' },
                ],
              },
              'not-sure': {
                question: 'How technical is the terrain?',
                options: [
                  { id: 'skinning-skiing', label: 'Skinning and skiing' },
                  { id: 'bootpacking', label: 'Bootpacking' },
                  { id: 'technical-alpine', label: 'Technical alpine' },
                  { id: 'not-sure', label: 'Not sure' },
                ],
              },
            },
          },
          'not-sure': {
            question: 'What snow surface should we plan for?',
            options: [
              { id: 'stable-snow', label: 'Stable snow' },
              { id: 'firm-icy', label: 'Firm/Icy' },
              { id: 'mixed-conditions', label: 'Mixed conditions' },
              { id: 'not-sure', label: 'Not sure' },
            ],
            children: {
              'stable-snow': {
                question: 'How technical is the terrain?',
                options: [
                  { id: 'skinning-skiing', label: 'Skinning and skiing' },
                  { id: 'bootpacking', label: 'Bootpacking' },
                  { id: 'technical-alpine', label: 'Technical alpine' },
                  { id: 'not-sure', label: 'Not sure' },
                ],
              },
              'firm-icy': {
                question: 'How technical is the terrain?',
                options: [
                  { id: 'skinning-skiing', label: 'Skinning and skiing' },
                  { id: 'bootpacking', label: 'Bootpacking' },
                  { id: 'technical-alpine', label: 'Technical alpine' },
                  { id: 'not-sure', label: 'Not sure' },
                ],
              },
              'mixed-conditions': {
                question: 'How technical is the terrain?',
                options: [
                  { id: 'skinning-skiing', label: 'Skinning and skiing' },
                  { id: 'bootpacking', label: 'Bootpacking' },
                  { id: 'technical-alpine', label: 'Technical alpine' },
                  { id: 'not-sure', label: 'Not sure' },
                ],
              },
              'not-sure': {
                question: 'How technical is the terrain?',
                options: [
                  { id: 'skinning-skiing', label: 'Skinning and skiing' },
                  { id: 'bootpacking', label: 'Bootpacking' },
                  { id: 'technical-alpine', label: 'Technical alpine' },
                  { id: 'not-sure', label: 'Not sure' },
                ],
              },
            },
          },
        },
      },
      'cross-country': {
        question: 'What style of cross-country skiing?',
        options: [
          { id: 'classic', label: 'Classic' },
          { id: 'skate', label: 'Skate' },
          { id: 'not-sure', label: 'Not sure' },
        ],
        children: {
          classic: {
            question: 'What snow terrain should we plan for?',
            options: [
              { id: 'groomed', label: 'Groomed' },
              { id: 'rolling', label: 'Rolling' },
              { id: 'mixed', label: 'Mixed' },
              { id: 'not-sure', label: 'Not sure' },
            ],
            children: {
              groomed: {
                question: 'What snow surface should we plan for?',
                options: [
                  { id: 'soft-snow-powder', label: 'Soft snow/powder' },
                  { id: 'firm-icy', label: 'Firm/Icy' },
                  { id: 'mixed-conditions', label: 'Mixed conditions' },
                  { id: 'not-sure', label: 'Not sure' },
                ],
              },
              rolling: {
                question: 'What snow surface should we plan for?',
                options: [
                  { id: 'soft-snow-powder', label: 'Soft snow/powder' },
                  { id: 'firm-icy', label: 'Firm/Icy' },
                  { id: 'mixed-conditions', label: 'Mixed conditions' },
                  { id: 'not-sure', label: 'Not sure' },
                ],
              },
              mixed: {
                question: 'What snow surface should we plan for?',
                options: [
                  { id: 'soft-snow-powder', label: 'Soft snow/powder' },
                  { id: 'firm-icy', label: 'Firm/Icy' },
                  { id: 'mixed-conditions', label: 'Mixed conditions' },
                  { id: 'not-sure', label: 'Not sure' },
                ],
              },
              'not-sure': {
                question: 'What snow surface should we plan for?',
                options: [
                  { id: 'soft-snow-powder', label: 'Soft snow/powder' },
                  { id: 'firm-icy', label: 'Firm/Icy' },
                  { id: 'mixed-conditions', label: 'Mixed conditions' },
                  { id: 'not-sure', label: 'Not sure' },
                ],
              },
            },
          },
          skate: {
            question: 'What snow terrain should we plan for?',
            options: [
              { id: 'groomed', label: 'Groomed' },
              { id: 'rolling', label: 'Rolling' },
              { id: 'mixed', label: 'Mixed' },
              { id: 'not-sure', label: 'Not sure' },
            ],
            children: {
              groomed: {
                question: 'What snow surface should we plan for?',
                options: [
                  { id: 'soft-snow-powder', label: 'Soft snow/powder' },
                  { id: 'firm-icy', label: 'Firm/Icy' },
                  { id: 'mixed-conditions', label: 'Mixed conditions' },
                  { id: 'not-sure', label: 'Not sure' },
                ],
              },
              rolling: {
                question: 'What snow surface should we plan for?',
                options: [
                  { id: 'soft-snow-powder', label: 'Soft snow/powder' },
                  { id: 'firm-icy', label: 'Firm/Icy' },
                  { id: 'mixed-conditions', label: 'Mixed conditions' },
                  { id: 'not-sure', label: 'Not sure' },
                ],
              },
              mixed: {
                question: 'What snow surface should we plan for?',
                options: [
                  { id: 'soft-snow-powder', label: 'Soft snow/powder' },
                  { id: 'firm-icy', label: 'Firm/Icy' },
                  { id: 'mixed-conditions', label: 'Mixed conditions' },
                  { id: 'not-sure', label: 'Not sure' },
                ],
              },
              'not-sure': {
                question: 'What snow surface should we plan for?',
                options: [
                  { id: 'soft-snow-powder', label: 'Soft snow/powder' },
                  { id: 'firm-icy', label: 'Firm/Icy' },
                  { id: 'mixed-conditions', label: 'Mixed conditions' },
                  { id: 'not-sure', label: 'Not sure' },
                ],
              },
            },
          },
          'not-sure': {
            question: 'What snow terrain should we plan for?',
            options: [
              { id: 'groomed', label: 'Groomed' },
              { id: 'rolling', label: 'Rolling' },
              { id: 'mixed', label: 'Mixed' },
              { id: 'not-sure', label: 'Not sure' },
            ],
            children: {
              groomed: {
                question: 'What snow surface should we plan for?',
                options: [
                  { id: 'soft-snow-powder', label: 'Soft snow/powder' },
                  { id: 'firm-icy', label: 'Firm/Icy' },
                  { id: 'mixed-conditions', label: 'Mixed conditions' },
                  { id: 'not-sure', label: 'Not sure' },
                ],
              },
              rolling: {
                question: 'What snow surface should we plan for?',
                options: [
                  { id: 'soft-snow-powder', label: 'Soft snow/powder' },
                  { id: 'firm-icy', label: 'Firm/Icy' },
                  { id: 'mixed-conditions', label: 'Mixed conditions' },
                  { id: 'not-sure', label: 'Not sure' },
                ],
              },
              mixed: {
                question: 'What snow surface should we plan for?',
                options: [
                  { id: 'soft-snow-powder', label: 'Soft snow/powder' },
                  { id: 'firm-icy', label: 'Firm/Icy' },
                  { id: 'mixed-conditions', label: 'Mixed conditions' },
                  { id: 'not-sure', label: 'Not sure' },
                ],
              },
              'not-sure': {
                question: 'What snow surface should we plan for?',
                options: [
                  { id: 'soft-snow-powder', label: 'Soft snow/powder' },
                  { id: 'firm-icy', label: 'Firm/Icy' },
                  { id: 'mixed-conditions', label: 'Mixed conditions' },
                  { id: 'not-sure', label: 'Not sure' },
                ],
              },
            },
          },
        },
      },
    },
  },
  snowboarding: {
    question: 'What kind of snowboarding?',
    options: [
      { id: 'resort', label: 'Resort' },
      { id: 'terrain-park', label: 'Terrain Park' },
      { id: 'backcountry', label: 'Backcountry' },
      { id: 'mixed-terrain', label: 'Mixed Terrain' },
      { id: 'not-sure', label: 'Not sure' },
    ],
    children: {
      resort: {
        question: 'What snow surface should we plan for?',
        options: [
          { id: 'soft-snow', label: 'Soft snow/powder' },
          { id: 'firm-icy', label: 'Firm/Icy' },
          { id: 'mixed-conditions', label: 'Mixed conditions' },
          { id: 'not-sure', label: 'Not sure' },
        ],
      },
      'terrain-park': {
        question: 'What snow surface should we plan for?',
        options: [
          { id: 'soft-snow', label: 'Soft snow/powder' },
          { id: 'firm-icy', label: 'Firm/Icy' },
          { id: 'mixed-conditions', label: 'Mixed conditions' },
          { id: 'not-sure', label: 'Not sure' },
        ],
      },
      backcountry: {
        question: 'What snow surface should we plan for?',
        options: [
          { id: 'soft-snow', label: 'Soft snow/powder' },
          { id: 'firm-icy', label: 'Firm/Icy' },
          { id: 'mixed-conditions', label: 'Mixed conditions' },
          { id: 'not-sure', label: 'Not sure' },
        ],
      },
      'mixed-terrain': {
        question: 'What snow surface should we plan for?',
        options: [
          { id: 'soft-snow', label: 'Soft snow/powder' },
          { id: 'firm-icy', label: 'Firm/Icy' },
          { id: 'mixed-conditions', label: 'Mixed conditions' },
          { id: 'not-sure', label: 'Not sure' },
        ],
      },
      'not-sure': {
        question: 'What snow surface should we plan for?',
        options: [
          { id: 'soft-snow', label: 'Soft snow/powder' },
          { id: 'firm-icy', label: 'Firm/Icy' },
          { id: 'mixed-conditions', label: 'Mixed conditions' },
          { id: 'not-sure', label: 'Not sure' },
        ],
      },
    },
  },
  snowshoeing: {
    question: 'What snow surface should we plan for?',
    options: [
      { id: 'packed', label: 'Packed' },
      { id: 'deep', label: 'Deep' },
      { id: 'icy', label: 'Icy' },
      { id: 'not-sure', label: 'Not sure' },
    ],
  },
  'ice-climbing': {
    question: 'What kind of ice will you climb?',
    options: [
      { id: 'frozen-waterfall', label: 'Frozen waterfall' },
      { id: 'mixed-ice-rock', label: 'Mixed ice & rock' },
      { id: 'alpine-ice', label: 'Alpine ice' },
      { id: 'not-sure', label: 'Not sure' },
    ],
    children: {
      'frozen-waterfall': {
        question: 'What temperature range should we plan for?',
        options: [
          { id: 'cold', label: 'Cold' },
          { id: 'very-cold', label: 'Very Cold' },
          { id: 'extreme-cold', label: 'Extreme cold' },
          { id: 'not-sure', label: 'Not sure' },
        ],
      },
      'mixed-ice-rock': {
        question: 'What temperature range should we plan for?',
        options: [
          { id: 'cold', label: 'Cold' },
          { id: 'very-cold', label: 'Very Cold' },
          { id: 'extreme-cold', label: 'Extreme cold' },
          { id: 'not-sure', label: 'Not sure' },
        ],
      },
      'alpine-ice': {
        question: 'What temperature range should we plan for?',
        options: [
          { id: 'cold', label: 'Cold' },
          { id: 'very-cold', label: 'Very Cold' },
          { id: 'extreme-cold', label: 'Extreme cold' },
          { id: 'not-sure', label: 'Not sure' },
        ],
      },
      'not-sure': {
        question: 'What temperature range should we plan for?',
        options: [
          { id: 'cold', label: 'Cold' },
          { id: 'very-cold', label: 'Very Cold' },
          { id: 'extreme-cold', label: 'Extreme cold' },
          { id: 'not-sure', label: 'Not sure' },
        ],
      },
    },
  },
};

// Define the running question tree
const runningTree: Record<string, any> = {
  running: {
    question: 'How far are you typically running?',
    options: [
      { id: 'short', label: 'Short (under 5 km)' },
      { id: 'medium', label: 'Medium (5-15 km)' },
      { id: 'long', label: 'Long (15 km+)' },
      { id: 'not-sure', label: 'Not sure' },
    ],
    children: {
      short: {
        question: 'What temperatures should we plan for?',
        options: [
          { id: 'mostly-warm', label: 'Mostly warm' },
          { id: 'cool-to-mild', label: 'Cool to mild' },
          { id: 'cold', label: 'Cold' },
          { id: 'variable', label: 'Variable' },
        ],
        children: {
          'mostly-warm': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-pavement', label: 'Mostly dry pavement' },
              { id: 'wet-pavement', label: 'Wet Pavement' },
              { id: 'icy-sections', label: 'Icy sections' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          'cool-to-mild': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-pavement', label: 'Mostly dry pavement' },
              { id: 'wet-pavement', label: 'Wet Pavement' },
              { id: 'icy-sections', label: 'Icy sections' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          cold: {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-pavement', label: 'Mostly dry pavement' },
              { id: 'wet-pavement', label: 'Wet Pavement' },
              { id: 'icy-sections', label: 'Icy sections' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          variable: {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-pavement', label: 'Mostly dry pavement' },
              { id: 'wet-pavement', label: 'Wet Pavement' },
              { id: 'icy-sections', label: 'Icy sections' },
              { id: 'variable', label: 'Variable' },
            ],
          },
        },
      },
      medium: {
        question: 'What temperatures should we plan for?',
        options: [
          { id: 'mostly-warm', label: 'Mostly warm' },
          { id: 'cool-to-mild', label: 'Cool to mild' },
          { id: 'cold', label: 'Cold' },
          { id: 'variable', label: 'Variable' },
        ],
        children: {
          'mostly-warm': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-pavement', label: 'Mostly dry pavement' },
              { id: 'wet-pavement', label: 'Wet Pavement' },
              { id: 'icy-sections', label: 'Icy sections' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          'cool-to-mild': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-pavement', label: 'Mostly dry pavement' },
              { id: 'wet-pavement', label: 'Wet Pavement' },
              { id: 'icy-sections', label: 'Icy sections' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          cold: {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-pavement', label: 'Mostly dry pavement' },
              { id: 'wet-pavement', label: 'Wet Pavement' },
              { id: 'icy-sections', label: 'Icy sections' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          variable: {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-pavement', label: 'Mostly dry pavement' },
              { id: 'wet-pavement', label: 'Wet Pavement' },
              { id: 'icy-sections', label: 'Icy sections' },
              { id: 'variable', label: 'Variable' },
            ],
          },
        },
      },
      long: {
        question: 'What temperatures should we plan for?',
        options: [
          { id: 'mostly-warm', label: 'Mostly warm' },
          { id: 'cool-to-mild', label: 'Cool to mild' },
          { id: 'cold', label: 'Cold' },
          { id: 'variable', label: 'Variable' },
        ],
        children: {
          'mostly-warm': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-pavement', label: 'Mostly dry pavement' },
              { id: 'wet-pavement', label: 'Wet Pavement' },
              { id: 'icy-sections', label: 'Icy sections' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          'cool-to-mild': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-pavement', label: 'Mostly dry pavement' },
              { id: 'wet-pavement', label: 'Wet Pavement' },
              { id: 'icy-sections', label: 'Icy sections' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          cold: {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-pavement', label: 'Mostly dry pavement' },
              { id: 'wet-pavement', label: 'Wet Pavement' },
              { id: 'icy-sections', label: 'Icy sections' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          variable: {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-pavement', label: 'Mostly dry pavement' },
              { id: 'wet-pavement', label: 'Wet Pavement' },
              { id: 'icy-sections', label: 'Icy sections' },
              { id: 'variable', label: 'Variable' },
            ],
          },
        },
      },
      full: {
        question: 'What temperatures should we plan for?',
        options: [
          { id: 'mostly-warm', label: 'Mostly warm' },
          { id: 'cool-to-mild', label: 'Cool to mild' },
          { id: 'cold', label: 'Cold' },
          { id: 'variable', label: 'Variable' },
        ],
        children: {
          'mostly-warm': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-pavement', label: 'Mostly dry pavement' },
              { id: 'wet-pavement', label: 'Wet Pavement' },
              { id: 'icy-sections', label: 'Icy sections' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          'cool-to-mild': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-pavement', label: 'Mostly dry pavement' },
              { id: 'wet-pavement', label: 'Wet Pavement' },
              { id: 'icy-sections', label: 'Icy sections' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          cold: {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-pavement', label: 'Mostly dry pavement' },
              { id: 'wet-pavement', label: 'Wet Pavement' },
              { id: 'icy-sections', label: 'Icy sections' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          variable: {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-pavement', label: 'Mostly dry pavement' },
              { id: 'wet-pavement', label: 'Wet Pavement' },
              { id: 'icy-sections', label: 'Icy sections' },
              { id: 'variable', label: 'Variable' },
            ],
          },
        },
      },
      'not-sure': {
        question: 'What temperatures should we plan for?',
        options: [
          { id: 'mostly-warm', label: 'Mostly warm' },
          { id: 'cool-to-mild', label: 'Cool to mild' },
          { id: 'cold', label: 'Cold' },
          { id: 'variable', label: 'Variable' },
        ],
        children: {
          'mostly-warm': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-pavement', label: 'Mostly dry pavement' },
              { id: 'wet-pavement', label: 'Wet Pavement' },
              { id: 'icy-sections', label: 'Icy sections' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          'cool-to-mild': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-pavement', label: 'Mostly dry pavement' },
              { id: 'wet-pavement', label: 'Wet Pavement' },
              { id: 'icy-sections', label: 'Icy sections' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          cold: {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-pavement', label: 'Mostly dry pavement' },
              { id: 'wet-pavement', label: 'Wet Pavement' },
              { id: 'icy-sections', label: 'Icy sections' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          variable: {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-pavement', label: 'Mostly dry pavement' },
              { id: 'wet-pavement', label: 'Wet Pavement' },
              { id: 'icy-sections', label: 'Icy sections' },
              { id: 'variable', label: 'Variable' },
            ],
          },
        },
      },
    },
  },
  'trail-running': {
    question: 'How far are you typically running?',
    options: [
      { id: 'short', label: 'Short (under 5 km)' },
      { id: 'medium', label: 'Medium (5-15 km)' },
      { id: 'long', label: 'Long (15 km+)' },
      { id: 'not-sure', label: 'Not sure' },
    ],
    children: {
      short: {
        question: 'What temperatures should we plan for?',
        options: [
          { id: 'mostly-warm', label: 'Mostly warm' },
          { id: 'cool-to-mild', label: 'Cool to mild' },
          { id: 'cold', label: 'Cold' },
          { id: 'variable', label: 'Variable' },
        ],
        children: {
          'mostly-warm': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-trails', label: 'Mostly dry trails' },
              { id: 'wet-muddy-trails', label: 'Wet or muddy trails' },
              { id: 'snow-icy-sections', label: 'Snow or icy sections' },
              { id: 'rocky-technical', label: 'Rocky/technical terrain' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          'cool-to-mild': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-trails', label: 'Mostly dry trails' },
              { id: 'wet-muddy-trails', label: 'Wet or muddy trails' },
              { id: 'snow-icy-sections', label: 'Snow or icy sections' },
              { id: 'rocky-technical', label: 'Rocky/technical terrain' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          cold: {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-trails', label: 'Mostly dry trails' },
              { id: 'wet-muddy-trails', label: 'Wet or muddy trails' },
              { id: 'snow-icy-sections', label: 'Snow or icy sections' },
              { id: 'rocky-technical', label: 'Rocky/technical terrain' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          variable: {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-trails', label: 'Mostly dry trails' },
              { id: 'wet-muddy-trails', label: 'Wet or muddy trails' },
              { id: 'snow-icy-sections', label: 'Snow or icy sections' },
              { id: 'rocky-technical', label: 'Rocky/technical terrain' },
              { id: 'variable', label: 'Variable' },
            ],
          },
        },
      },
      medium: {
        question: 'What temperatures should we plan for?',
        options: [
          { id: 'mostly-warm', label: 'Mostly warm' },
          { id: 'cool-to-mild', label: 'Cool to mild' },
          { id: 'cold', label: 'Cold' },
          { id: 'variable', label: 'Variable' },
        ],
        children: {
          'mostly-warm': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-trails', label: 'Mostly dry trails' },
              { id: 'wet-muddy-trails', label: 'Wet or muddy trails' },
              { id: 'snow-icy-sections', label: 'Snow or icy sections' },
              { id: 'rocky-technical', label: 'Rocky/technical terrain' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          'cool-to-mild': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-trails', label: 'Mostly dry trails' },
              { id: 'wet-muddy-trails', label: 'Wet or muddy trails' },
              { id: 'snow-icy-sections', label: 'Snow or icy sections' },
              { id: 'rocky-technical', label: 'Rocky/technical terrain' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          cold: {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-trails', label: 'Mostly dry trails' },
              { id: 'wet-muddy-trails', label: 'Wet or muddy trails' },
              { id: 'snow-icy-sections', label: 'Snow or icy sections' },
              { id: 'rocky-technical', label: 'Rocky/technical terrain' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          variable: {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-trails', label: 'Mostly dry trails' },
              { id: 'wet-muddy-trails', label: 'Wet or muddy trails' },
              { id: 'snow-icy-sections', label: 'Snow or icy sections' },
              { id: 'rocky-technical', label: 'Rocky/technical terrain' },
              { id: 'variable', label: 'Variable' },
            ],
          },
        },
      },
      long: {
        question: 'What temperatures should we plan for?',
        options: [
          { id: 'mostly-warm', label: 'Mostly warm' },
          { id: 'cool-to-mild', label: 'Cool to mild' },
          { id: 'cold', label: 'Cold' },
          { id: 'variable', label: 'Variable' },
        ],
        children: {
          'mostly-warm': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-trails', label: 'Mostly dry trails' },
              { id: 'wet-muddy-trails', label: 'Wet or muddy trails' },
              { id: 'snow-icy-sections', label: 'Snow or icy sections' },
              { id: 'rocky-technical', label: 'Rocky/technical terrain' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          'cool-to-mild': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-trails', label: 'Mostly dry trails' },
              { id: 'wet-muddy-trails', label: 'Wet or muddy trails' },
              { id: 'snow-icy-sections', label: 'Snow or icy sections' },
              { id: 'rocky-technical', label: 'Rocky/technical terrain' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          cold: {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-trails', label: 'Mostly dry trails' },
              { id: 'wet-muddy-trails', label: 'Wet or muddy trails' },
              { id: 'snow-icy-sections', label: 'Snow or icy sections' },
              { id: 'rocky-technical', label: 'Rocky/technical terrain' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          variable: {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-trails', label: 'Mostly dry trails' },
              { id: 'wet-muddy-trails', label: 'Wet or muddy trails' },
              { id: 'snow-icy-sections', label: 'Snow or icy sections' },
              { id: 'rocky-technical', label: 'Rocky/technical terrain' },
              { id: 'variable', label: 'Variable' },
            ],
          },
        },
      },
      'not-sure': {
        question: 'What temperatures should we plan for?',
        options: [
          { id: 'mostly-warm', label: 'Mostly warm' },
          { id: 'cool-to-mild', label: 'Cool to mild' },
          { id: 'cold', label: 'Cold' },
          { id: 'variable', label: 'Variable' },
        ],
        children: {
          'mostly-warm': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-trails', label: 'Mostly dry trails' },
              { id: 'wet-muddy-trails', label: 'Wet or muddy trails' },
              { id: 'snow-icy-sections', label: 'Snow or icy sections' },
              { id: 'rocky-technical', label: 'Rocky/technical terrain' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          'cool-to-mild': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-trails', label: 'Mostly dry trails' },
              { id: 'wet-muddy-trails', label: 'Wet or muddy trails' },
              { id: 'snow-icy-sections', label: 'Snow or icy sections' },
              { id: 'rocky-technical', label: 'Rocky/technical terrain' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          cold: {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-trails', label: 'Mostly dry trails' },
              { id: 'wet-muddy-trails', label: 'Wet or muddy trails' },
              { id: 'snow-icy-sections', label: 'Snow or icy sections' },
              { id: 'rocky-technical', label: 'Rocky/technical terrain' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          variable: {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry-trails', label: 'Mostly dry trails' },
              { id: 'wet-muddy-trails', label: 'Wet or muddy trails' },
              { id: 'snow-icy-sections', label: 'Snow or icy sections' },
              { id: 'rocky-technical', label: 'Rocky/technical terrain' },
              { id: 'variable', label: 'Variable' },
            ],
          },
        },
      },
    },
  },
  triathlon: {
    question: 'What race distance are you preparing for?',
    options: [
      { id: 'sprint', label: 'Sprint' },
      { id: 'olympic', label: 'Olympic' },
      { id: 'half', label: 'Half' },
      { id: 'full-ironman', label: 'Full Day' },
      { id: 'not-sure', label: 'Not sure' },
    ],
    children: {
      sprint: {
        question: 'What temperatures should we plan for?',
        options: [
          { id: 'mostly-warm', label: 'Mostly warm' },
          { id: 'cool-to-mild', label: 'Cool to mild' },
          { id: 'cold', label: 'Cold' },
          { id: 'variable', label: 'Variable' },
        ],
      },
      olympic: {
        question: 'What temperatures should we plan for?',
        options: [
          { id: 'mostly-warm', label: 'Mostly warm' },
          { id: 'cool-to-mild', label: 'Cool to mild' },
          { id: 'cold', label: 'Cold' },
          { id: 'variable', label: 'Variable' },
        ],
      },
      half: {
        question: 'What temperatures should we plan for?',
        options: [
          { id: 'mostly-warm', label: 'Mostly warm' },
          { id: 'cool-to-mild', label: 'Cool to mild' },
          { id: 'cold', label: 'Cold' },
          { id: 'variable', label: 'Variable' },
        ],
      },
      'full-ironman': {
        question: 'What temperatures should we plan for?',
        options: [
          { id: 'mostly-warm', label: 'Mostly warm' },
          { id: 'cool-to-mild', label: 'Cool to mild' },
          { id: 'cold', label: 'Cold' },
          { id: 'variable', label: 'Variable' },
        ],
      },
      'not-sure': {
        question: 'What temperatures should we plan for?',
        options: [
          { id: 'mostly-warm', label: 'Mostly warm' },
          { id: 'cool-to-mild', label: 'Cool to mild' },
          { id: 'cold', label: 'Cold' },
          { id: 'variable', label: 'Variable' },
        ],
      },
    },
  },
};

// Define the "Other" category question tree
const otherTree: Record<string, any> = {
  'yoga-pilates': {
    question: 'Where will you practice?',
    options: [
      { id: 'studio', label: 'Studio' },
      { id: 'at-home', label: 'At home' },
      { id: 'both', label: 'Both' },
    ],
  },
  'fitness-gym': {
    question: 'What kind of training?',
    options: [
      { id: 'strength-training', label: 'Strength training' },
      { id: 'cardio-workouts', label: 'Cardio workouts' },
      { id: 'functional-cross-training', label: 'Functional/Cross training' },
      { id: 'not-sure', label: 'Not sure' },
    ],
  },
  soccer: {
    question: 'Where will you play?',
    options: [
      { id: 'natural-grass', label: 'Natural grass' },
      { id: 'artificial-turf', label: 'Artificial turf' },
      { id: 'indoor-court', label: 'Indoor court' },
      { id: 'not-sure', label: 'Not sure' },
    ],
  },
  basketball: {
    question: 'Where will you play?',
    options: [
      { id: 'indoor-court', label: 'Indoor court' },
      { id: 'outdoor-court', label: 'Outdoor court' },
      { id: 'both', label: 'Both' },
      { id: 'not-sure', label: 'Not sure' },
    ],
  },
  swimmer: {
    question: 'Where will you swim?',
    options: [
      { id: 'indoor-pool', label: 'Indoor pool' },
      { id: 'outdoor-pool', label: 'Outdoor pool' },
      { id: 'open-water', label: 'Open water' },
      { id: 'not-sure', label: 'Not sure' },
    ],
  },
  'sportswear-leisure': {
    question: 'How will you wear it?',
    options: [
      { id: 'everyday-comfort', label: 'Everyday comfort' },
      { id: 'active-lifestyle', label: 'Active lifestyle' },
      { id: 'travel', label: 'Travel' },
      { id: 'not-sure', label: 'Not sure' },
    ],
  },
};

// Define the Mountains/Outdoors category question tree
const mountainsTree: Record<string, any> = {
  trekking: {
    question: 'How long will you be out?',
    options: [
      { id: 'full-day', label: 'Full Day' },
      { id: 'multi-day', label: 'Multi-Day' },
      { id: 'short', label: 'Short' },
    ],
    children: {
      'full-day': {
        question: 'What temperatures should we plan for?',
        options: [
          { id: 'mostly-warm', label: 'Mostly warm' },
          { id: 'cool-to-mild', label: 'Cool to mild' },
          { id: 'cold', label: 'Cold' },
          { id: 'variable', label: 'Variable' },
        ],
        children: {
          'mostly-warm': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry', label: 'Mostly dry' },
              { id: 'wet-or-muddy', label: 'Wet or muddy' },
              { id: 'snow-or-ice', label: 'Snow or Icy' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          'cool-to-mild': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry', label: 'Mostly dry' },
              { id: 'wet-or-muddy', label: 'Wet or muddy' },
              { id: 'snow-or-ice', label: 'Snow or Icy' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          cold: {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry', label: 'Mostly dry' },
              { id: 'wet-or-muddy', label: 'Wet or muddy' },
              { id: 'snow-or-ice', label: 'Snow or Icy' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          variable: {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry', label: 'Mostly dry' },
              { id: 'wet-or-muddy', label: 'Wet or muddy' },
              { id: 'snow-or-ice', label: 'Snow or Icy' },
              { id: 'variable', label: 'Variable' },
            ],
          },
        },
      },
      'multi-day': {
        question: 'What temperatures should we plan for?',
        options: [
          { id: 'mostly-warm', label: 'Mostly warm' },
          { id: 'cool-to-mild', label: 'Cool to mild' },
          { id: 'cold', label: 'Cold' },
          { id: 'variable', label: 'Variable' },
        ],
        children: {
          'mostly-warm': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry', label: 'Mostly dry' },
              { id: 'wet-or-muddy', label: 'Wet or muddy' },
              { id: 'snow-or-ice', label: 'Snow or Icy' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          'cool-to-mild': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry', label: 'Mostly dry' },
              { id: 'wet-or-muddy', label: 'Wet or muddy' },
              { id: 'snow-or-ice', label: 'Snow or Icy' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          cold: {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry', label: 'Mostly dry' },
              { id: 'wet-or-muddy', label: 'Wet or muddy' },
              { id: 'snow-or-ice', label: 'Snow or Icy' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          variable: {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry', label: 'Mostly dry' },
              { id: 'wet-or-muddy', label: 'Wet or muddy' },
              { id: 'snow-or-ice', label: 'Snow or Icy' },
              { id: 'variable', label: 'Variable' },
            ],
          },
        },
      },
      short: {
        question: 'What temperatures should we plan for?',
        options: [
          { id: 'mostly-warm', label: 'Mostly warm' },
          { id: 'cool-to-mild', label: 'Cool to mild' },
          { id: 'cold', label: 'Cold' },
          { id: 'variable', label: 'Variable' },
        ],
        children: {
          'mostly-warm': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry', label: 'Mostly dry' },
              { id: 'wet-or-muddy', label: 'Wet or muddy' },
              { id: 'snow-or-ice', label: 'Snow or Icy' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          'cool-to-mild': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry', label: 'Mostly dry' },
              { id: 'wet-or-muddy', label: 'Wet or muddy' },
              { id: 'snow-or-ice', label: 'Snow or Icy' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          cold: {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry', label: 'Mostly dry' },
              { id: 'wet-or-muddy', label: 'Wet or muddy' },
              { id: 'snow-or-ice', label: 'Snow or Icy' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          variable: {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry', label: 'Mostly dry' },
              { id: 'wet-or-muddy', label: 'Wet or muddy' },
              { id: 'snow-or-ice', label: 'Snow or Icy' },
              { id: 'variable', label: 'Variable' },
            ],
          },
        },
      },
    },
  },
  mountaineering: {
    question: 'How long will you be out?',
    options: [
      { id: 'full-day', label: 'Full Day' },
      { id: 'multi-day', label: 'Multi-Day' },
      { id: 'short', label: 'Short' },
    ],
    children: {
      'full-day': {
        question: 'What temperatures should we plan for?',
        options: [
          { id: 'mostly-warm', label: 'Mostly warm' },
          { id: 'cool-to-mild', label: 'Cool to mild' },
          { id: 'cold', label: 'Cold' },
          { id: 'variable', label: 'Variable' },
        ],
        children: {
          'mostly-warm': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry', label: 'Mostly dry alpine rock' },
              { id: 'snow-glacier', label: 'Snow or glacier travel' },
              { id: 'mixed-rock-snow', label: 'Mixed rock & snow' },
              { id: 'icy-sections', label: 'Icy sections' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          'cool-to-mild': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry', label: 'Mostly dry alpine rock' },
              { id: 'snow-glacier', label: 'Snow or glacier travel' },
              { id: 'mixed-rock-snow', label: 'Mixed rock & snow' },
              { id: 'icy-sections', label: 'Icy sections' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          cold: {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry', label: 'Mostly dry alpine rock' },
              { id: 'snow-glacier', label: 'Snow or glacier travel' },
              { id: 'mixed-rock-snow', label: 'Mixed rock & snow' },
              { id: 'icy-sections', label: 'Icy sections' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          variable: {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry', label: 'Mostly dry alpine rock' },
              { id: 'snow-glacier', label: 'Snow or glacier travel' },
              { id: 'mixed-rock-snow', label: 'Mixed rock & snow' },
              { id: 'icy-sections', label: 'Icy sections' },
              { id: 'variable', label: 'Variable' },
            ],
          },
        },
      },
      'multi-day': {
        question: 'What temperatures should we plan for?',
        options: [
          { id: 'mostly-warm', label: 'Mostly warm' },
          { id: 'cool-to-mild', label: 'Cool to mild' },
          { id: 'cold', label: 'Cold' },
          { id: 'variable', label: 'Variable' },
        ],
        children: {
          'mostly-warm': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry', label: 'Mostly dry alpine rock' },
              { id: 'snow-glacier', label: 'Snow or glacier travel' },
              { id: 'mixed-rock-snow', label: 'Mixed rock & snow' },
              { id: 'icy-sections', label: 'Icy sections' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          'cool-to-mild': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry', label: 'Mostly dry alpine rock' },
              { id: 'snow-glacier', label: 'Snow or glacier travel' },
              { id: 'mixed-rock-snow', label: 'Mixed rock & snow' },
              { id: 'icy-sections', label: 'Icy sections' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          cold: {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry', label: 'Mostly dry alpine rock' },
              { id: 'snow-glacier', label: 'Snow or glacier travel' },
              { id: 'mixed-rock-snow', label: 'Mixed rock & snow' },
              { id: 'icy-sections', label: 'Icy sections' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          variable: {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry', label: 'Mostly dry alpine rock' },
              { id: 'snow-glacier', label: 'Snow or glacier travel' },
              { id: 'mixed-rock-snow', label: 'Mixed rock & snow' },
              { id: 'icy-sections', label: 'Icy sections' },
              { id: 'variable', label: 'Variable' },
            ],
          },
        },
      },
      short: {
        question: 'What temperatures should we plan for?',
        options: [
          { id: 'mostly-warm', label: 'Mostly warm' },
          { id: 'cool-to-mild', label: 'Cool to mild' },
          { id: 'cold', label: 'Cold' },
          { id: 'variable', label: 'Variable' },
        ],
        children: {
          'mostly-warm': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry', label: 'Mostly dry alpine rock' },
              { id: 'snow-glacier', label: 'Snow or glacier travel' },
              { id: 'mixed-rock-snow', label: 'Mixed rock & snow' },
              { id: 'icy-sections', label: 'Icy sections' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          'cool-to-mild': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry', label: 'Mostly dry alpine rock' },
              { id: 'snow-glacier', label: 'Snow or glacier travel' },
              { id: 'mixed-rock-snow', label: 'Mixed rock & snow' },
              { id: 'icy-sections', label: 'Icy sections' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          cold: {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry', label: 'Mostly dry alpine rock' },
              { id: 'snow-glacier', label: 'Snow or glacier travel' },
              { id: 'mixed-rock-snow', label: 'Mixed rock & snow' },
              { id: 'icy-sections', label: 'Icy sections' },
              { id: 'variable', label: 'Variable' },
            ],
          },
          variable: {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry', label: 'Mostly dry alpine rock' },
              { id: 'snow-glacier', label: 'Snow or glacier travel' },
              { id: 'mixed-rock-snow', label: 'Mixed rock & snow' },
              { id: 'icy-sections', label: 'Icy sections' },
              { id: 'variable', label: 'Variable' },
            ],
          },
        },
      },
    },
  },
  climbing: {
    question: 'Where will you climb?',
    options: [
      { id: 'indoor', label: 'Indoor' },
      { id: 'outdoor', label: 'Outdoor' },
    ],
    children: {
      outdoor: {
        question: 'How long will you be out?',
        options: [
          { id: 'short', label: 'Short' },
          { id: 'full-day', label: 'Full Day' },
          { id: 'multi-day', label: 'Multi-Day' },
        ],
        children: {
          short: {
            question: 'What temperatures should we plan for?',
            options: [
              { id: 'mostly-warm', label: 'Mostly warm' },
              { id: 'cool-to-mild', label: 'Cool to mild' },
              { id: 'cold', label: 'Cold' },
              { id: 'variable', label: 'Variable' },
            ],
            children: {
              'mostly-warm': {
                question: 'What ground conditions should we plan for?',
                options: [
                  { id: 'mostly-dry', label: 'Mostly dry' },
                  { id: 'wet-or-muddy', label: 'Wet or muddy' },
                  { id: 'snow-or-ice', label: 'Snow or Icy' },
                  { id: 'variable', label: 'Variable' },
                ],
              },
              'cool-to-mild': {
                question: 'What ground conditions should we plan for?',
                options: [
                  { id: 'mostly-dry', label: 'Mostly dry' },
                  { id: 'wet-or-muddy', label: 'Wet or muddy' },
                  { id: 'snow-or-ice', label: 'Snow or Icy' },
                  { id: 'variable', label: 'Variable' },
                ],
              },
              cold: {
                question: 'What ground conditions should we plan for?',
                options: [
                  { id: 'mostly-dry', label: 'Mostly dry' },
                  { id: 'wet-or-muddy', label: 'Wet or muddy' },
                  { id: 'snow-or-ice', label: 'Snow or Icy' },
                  { id: 'variable', label: 'Variable' },
                ],
              },
              variable: {
                question: 'What ground conditions should we plan for?',
                options: [
                  { id: 'mostly-dry', label: 'Mostly dry' },
                  { id: 'wet-or-muddy', label: 'Wet or muddy' },
                  { id: 'snow-or-ice', label: 'Snow or Icy' },
                  { id: 'variable', label: 'Variable' },
                ],
              },
            },
          },
          'full-day': {
            question: 'What temperatures should we plan for?',
            options: [
              { id: 'mostly-warm', label: 'Mostly warm' },
              { id: 'cool-to-mild', label: 'Cool to mild' },
              { id: 'cold', label: 'Cold' },
              { id: 'variable', label: 'Variable' },
            ],
            children: {
              'mostly-warm': {
                question: 'What ground conditions should we plan for?',
                options: [
                  { id: 'mostly-dry', label: 'Mostly dry' },
                  { id: 'wet-or-muddy', label: 'Wet or muddy' },
                  { id: 'snow-or-ice', label: 'Snow or Icy' },
                  { id: 'variable', label: 'Variable' },
                ],
              },
              'cool-to-mild': {
                question: 'What ground conditions should we plan for?',
                options: [
                  { id: 'mostly-dry', label: 'Mostly dry' },
                  { id: 'wet-or-muddy', label: 'Wet or muddy' },
                  { id: 'snow-or-ice', label: 'Snow or Icy' },
                  { id: 'variable', label: 'Variable' },
                ],
              },
              cold: {
                question: 'What ground conditions should we plan for?',
                options: [
                  { id: 'mostly-dry', label: 'Mostly dry' },
                  { id: 'wet-or-muddy', label: 'Wet or muddy' },
                  { id: 'snow-or-ice', label: 'Snow or Icy' },
                  { id: 'variable', label: 'Variable' },
                ],
              },
              variable: {
                question: 'What ground conditions should we plan for?',
                options: [
                  { id: 'mostly-dry', label: 'Mostly dry' },
                  { id: 'wet-or-muddy', label: 'Wet or muddy' },
                  { id: 'snow-or-ice', label: 'Snow or Icy' },
                  { id: 'variable', label: 'Variable' },
                ],
              },
            },
          },
          'multi-day': {
            question: 'What temperatures should we plan for?',
            options: [
              { id: 'mostly-warm', label: 'Mostly warm' },
              { id: 'cool-to-mild', label: 'Cool to mild' },
              { id: 'cold', label: 'Cold' },
              { id: 'variable', label: 'Variable' },
            ],
            children: {
              'mostly-warm': {
                question: 'What ground conditions should we plan for?',
                options: [
                  { id: 'mostly-dry', label: 'Mostly dry' },
                  { id: 'wet-or-muddy', label: 'Wet or muddy' },
                  { id: 'snow-or-ice', label: 'Snow or Icy' },
                  { id: 'variable', label: 'Variable' },
                ],
              },
              'cool-to-mild': {
                question: 'What ground conditions should we plan for?',
                options: [
                  { id: 'mostly-dry', label: 'Mostly dry' },
                  { id: 'wet-or-muddy', label: 'Wet or muddy' },
                  { id: 'snow-or-ice', label: 'Snow or Icy' },
                  { id: 'variable', label: 'Variable' },
                ],
              },
              cold: {
                question: 'What ground conditions should we plan for?',
                options: [
                  { id: 'mostly-dry', label: 'Mostly dry' },
                  { id: 'wet-or-muddy', label: 'Wet or muddy' },
                  { id: 'snow-or-ice', label: 'Snow or Icy' },
                  { id: 'variable', label: 'Variable' },
                ],
              },
              variable: {
                question: 'What ground conditions should we plan for?',
                options: [
                  { id: 'mostly-dry', label: 'Mostly dry' },
                  { id: 'wet-or-muddy', label: 'Wet or muddy' },
                  { id: 'snow-or-ice', label: 'Snow or Icy' },
                  { id: 'variable', label: 'Variable' },
                ],
              },
            },
          },
        },
      },
    },
  },
  bouldering: {
    question: 'Where will you climb?',
    options: [
      { id: 'indoor', label: 'Indoor' },
      { id: 'outdoor', label: 'Outdoor' },
    ],
    children: {
      outdoor: {
        question: 'How long will you be out?',
        options: [
          { id: 'short', label: 'Short' },
          { id: 'full-day', label: 'Full Day' },
          { id: 'multi-day', label: 'Multi-Day' },
        ],
        children: {
          short: {
            question: 'What temperatures should we plan for?',
            options: [
              { id: 'mostly-warm', label: 'Mostly warm' },
              { id: 'cool-to-mild', label: 'Cool to mild' },
              { id: 'cold', label: 'Cold' },
              { id: 'variable', label: 'Variable' },
            ],
            children: {
              'mostly-warm': {
                question: 'What ground conditions should we plan for?',
                options: [
                  { id: 'mostly-dry', label: 'Mostly dry' },
                  { id: 'wet-or-muddy', label: 'Wet or muddy' },
                  { id: 'snow-or-ice', label: 'Snow or Icy' },
                  { id: 'variable', label: 'Variable' },
                ],
              },
              'cool-to-mild': {
                question: 'What ground conditions should we plan for?',
                options: [
                  { id: 'mostly-dry', label: 'Mostly dry' },
                  { id: 'wet-or-muddy', label: 'Wet or muddy' },
                  { id: 'snow-or-ice', label: 'Snow or Icy' },
                  { id: 'variable', label: 'Variable' },
                ],
              },
              cold: {
                question: 'What ground conditions should we plan for?',
                options: [
                  { id: 'mostly-dry', label: 'Mostly dry' },
                  { id: 'wet-or-muddy', label: 'Wet or muddy' },
                  { id: 'snow-or-ice', label: 'Snow or Icy' },
                  { id: 'variable', label: 'Variable' },
                ],
              },
              variable: {
                question: 'What ground conditions should we plan for?',
                options: [
                  { id: 'mostly-dry', label: 'Mostly dry' },
                  { id: 'wet-or-muddy', label: 'Wet or muddy' },
                  { id: 'snow-or-ice', label: 'Snow or Icy' },
                  { id: 'variable', label: 'Variable' },
                ],
              },
            },
          },
          'full-day': {
            question: 'What temperatures should we plan for?',
            options: [
              { id: 'mostly-warm', label: 'Mostly warm' },
              { id: 'cool-to-mild', label: 'Cool to mild' },
              { id: 'cold', label: 'Cold' },
              { id: 'variable', label: 'Variable' },
            ],
            children: {
              'mostly-warm': {
                question: 'What ground conditions should we plan for?',
                options: [
                  { id: 'mostly-dry', label: 'Mostly dry' },
                  { id: 'wet-or-muddy', label: 'Wet or muddy' },
                  { id: 'snow-or-ice', label: 'Snow or Icy' },
                  { id: 'variable', label: 'Variable' },
                ],
              },
              'cool-to-mild': {
                question: 'What ground conditions should we plan for?',
                options: [
                  { id: 'mostly-dry', label: 'Mostly dry' },
                  { id: 'wet-or-muddy', label: 'Wet or muddy' },
                  { id: 'snow-or-ice', label: 'Snow or Icy' },
                  { id: 'variable', label: 'Variable' },
                ],
              },
              cold: {
                question: 'What ground conditions should we plan for?',
                options: [
                  { id: 'mostly-dry', label: 'Mostly dry' },
                  { id: 'wet-or-muddy', label: 'Wet or muddy' },
                  { id: 'snow-or-ice', label: 'Snow or Icy' },
                  { id: 'variable', label: 'Variable' },
                ],
              },
              variable: {
                question: 'What ground conditions should we plan for?',
                options: [
                  { id: 'mostly-dry', label: 'Mostly dry' },
                  { id: 'wet-or-muddy', label: 'Wet or muddy' },
                  { id: 'snow-or-ice', label: 'Snow or Icy' },
                  { id: 'variable', label: 'Variable' },
                ],
              },
            },
          },
          'multi-day': {
            question: 'What temperatures should we plan for?',
            options: [
              { id: 'mostly-warm', label: 'Mostly warm' },
              { id: 'cool-to-mild', label: 'Cool to mild' },
              { id: 'cold', label: 'Cold' },
              { id: 'variable', label: 'Variable' },
            ],
            children: {
              'mostly-warm': {
                question: 'What ground conditions should we plan for?',
                options: [
                  { id: 'mostly-dry', label: 'Mostly dry' },
                  { id: 'wet-or-muddy', label: 'Wet or muddy' },
                  { id: 'snow-or-ice', label: 'Snow or Icy' },
                  { id: 'variable', label: 'Variable' },
                ],
              },
              'cool-to-mild': {
                question: 'What ground conditions should we plan for?',
                options: [
                  { id: 'mostly-dry', label: 'Mostly dry' },
                  { id: 'wet-or-muddy', label: 'Wet or muddy' },
                  { id: 'snow-or-ice', label: 'Snow or Icy' },
                  { id: 'variable', label: 'Variable' },
                ],
              },
              cold: {
                question: 'What ground conditions should we plan for?',
                options: [
                  { id: 'mostly-dry', label: 'Mostly dry' },
                  { id: 'wet-or-muddy', label: 'Wet or muddy' },
                  { id: 'snow-or-ice', label: 'Snow or Icy' },
                  { id: 'variable', label: 'Variable' },
                ],
              },
              variable: {
                question: 'What ground conditions should we plan for?',
                options: [
                  { id: 'mostly-dry', label: 'Mostly dry' },
                  { id: 'wet-or-muddy', label: 'Wet or muddy' },
                  { id: 'snow-or-ice', label: 'Snow or Icy' },
                  { id: 'variable', label: 'Variable' },
                ],
              },
            },
          },
        },
      },
    },
  },
  camping: {
    question: 'Camping style?',
    options: [
      { id: 'car-camping', label: 'Car camping' },
      { id: 'backpacking', label: 'Backpacking' },
    ],
    children: {
      'car-camping': {
        question: 'What temperatures should we plan for?',
        options: [
          { id: 'mostly-warm', label: 'Mostly warm' },
          { id: 'cool-to-mild', label: 'Cool to mild' },
          { id: 'cold', label: 'Cold' },
          { id: 'one-night-average', label: 'Large day-night swings' },
        ],
        children: {
          'mostly-warm': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry', label: 'Mostly dry' },
              { id: 'wet-or-muddy', label: 'Wet or muddy' },
              { id: 'snow-or-ice', label: 'Snow or Icy' },
              { id: 'mixed', label: 'Mixed' },
            ],
          },
          'cool-to-mild': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry', label: 'Mostly dry' },
              { id: 'wet-or-muddy', label: 'Wet or muddy' },
              { id: 'snow-or-ice', label: 'Snow or Icy' },
              { id: 'mixed', label: 'Mixed' },
            ],
          },
          cold: {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry', label: 'Mostly dry' },
              { id: 'wet-or-muddy', label: 'Wet or muddy' },
              { id: 'snow-or-ice', label: 'Snow or Icy' },
              { id: 'mixed', label: 'Mixed' },
            ],
          },
          'one-night-average': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry', label: 'Mostly dry' },
              { id: 'wet-or-muddy', label: 'Wet or muddy' },
              { id: 'snow-or-ice', label: 'Snow or Icy' },
              { id: 'mixed', label: 'Mixed' },
            ],
          },
        },
      },
      backpacking: {
        question: 'What temperatures should we plan for?',
        options: [
          { id: 'mostly-warm', label: 'Mostly warm' },
          { id: 'cool-to-mild', label: 'Cool to mild' },
          { id: 'cold', label: 'Cold' },
          { id: 'one-night-average', label: 'Large day-night swings' },
        ],
        children: {
          'mostly-warm': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry', label: 'Mostly dry' },
              { id: 'wet-or-muddy', label: 'Wet or muddy' },
              { id: 'snow-or-ice', label: 'Snow or Icy' },
              { id: 'mixed', label: 'Mixed' },
            ],
          },
          'cool-to-mild': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry', label: 'Mostly dry' },
              { id: 'wet-or-muddy', label: 'Wet or muddy' },
              { id: 'snow-or-ice', label: 'Snow or Icy' },
              { id: 'mixed', label: 'Mixed' },
            ],
          },
          cold: {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry', label: 'Mostly dry' },
              { id: 'wet-or-muddy', label: 'Wet or muddy' },
              { id: 'snow-or-ice', label: 'Snow or Icy' },
              { id: 'mixed', label: 'Mixed' },
            ],
          },
          'one-night-average': {
            question: 'What ground conditions should we plan for?',
            options: [
              { id: 'mostly-dry', label: 'Mostly dry' },
              { id: 'wet-or-muddy', label: 'Wet or muddy' },
              { id: 'snow-or-ice', label: 'Snow or Icy' },
              { id: 'mixed', label: 'Mixed' },
            ],
          },
        },
      },
    },
  },
};

// Define the Biking category question tree
const bikingTree: Record<string, any> = {
  'road-cycling': {
    question: 'What best describes your riding?',
    options: [
      { id: 'speed-performance', label: 'Speed & performance' },
      { id: 'fitness-training', label: 'Fitness & training' },
      { id: 'long-distance-endurance', label: 'Long-distance endurance' },
      { id: 'not-sure', label: 'Not sure' },
    ],
    children: {
      'speed-performance': {
        question: 'What ground conditions should we plan for?',
        options: [
          { id: 'mostly-dry', label: 'Mostly dry' },
          { id: 'wet-roads', label: 'Wet Roads' },
          { id: 'variable', label: 'Variable' },
        ],
      },
      'fitness-training': {
        question: 'What ground conditions should we plan for?',
        options: [
          { id: 'mostly-dry', label: 'Mostly dry' },
          { id: 'wet-roads', label: 'Wet Roads' },
          { id: 'variable', label: 'Variable' },
        ],
      },
      'long-distance-endurance': {
        question: 'What ground conditions should we plan for?',
        options: [
          { id: 'mostly-dry', label: 'Mostly dry' },
          { id: 'wet-roads', label: 'Wet Roads' },
          { id: 'variable', label: 'Variable' },
        ],
      },
      'not-sure': {
        question: 'What ground conditions should we plan for?',
        options: [
          { id: 'mostly-dry', label: 'Mostly dry' },
          { id: 'wet-roads', label: 'Wet Roads' },
          { id: 'variable', label: 'Variable' },
        ],
      },
    },
  },
  'gravel-riding': {
    question: 'Where will you ride the most?',
    options: [
      { id: 'smooth-gravel', label: 'Hard-packed gravel' },
      { id: 'rough-roads-gravel', label: 'Rough gravel & dirt roads' },
      { id: 'mixed-pavement-gravel', label: 'Mixed pavement & gravel' },
      { id: 'not-sure', label: 'Not sure' },
    ],
  },
  'mountain-biking': {
    question: 'Where will you ride the most?',
    options: [
      { id: 'smooth-trails', label: 'Smooth trails' },
      { id: 'technical-rocky-trails', label: 'Technical/rocky trails' },
      { id: 'steep-downhill', label: 'Steep downhill' },
      { id: 'mixed-terrain', label: 'Mixed Terrain' },
      { id: 'not-sure', label: 'Not sure' },
    ],
    children: {
      'smooth-trails': {
        question: 'What ground conditions should we plan for?',
        options: [
          { id: 'dry-trails', label: 'Dry trails' },
          { id: 'wet-or-muddy-trails', label: 'Wet or muddy trails' },
          { id: 'loose-terrain', label: 'Loose terrain' },
          { id: 'variable', label: 'Variable' },
        ],
      },
      'technical-rocky-trails': {
        question: 'What ground conditions should we plan for?',
        options: [
          { id: 'dry-trails', label: 'Dry trails' },
          { id: 'wet-or-muddy-trails', label: 'Wet or muddy trails' },
          { id: 'loose-terrain', label: 'Loose terrain' },
          { id: 'variable', label: 'Variable' },
        ],
      },
      'steep-downhill': {
        question: 'What ground conditions should we plan for?',
        options: [
          { id: 'dry-trails', label: 'Dry trails' },
          { id: 'wet-or-muddy-trails', label: 'Wet or muddy trails' },
          { id: 'loose-terrain', label: 'Loose terrain' },
          { id: 'variable', label: 'Variable' },
        ],
      },
      'mixed-terrain': {
        question: 'What ground conditions should we plan for?',
        options: [
          { id: 'dry-trails', label: 'Dry trails' },
          { id: 'wet-or-muddy-trails', label: 'Wet or muddy trails' },
          { id: 'loose-terrain', label: 'Loose terrain' },
          { id: 'variable', label: 'Variable' },
        ],
      },
      'not-sure': {
        question: 'What ground conditions should we plan for?',
        options: [
          { id: 'dry-trails', label: 'Dry trails' },
          { id: 'wet-or-muddy-trails', label: 'Wet or muddy trails' },
          { id: 'loose-terrain', label: 'Loose terrain' },
          { id: 'variable', label: 'Variable' },
        ],
      },
    },
  },
  'trekking-travel': {
    question: 'Will you carry gear on your rides?',
    options: [
      { id: 'no-light-gear-only', label: 'No, light day rides' },
      { id: 'yes-for-commuting-or-errands', label: 'Yes, for commuting or errands' },
      { id: 'yes-for-multi-day-trips', label: 'Yes, for multi-day trips' },
    ],
    children: {
      'no-light-gear-only': {
        question: 'What ground conditions should we plan for?',
        options: [
          { id: 'paved', label: 'Paved' },
          { id: 'paved-and-gravel', label: 'Paved and Gravel' },
          { id: 'gravel', label: 'Gravel' },
        ],
      },
      'yes-for-commuting-or-errands': {
        question: 'What ground conditions should we plan for?',
        options: [
          { id: 'paved', label: 'Paved' },
          { id: 'paved-and-gravel', label: 'Paved and Gravel' },
          { id: 'gravel', label: 'Gravel' },
        ],
      },
      'yes-for-multi-day-trips': {
        question: 'What ground conditions should we plan for?',
        options: [
          { id: 'paved', label: 'Paved' },
          { id: 'paved-and-gravel', label: 'Paved and Gravel' },
          { id: 'gravel', label: 'Gravel' },
        ],
      },
    },
  },
  'city-commuting': {
    question: 'What best describes your riding?',
    options: [
      { id: 'daily-commuting', label: 'Daily Commuting' },
      { id: 'short-errands', label: 'Short errands' },
      { id: 'leisure-city-riding', label: 'Leisure city riding' },
      { id: 'not-sure', label: 'Not sure' },
    ],
    children: {
      'daily-commuting': {
        question: 'What ground conditions should we plan for?',
        options: [
          { id: 'paved', label: 'Paved' },
          { id: 'wet-conditions', label: 'Wet conditions' },
          { id: 'variable', label: 'Variable' },
        ],
      },
      'short-errands': {
        question: 'What ground conditions should we plan for?',
        options: [
          { id: 'paved', label: 'Paved' },
          { id: 'wet-conditions', label: 'Wet conditions' },
          { id: 'variable', label: 'Variable' },
        ],
      },
      'leisure-city-riding': {
        question: 'What ground conditions should we plan for?',
        options: [
          { id: 'paved', label: 'Paved' },
          { id: 'wet-conditions', label: 'Wet conditions' },
          { id: 'variable', label: 'Variable' },
        ],
      },
      'not-sure': {
        question: 'What ground conditions should we plan for?',
        options: [
          { id: 'paved', label: 'Paved' },
          { id: 'wet-conditions', label: 'Wet conditions' },
          { id: 'variable', label: 'Variable' },
        ],
      },
    },
  },
  'childrens-bike': {
    question: "What is the rider's age?",
    options: [
      { id: '2-4-years', label: '2-4 years' },
      { id: '5-7-years', label: '5-7 years' },
      { id: '8-12-years', label: '8-12 years' },
    ],
    children: {
      '2-4-years': {
        question: 'What ground conditions should we plan for?',
        options: [
          { id: 'paved', label: 'Paved' },
          { id: 'variable', label: 'Variable' },
        ],
      },
      '5-7-years': {
        question: 'What ground conditions should we plan for?',
        options: [
          { id: 'paved', label: 'Paved' },
          { id: 'variable', label: 'Variable' },
        ],
      },
      '8-12-years': {
        question: 'What ground conditions should we plan for?',
        options: [
          { id: 'paved', label: 'Paved' },
          { id: 'variable', label: 'Variable' },
        ],
      },
    },
  },
};

// Final focus question
const focusQuestion = {
  question: 'Anything you want to focus on?',
  categories: [
    {
      id: 'clothes',
      label: 'Clothes',
      subcategories: [
        { id: 'tops', label: 'Tops' },
        { id: 'bottoms', label: 'Bottoms' },
        { id: 'base-layers', label: 'Base layers' },
        { id: 'outer-layers', label: 'Outer layers' },
        { id: 'insulation', label: 'Insulation' },
        { id: 'socks', label: 'Socks' },
      ],
    },
    {
      id: 'other',
      label: 'Other',
      subcategories: [
        { id: 'footwear', label: 'Footwear' },
        { id: 'core-gear', label: 'Core Gear' },
        { id: 'safety', label: 'Safety' },
        { id: 'add-ons', label: 'Add-Ons' },
      ],
    },
  ],
};

// Yoga/Pilates specific focus question
const yogaPilatesFocusQuestion = {
  question: 'Anything you want to focus on?',
  categories: [
    {
      id: 'clothing',
      label: 'Clothing',
      subcategories: [
        { id: 'tops', label: 'Tops' },
        { id: 'bottoms', label: 'Bottoms' },
        { id: 'insulation', label: 'Insulation' },
        { id: 'outer-layers', label: 'Outer layers' },
        { id: 'base-layers', label: 'Base layers' },
        { id: 'socks', label: 'Socks' },
      ],
    },
    {
      id: 'other',
      label: 'Other',
      subcategories: [
        { id: 'core-gear', label: 'Core Gear' },
        { id: 'add-ons', label: 'Add-ons' },
      ],
    },
  ],
};

// Fitness/Gym specific focus question
const fitnessGymFocusQuestion = {
  question: 'Anything you want to focus on?',
  categories: [
    {
      id: 'clothing',
      label: 'Clothing',
      subcategories: [
        { id: 'tops', label: 'Tops' },
        { id: 'bottoms', label: 'Bottoms' },
        { id: 'insulation', label: 'Insulation' },
        { id: 'outer-layers', label: 'Outer layers' },
        { id: 'base-layers', label: 'Base layers' },
        { id: 'socks', label: 'Socks' },
      ],
    },
    {
      id: 'other',
      label: 'Other',
      subcategories: [
        { id: 'footwear', label: 'Footwear' },
        { id: 'core-gear', label: 'Core Gear' },
        { id: 'safety', label: 'Safety' },
        { id: 'add-ons', label: 'Add-ons' },
      ],
    },
  ],
};

// Soccer specific focus question
const soccerFocusQuestion = {
  question: 'Anything you want to focus on?',
  categories: [
    {
      id: 'clothing',
      label: 'Clothing',
      subcategories: [
        { id: 'tops', label: 'Tops' },
        { id: 'bottoms', label: 'Bottoms' },
        { id: 'insulation', label: 'Insulation' },
        { id: 'outer-layers', label: 'Outer layers' },
        { id: 'base-layers', label: 'Base layers' },
        { id: 'socks', label: 'Socks' },
      ],
    },
    {
      id: 'other',
      label: 'Other',
      subcategories: [
        { id: 'footwear', label: 'Footwear' },
        { id: 'core-gear', label: 'Core Gear' },
        { id: 'safety', label: 'Safety' },
        { id: 'add-ons', label: 'Add-ons' },
      ],
    },
  ],
};

// Basketball specific focus question
const basketballFocusQuestion = {
  question: 'Anything you want to focus on?',
  categories: [
    {
      id: 'clothing',
      label: 'Clothing',
      subcategories: [
        { id: 'tops', label: 'Tops' },
        { id: 'bottoms', label: 'Bottoms' },
        { id: 'insulation', label: 'Insulation' },
        { id: 'outer-layers', label: 'Outer layers' },
        { id: 'base-layers', label: 'Base layers' },
        { id: 'socks', label: 'Socks' },
      ],
    },
    {
      id: 'other',
      label: 'Other',
      subcategories: [
        { id: 'footwear', label: 'Footwear' },
        { id: 'core-gear', label: 'Core Gear' },
        { id: 'safety', label: 'Safety' },
        { id: 'add-ons', label: 'Add-ons' },
      ],
    },
  ],
};

// Swimmer specific focus question
const swimmerFocusQuestion = {
  question: 'Anything you want to focus on?',
  categories: [
    {
      id: 'clothing',
      label: 'Clothing',
      subcategories: [
        { id: 'tops', label: 'Tops' },
        { id: 'bottoms', label: 'Bottoms' },
        { id: 'insulation', label: 'Insulation' },
        { id: 'outer-layers', label: 'Outer layers' },
        { id: 'base-layers', label: 'Base layers' },
        { id: 'socks', label: 'Socks' },
      ],
    },
    {
      id: 'other',
      label: 'Other',
      subcategories: [
        { id: 'footwear', label: 'Footwear' },
        { id: 'core-gear', label: 'Core Gear' },
        { id: 'safety', label: 'Safety' },
        { id: 'add-ons', label: 'Add-ons' },
      ],
    },
  ],
};

// Sportswear/Leisure specific focus question
const sportswearLeisureFocusQuestion = {
  question: 'Anything you want to focus on?',
  categories: [
    {
      id: 'simple',
      label: '',
      subcategories: [
        { id: 'footwear', label: 'Footwear' },
        { id: 'clothing', label: 'Clothing' },
        { id: 'add-ons', label: 'Add-ons' },
      ],
    },
  ],
};

// Biking specific focus question
const bikingFocusQuestion = {
  question: 'Anything you want to focus on?',
  categories: [
    {
      id: 'clothing',
      label: 'Clothing',
      subcategories: [
        { id: 'tops', label: 'Tops' },
        { id: 'bottoms', label: 'Bottoms' },
        { id: 'insulation', label: 'Insulation' },
        { id: 'outer-layers', label: 'Outer layers' },
        { id: 'base-layers', label: 'Base layers' },
        { id: 'socks', label: 'Socks' },
      ],
    },
    {
      id: 'other',
      label: 'Other',
      subcategories: [
        { id: 'footwear', label: 'Footwear' },
        { id: 'core-gear', label: 'Core Gear' },
        { id: 'safety', label: 'Safety' },
        { id: 'add-ons', label: 'Add-ons' },
      ],
    },
  ],
};

// Running specific focus question
const runningFocusQuestion = {
  question: 'Anything you want to focus on?',
  categories: [
    {
      id: 'clothing',
      label: 'Clothing',
      subcategories: [
        { id: 'tops', label: 'Tops' },
        { id: 'bottoms', label: 'Bottoms' },
        { id: 'insulation', label: 'Insulation' },
        { id: 'outer-layers', label: 'Outer layers' },
        { id: 'base-layers', label: 'Base layers' },
        { id: 'socks', label: 'Socks' },
      ],
    },
    {
      id: 'other',
      label: 'Other',
      subcategories: [
        { id: 'footwear', label: 'Footwear' },
        { id: 'core-gear', label: 'Core Gear' },
        { id: 'safety', label: 'Safety' },
        { id: 'add-ons', label: 'Add-ons' },
      ],
    },
  ],
};

// Triathlon specific focus question
const triathlonFocusQuestion = {
  question: 'Anything you want to focus on?',
  categories: [
    {
      id: 'clothing',
      label: 'Clothing',
      subcategories: [
        { id: 'tops', label: 'Tops' },
        { id: 'bottoms', label: 'Bottoms' },
        { id: 'insulation', label: 'Insulation' },
        { id: 'outer-layers', label: 'Outer layers' },
        { id: 'base-layers', label: 'Base layers' },
        { id: 'socks', label: 'Socks' },
      ],
    },
    {
      id: 'other',
      label: 'Other',
      subcategories: [
        { id: 'footwear', label: 'Footwear' },
        { id: 'core-gear', label: 'Core Gear' },
        { id: 'add-ons', label: 'Add-ons' },
      ],
    },
  ],
};

// Trekking specific focus question
const trekkingFocusQuestion = {
  question: 'Anything you want to focus on?',
  categories: [
    {
      id: 'clothing',
      label: 'Clothing',
      subcategories: [
        { id: 'tops', label: 'Tops' },
        { id: 'bottoms', label: 'Bottoms' },
        { id: 'insulation', label: 'Insulation' },
        { id: 'outer-layers', label: 'Outer layers' },
        { id: 'base-layers', label: 'Base layers' },
        { id: 'socks', label: 'Socks' },
      ],
    },
    {
      id: 'other',
      label: 'Other',
      subcategories: [
        { id: 'footwear', label: 'Footwear' },
        { id: 'core-gear', label: 'Core Gear' },
        { id: 'safety', label: 'Safety' },
        { id: 'add-ons', label: 'Add-Ons' },
      ],
    },
  ],
};

// Climbing Indoor specific focus question (without Safety)
const climbingIndoorFocusQuestion = {
  question: 'Anything you want to focus on?',
  categories: [
    {
      id: 'clothes',
      label: 'Clothes',
      subcategories: [
        { id: 'tops', label: 'Tops' },
        { id: 'bottoms', label: 'Bottoms' },
        { id: 'base-layers', label: 'Base layers' },
        { id: 'socks', label: 'Socks' },
        { id: 'insulation', label: 'Insulation' },
        { id: 'outer-layers', label: 'Outer layers' },
      ],
    },
    {
      id: 'other',
      label: 'Other',
      subcategories: [
        { id: 'footwear', label: 'Footwear' },
        { id: 'core-gear', label: 'Core Gear' },
        { id: 'add-ons', label: 'Add-Ons' },
      ],
    },
  ],
};

// Climbing Outdoor specific focus question
const climbingOutdoorFocusQuestion = {
  question: 'Anything you want to focus on?',
  categories: [
    {
      id: 'clothes',
      label: 'Clothes',
      subcategories: [
        { id: 'tops', label: 'Tops' },
        { id: 'bottoms', label: 'Bottoms' },
        { id: 'insulation', label: 'Insulation' },
        { id: 'outer-layers', label: 'Outer layers' },
        { id: 'base-layers', label: 'Base layers' },
        { id: 'socks', label: 'Socks' },
      ],
    },
    {
      id: 'other',
      label: 'Other',
      subcategories: [
        { id: 'footwear', label: 'Footwear' },
        { id: 'core-gear', label: 'Core Gear' },
        { id: 'safety', label: 'Safety' },
        { id: 'add-ons', label: 'Add-ons' },
      ],
    },
  ],
};

// Bouldering Indoor specific focus question (without Safety)
const boulderingIndoorFocusQuestion = {
  question: 'Anything you want to focus on?',
  categories: [
    {
      id: 'clothes',
      label: 'Clothes',
      subcategories: [
        { id: 'tops', label: 'Tops' },
        { id: 'bottoms', label: 'Bottoms' },
        { id: 'base-layers', label: 'Base layers' },
        { id: 'socks', label: 'Socks' },
        { id: 'insulation', label: 'Insulation' },
        { id: 'outer-layers', label: 'Outer layers' },
      ],
    },
    {
      id: 'other',
      label: 'Other',
      subcategories: [
        { id: 'footwear', label: 'Footwear' },
        { id: 'core-gear', label: 'Core Gear' },
        { id: 'add-ons', label: 'Add-Ons' },
      ],
    },
  ],
};

// Bouldering Outdoor specific focus question (without Safety)
const boulderingOutdoorFocusQuestion = {
  question: 'Anything you want to focus on?',
  categories: [
    {
      id: 'clothes',
      label: 'Clothes',
      subcategories: [
        { id: 'tops', label: 'Tops' },
        { id: 'bottoms', label: 'Bottoms' },
        { id: 'base-layers', label: 'Base layers' },
        { id: 'socks', label: 'Socks' },
        { id: 'insulation', label: 'Insulation' },
        { id: 'outer-layers', label: 'Outer layers' },
      ],
    },
    {
      id: 'other',
      label: 'Other',
      subcategories: [
        { id: 'footwear', label: 'Footwear' },
        { id: 'core-gear', label: 'Core Gear' },
        { id: 'add-ons', label: 'Add-Ons' },
      ],
    },
  ],
};

// Camping specific focus question
const campingFocusQuestion = {
  question: 'Anything you want to focus on?',
  categories: [
    {
      id: 'clothes',
      label: 'Clothes',
      subcategories: [
        { id: 'tops', label: 'Tops' },
        { id: 'bottoms', label: 'Bottoms' },
        { id: 'base-layers', label: 'Base layers' },
        { id: 'outer-layers', label: 'Outer layers' },
        { id: 'insulation', label: 'Insulation' },
        { id: 'socks', label: 'Socks' },
      ],
    },
    {
      id: 'other',
      label: 'Other',
      subcategories: [
        { id: 'footwear', label: 'Footwear' },
        { id: 'core-gear', label: 'Core Gear' },
        { id: 'safety', label: 'Safety' },
        { id: 'add-ons', label: 'Add-Ons' },
      ],
    },
  ],
};

type QuestionPath = string[];

export function Intentra() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [questionPath, setQuestionPath] = useState<QuestionPath>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showFocus, setShowFocus] = useState(false);
  const [focusSelections, setFocusSelections] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [complete, setComplete] = useState(false);

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id);
    if (id === 'wintersports') {
      // Start winter sports flow with sport type selection
      setQuestionPath(['sport-type']);
    } else if (id === 'running') {
      // Start running flow with distance selection
      setQuestionPath(['distance']);
    } else if (id === 'mountains') {
      // Start mountains/outdoors flow with activity selection
      setQuestionPath(['mountain-activity']);
    } else if (id === 'biking') {
      // Start biking flow with riding type selection
      setQuestionPath(['riding-type']);
    } else if (id === 'other') {
      // Start other flow with activity selection
      setQuestionPath(['activity-type']);
    } else {
      // For other categories, show placeholder
      setComplete(true);
    }
  };

  const handleAnswer = (answerId: string) => {
    const currentDepth = questionPath.length;
    const newAnswers = { ...answers, [currentDepth]: answerId };
    setAnswers(newAnswers);

    // Special handling for sport type selection
    if (questionPath[0] === 'sport-type' && questionPath.length === 1) {
      // User selected a sport (skiing, snowboarding, etc.)
      const sportNode = winterSportsTree[answerId];
      if (sportNode) {
        setQuestionPath([...questionPath, answerId]);
      } else {
        setShowFocus(true);
      }
      return;
    }

    // Special handling for running distance selection
    if (questionPath[0] === 'distance' && questionPath.length === 1) {
      // User selected a distance (short, medium, long)
      const distanceNode = runningTree[answerId];
      if (distanceNode) {
        setQuestionPath([...questionPath, answerId]);
      } else {
        setShowFocus(true);
      }
      return;
    }

    // Special handling for mountains activity selection
    if (questionPath[0] === 'mountain-activity' && questionPath.length === 1) {
      // User selected a mountain activity
      const mountainNode = mountainsTree[answerId];
      if (mountainNode) {
        setQuestionPath([...questionPath, answerId]);
      } else {
        setShowFocus(true);
      }
      return;
    }

    // Special handling for biking riding type selection
    if (questionPath[0] === 'riding-type' && questionPath.length === 1) {
      // User selected a riding type
      const bikingNode = bikingTree[answerId];
      if (bikingNode) {
        setQuestionPath([...questionPath, answerId]);
      } else {
        setShowFocus(true);
      }
      return;
    }

    // Special handling for electric assistance selection
    if (questionPath[0] === 'riding-type' && questionPath.length === 2) {
      // User selected electric assistance, now move to the riding-specific questions
      const ridingType = answers[1]; // road-cycling, gravel-riding, etc.
      const bikingNode = bikingTree[ridingType];
      if (bikingNode) {
        setQuestionPath([...questionPath, answerId]);
      } else {
        setShowFocus(true);
      }
      return;
    }

    // Special handling for activity type selection
    if (questionPath[0] === 'activity-type' && questionPath.length === 1) {
      // User selected an activity
      const activityNode = otherTree[answerId];
      if (activityNode) {
        setQuestionPath([...questionPath, answerId]);
      } else {
        setShowFocus(true);
      }
      return;
    }

    // Navigate to next question
    const currentNode = getCurrentNode();
    
    if (currentNode?.children && currentNode.children[answerId]) {
      // There's a child question, go deeper
      setQuestionPath([...questionPath, answerId]);
    } else {
      // No more children, show focus question
      setShowFocus(true);
    }
  };

  const handleFocusAnswer = (answerId: string) => {
    setFocusSelections([...focusSelections, answerId]);
    setComplete(true);
  };

  const toggleFocusSelection = (optionId: string) => {
    if (focusSelections.includes(optionId)) {
      setFocusSelections(focusSelections.filter(id => id !== optionId));
    } else {
      setFocusSelections([...focusSelections, optionId]);
    }
  };

  const handleNext = () => {
    if (focusSelections.length > 0) {
      setComplete(true);
    }
  };

  const handleBack = () => {
    if (complete) {
      setComplete(false);
      setShowFocus(false);
      return;
    }
    
    if (showFocus) {
      setShowFocus(false);
      return;
    }

    if (questionPath.length > 1) {
      // Go back one question in the path
      const newPath = [...questionPath];
      newPath.pop();
      setQuestionPath(newPath);
      
      const newAnswers = { ...answers };
      delete newAnswers[questionPath.length];
      setAnswers(newAnswers);
    } else if (questionPath.length === 1) {
      // Go back to category selection
      setSelectedCategory(null);
      setQuestionPath([]);
      setAnswers({});
    }
  };

  const handleSkip = () => {
    // Skip directly to the focus question
    setShowFocus(true);
  };

  const handleReset = () => {
    setSelectedCategory(null);
    setQuestionPath([]);
    setAnswers({});
    setShowFocus(false);
    setComplete(false);
    setFocusSelections([]);
    setSelectedGender(null);
  };

  const getCurrentNode = () => {
    if (!selectedCategory) return null;
    
    if (questionPath[0] === 'sport-type') {
      if (questionPath.length === 1) {
        // Show sport type selection
        return null;
      }
      
      // Navigate through the tree based on answers
      const sportType = answers[1]; // skiing, snowboarding, etc.
      let node = winterSportsTree[sportType];
      
      for (let i = 2; i < questionPath.length; i++) {
        const answer = answers[i];
        if (node?.children && node.children[answer]) {
          node = node.children[answer];
        } else {
          break;
        }
      }
      
      return node;
    }
    
    if (questionPath[0] === 'distance') {
      if (questionPath.length === 1) {
        // Show distance selection
        return null;
      }
      
      // Navigate through the tree based on answers
      const distanceType = answers[1]; // short, medium, long
      let node = runningTree[distanceType];
      
      for (let i = 2; i < questionPath.length; i++) {
        const answer = answers[i];
        if (node?.children && node.children[answer]) {
          node = node.children[answer];
        } else {
          break;
        }
      }
      
      return node;
    }
    
    if (questionPath[0] === 'mountain-activity') {
      if (questionPath.length === 1) {
        // Show mountain activity selection
        return null;
      }
      
      // Navigate through the tree based on answers
      const mountainActivity = answers[1]; // trekking, mountaineering, etc.
      let node = mountainsTree[mountainActivity];
      
      for (let i = 2; i < questionPath.length; i++) {
        const answer = answers[i];
        if (node?.children && node.children[answer]) {
          node = node.children[answer];
        } else {
          break;
        }
      }
      
      return node;
    }
    
    if (questionPath[0] === 'riding-type') {
      if (questionPath.length === 1 || questionPath.length === 2) {
        // Show riding type and electric assistance selection
        return null;
      }
      
      // Navigate through the tree based on answers
      const ridingType = answers[1]; // road-cycling, gravel-riding, etc.
      let node = bikingTree[ridingType];
      
      // Start from index 3 since answers[1] is riding type and answers[2] is electric assistance
      for (let i = 3; i < questionPath.length; i++) {
        const answer = answers[i];
        if (node?.children && node.children[answer]) {
          node = node.children[answer];
        } else {
          break;
        }
      }
      
      return node;
    }
    
    if (questionPath[0] === 'activity-type') {
      if (questionPath.length === 1) {
        // Show activity type selection
        return null;
      }
      
      // Navigate through the tree based on answers
      const activityType = answers[1]; // yoga-pilates, fitness-gym, etc.
      let node = otherTree[activityType];
      
      // Other tree has no deep nesting, just single level questions
      return node;
    }
    
    return null;
  };

  const getCurrentQuestion = () => {
    if (questionPath[0] === 'sport-type' && questionPath.length === 1) {
      return {
        question: 'What kind of winter sport?',
        options: [
          { id: 'skiing', label: 'Skiing' },
          { id: 'snowboarding', label: 'Snowboarding' },
          { id: 'snowshoeing', label: 'Snowshoeing' },
          { id: 'ice-climbing', label: 'Ice Climbing' },
        ],
      };
    }
    
    if (questionPath[0] === 'distance' && questionPath.length === 1) {
      return {
        question: 'What kind of running?',
        options: [
          { id: 'running', label: 'Running' },
          { id: 'trail-running', label: 'Trail Running' },
          { id: 'triathlon', label: 'Triathlon' },
        ],
      };
    }
    
    if (questionPath[0] === 'mountain-activity' && questionPath.length === 1) {
      return {
        question: 'What kind of activity?',
        options: [
          { id: 'trekking', label: 'Trekking' },
          { id: 'mountaineering', label: 'Mountaineering' },
          { id: 'climbing', label: 'Climbing' },
          { id: 'bouldering', label: 'Bouldering' },
          { id: 'camping', label: 'Camping' },
        ],
      };
    }
    
    if (questionPath[0] === 'riding-type' && questionPath.length === 1) {
      return {
        question: 'What kind of riding are you planning?',
        options: [
          { id: 'road-cycling', label: 'Road Cycling' },
          { id: 'gravel-riding', label: 'Gravel Riding' },
          { id: 'mountain-biking', label: 'Mountain Biking' },
          { id: 'trekking-travel', label: 'Trekking/Travel' },
          { id: 'city-commuting', label: 'City/Commuting' },
          { id: 'childrens-bike', label: "Children's Bike" },
        ],
      };
    }
    
    if (questionPath[0] === 'riding-type' && questionPath.length === 2) {
      return {
        question: 'Do you want electric assistance?',
        options: [
          { id: 'yes', label: 'Yes' },
          { id: 'no', label: 'No' },
        ],
      };
    }
    
    if (questionPath[0] === 'activity-type' && questionPath.length === 1) {
      return {
        question: 'What kind of activity is this?',
        options: [
          { id: 'yoga-pilates', label: 'Yoga & Pilates' },
          { id: 'fitness-gym', label: 'Fitness/Gym' },
          { id: 'soccer', label: 'Soccer' },
          { id: 'basketball', label: 'Basketball' },
          { id: 'swimmer', label: 'Swimmer' },
          { id: 'sportswear-leisure', label: 'Sportswear/Leisure' },
        ],
      };
    }
    
    return getCurrentNode();
  };

  // Determine which focus question to use based on activity
  const isBiking = selectedCategory === 'biking';
  const isRunning = selectedCategory === 'running' && answers[1] !== 'triathlon';
  const isTriathlon = selectedCategory === 'running' && answers[1] === 'triathlon';
  const isTrekking = selectedCategory === 'mountains' && answers[1] === 'trekking';
  const isClimbingIndoor = selectedCategory === 'mountains' && answers[1] === 'climbing' && answers[2] === 'indoor';
  const isClimbingOutdoor = selectedCategory === 'mountains' && answers[1] === 'climbing' && answers[2] === 'outdoor';
  const isBoulderingIndoor = selectedCategory === 'mountains' && answers[1] === 'bouldering' && answers[2] === 'indoor';
  const isBoulderingOutdoor = selectedCategory === 'mountains' && answers[1] === 'bouldering' && answers[2] === 'outdoor';
  const isCamping = selectedCategory === 'mountains' && answers[1] === 'camping';
  const isYogaPilates = selectedCategory === 'other' && answers[1] === 'yoga-pilates';
  const isFitnessGym = selectedCategory === 'other' && answers[1] === 'fitness-gym';
  const isSoccer = selectedCategory === 'other' && answers[1] === 'soccer';
  const isBasketball = selectedCategory === 'other' && answers[1] === 'basketball';
  const isSwimmer = selectedCategory === 'other' && answers[1] === 'swimmer';
  const isSportswearLeisure = selectedCategory === 'other' && answers[1] === 'sportswear-leisure';
  const currentFocusQuestion = isBiking
    ? bikingFocusQuestion
    : isTriathlon
    ? triathlonFocusQuestion
    : isRunning
    ? runningFocusQuestion
    : isTrekking
    ? trekkingFocusQuestion
    : isClimbingIndoor
    ? climbingIndoorFocusQuestion
    : isClimbingOutdoor
    ? climbingOutdoorFocusQuestion
    : isBoulderingIndoor
    ? boulderingIndoorFocusQuestion
    : isBoulderingOutdoor
    ? boulderingOutdoorFocusQuestion
    : isCamping
    ? campingFocusQuestion
    : isYogaPilates 
    ? yogaPilatesFocusQuestion 
    : isFitnessGym 
    ? fitnessGymFocusQuestion 
    : isSoccer
    ? soccerFocusQuestion
    : isBasketball
    ? basketballFocusQuestion
    : isSwimmer
    ? swimmerFocusQuestion
    : isSportswearLeisure
    ? sportswearLeisureFocusQuestion
    : focusQuestion;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-[#fafafa]">
      <div className="w-full max-w-2xl rounded-[6px]">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-[2.5rem] tracking-tight mb-3 text-[#1a1a1a]">intentra</h1>
          <p className="text-[#6a6a6a] text-[0.9rem] tracking-wide">Decision support</p>
        </div>

        {/* Main Card */}
        <div className="bg-white shadow-sm border border-[#e5e5e5] p-6 md:p-12 rounded-[22px]">
          {!selectedCategory && (
            <>
              {/* Initial Question */}
              <h2 className="text-[1.3rem] md:text-[1.5rem] tracking-tight mb-12 text-[#1a1a1a] text-center font-bold">
                Let's get started.
              </h2>

              {/* Category Options */}
              <div className="space-y-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className="w-full text-left p-4 md:p-6 border border-[#e5e5e5] hover:border-[#a0a0a0] hover:bg-[#fafafa] transition-all duration-200 group rounded-[138px]"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="text-[1.05rem] text-[#1a1a1a] mb-1 group-hover:text-[#000] text-[16px]">
                          {category.label}
                        </div>
                      </div>
                      <svg
                        className="w-5 h-5 text-[#d0d0d0] group-hover:text-[#6a6a6a] transition-colors flex-shrink-0 ml-4 mt-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {selectedCategory && !showFocus && !complete && (() => {
            const currentQ = getCurrentQuestion();
            return currentQ ? (
              <>
                {/* Dynamic Question */}
                <h2 className="text-[1.3rem] md:text-[1.5rem] tracking-tight mb-12 text-[#1a1a1a] text-center">
                  {currentQ.question}
                </h2>

                {/* Options */}
                <div className="space-y-3">
                  {currentQ.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnswer(option.id)}
                      className="w-full text-left p-4 md:p-6 rounded-xl border border-[#e5e5e5] hover:border-[#a0a0a0] hover:bg-[#fafafa] transition-all duration-200 group"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-[1.05rem] text-[#1a1a1a] mb-1 group-hover:text-[#000]">
                            {option.label}
                          </div>
                        </div>
                        <svg
                          className="w-5 h-5 text-[#d0d0d0] group-hover:text-[#6a6a6a] transition-colors flex-shrink-0 ml-4 mt-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Back and Skip Buttons */}
                <div className="mt-8 text-center flex justify-center gap-4">
                  <button
                    onClick={handleBack}
                    className="px-6 py-2 text-[0.9rem] text-[#6a6a6a] hover:text-[#1a1a1a] transition-colors tracking-wide"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleSkip}
                    className="px-6 py-2 text-[0.9rem] text-[#6a6a6a] hover:text-[#1a1a1a] transition-colors tracking-wide"
                  >
                    Skip →
                  </button>
                </div>
              </>
            ) : null;
          })()}

          {showFocus && !complete && (
            <>
              {/* Focus Question */}
              <h2 className="text-[1.3rem] md:text-[1.5rem] tracking-tight mb-12 text-[#1a1a1a] text-center">
                {currentFocusQuestion.question}
              </h2>

              {/* Gender Selection */}
              <div className="mb-12">
                <h3 className="text-[1rem] md:text-[1.1rem] tracking-tight mb-6 text-[#1a1a1a] text-center">
                  Gender
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
                  {[
                    { id: 'women', label: 'Women' },
                    { id: 'men', label: 'Men' },
                    { id: 'unisex', label: 'Unisex' },
                    { id: 'kids', label: 'Kids' },
                  ].map((gender) => (
                    <button
                      key={gender.id}
                      onClick={() => setSelectedGender(gender.id)}
                      className={`p-3 md:p-4 rounded-xl border transition-all duration-200 ${
                        selectedGender === gender.id
                          ? 'border-[#4a90e2] bg-[#f0f7ff]'
                          : 'border-[#e5e5e5] hover:border-[#a0a0a0] hover:bg-[#fafafa]'
                      }`}
                    >
                      <span className="text-[0.9rem] md:text-[1rem] text-[#1a1a1a]">{gender.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Focus Options - Grid Layout */}
              <div className="grid grid-cols-2 gap-2 md:gap-3">
                {currentFocusQuestion.categories.map((category) => (
                  <div key={category.id} className="space-y-2 md:space-y-3">
                    <h3 className="text-[0.85rem] md:text-[1rem] font-bold text-[#1a1a1a]">{category.label}</h3>
                    {category.subcategories.map((option) => (
                      <label
                        key={option.id}
                        className="flex items-center p-2 md:p-5 rounded-xl border border-[#e5e5e5] hover:border-[#a0a0a0] hover:bg-[#fafafa] cursor-pointer transition-all duration-200"
                      >
                        <input
                          type="checkbox"
                          checked={focusSelections.includes(option.id)}
                          onChange={() => toggleFocusSelection(option.id)}
                          className="w-4 h-4 md:w-5 md:h-5 rounded border-[#d0d0d0] text-[#4a90e2] focus:ring-2 focus:ring-[#4a90e2] focus:ring-offset-0 cursor-pointer flex-shrink-0"
                        />
                        <span className="ml-2 md:ml-3 text-[#1a1a1a] text-[0.8rem] md:text-[1rem] leading-tight">{option.label}</span>
                      </label>
                    ))}
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="mt-8 flex justify-between items-center">
                <button
                  onClick={handleNext}
                  disabled={focusSelections.length === 0}
                  className="px-8 py-3 bg-[#4a90e2] text-white rounded-lg hover:bg-[#3a7bc8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[0.95rem] tracking-wide"
                >
                  Submit
                </button>
                <button
                  onClick={() => setComplete(true)}
                  className="px-8 py-3 border border-[#e5e5e5] text-[#6a6a6a] rounded-lg hover:border-[#a0a0a0] hover:bg-[#fafafa] transition-colors text-[0.95rem] tracking-wide"
                >
                  Show everything
                </button>
              </div>
            </>
          )}

          {complete && (
            <>
              {/* Completion View */}
              <div className="text-center">
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f5f5f5] mb-6">
                    <svg
                      className="w-8 h-8 text-[#4a4a4a]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-[1.5rem] tracking-tight mb-4 text-[#1a1a1a]">
                    Perfect
                  </h3>
                  <p className="text-[1.05rem] text-[#6a6a6a] leading-relaxed max-w-md mx-auto">
                    We've captured your preferences. Let's find the perfect gear for your adventure.
                  </p>
                </div>

                <button
                  onClick={handleReset}
                  className="mt-8 px-8 py-3 text-[0.9rem] text-[#6a6a6a] hover:text-[#1a1a1a] transition-colors tracking-wide"
                >
                  Start over
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-[0.75rem] text-[#9a9a9a] tracking-wide">
            Mindful purchasing starts with intention
          </p>
        </div>
      </div>
    </div>
  );
}