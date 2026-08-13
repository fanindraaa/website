import {
  defineDocumentType,
  makeSource,
} from 'contentlayer2/source-files';

const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    year: {
      type: 'date',
      required: true,
    },
    image: {
      type: 'string',
      // required: true
    },
    description: {
      type: 'string',
      required: true,
    },
    playground: {
      type: 'boolean',
      required: true,
      default: false,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx/, ''),
    },
    url: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath,
    },
  },
}));

const HoprEntry = defineDocumentType(() => ({
  name: 'HoprEntry',
  filePathPattern: `hopr/*.mdx`,
  contentType: 'mdx',
  fields: {
    date: {
      type: 'string',
      required: true,
    },
    title: {
      type: 'string',
      required: false,
    },
    description: {
      type: 'string',
      required: false,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
    url: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath,
    },
  },
}));

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Project, HoprEntry],
});
