"use client";

export default function UpdatePhotoForm({
  id,
  smugMugKey,
  url,
  captureDate,
  metadata,
  albumName,
  children,
}) {
  return (
    <form className="flex flex-col w-full">
      <label className="flex flex-col my-4">
        id
        <input type="number" name="id" defaultValue={id} disabled />
      </label>

      <label className="my-4">
        smugMugKey
        <input type="text" name="smugMugKey" defaultValue={smugMugKey} disabled />
      </label>

      <label className="my-4">
        url
        <input type="text" name="url" defaultValue={url} />
      </label>

      <label className="my-4">
        captureDate
        <input type="date" name="captureDate" defaultValue={captureDate} />
      </label>

      {children}

      <label className="my-4">
        metadata
        <textarea defaultValue={JSON.stringify(metadata)} name="metadata" />
      </label>

      <button type="submit">update photo</button>
    </form>
  )
}